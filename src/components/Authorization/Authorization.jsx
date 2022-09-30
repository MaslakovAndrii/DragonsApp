import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { REGISTRATION_ROUTE, START_ROUTE } from '../../utils/const';
import { setUser } from '../../store/slices/userSlice';
import { useAuth } from '../../hooks/useAuth';
import Notification from '../../components/Notification/Notification';


const Authorization = () => {
     const [notification, setNotification] = useState(false)
     const dispatch = useDispatch()
     const navigate = useNavigate()
     const { isAuth } = useAuth()

     const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
          defaultValues: {
               email: '',
               password: '',
          },
          mode: 'onChange',
     })

     const onSubmit = (data, e) => {
          const auth = getAuth();
          signInWithEmailAndPassword(auth, data.email, data.password)
               .then(({ user }) => {
                    dispatch(setUser({
                         email: user.email,
                         id: user.uid,
                         token: user.accessToken
                    }))
                    navigate(`${START_ROUTE}`)
                    reset()
               })
               .catch((error) => {
                    setNotification({ type: 'error', message: 'Неправильный email или пароль. Попробуйте снова!' })
               });
     }
     const onError = (errors, e) => {
          console.log('error');
     }



     return isAuth
          ? <Navigate to={START_ROUTE} />
          : (
               <>
                    {notification ? <Notification type={notification.type} message={notification.message} handleVisible={setNotification} /> : null}

                    <form className='form' noValidate onSubmit={handleSubmit(onSubmit, onError)} >
                         <div className='form__input-wrapper'>
                              <input
                                   className='form__input'
                                   type='email'
                                   {...register('email',
                                        {
                                             required: 'Обязательное поле',
                                             pattern: {
                                                  value: /([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
                                                  message: 'Введите правильный email'
                                             }
                                        }
                                   )}
                                   placeholder='Введите email' />
                              {errors?.email && <div className='form__error'>{errors.email.message}</div>}
                         </div>
                         <div className='form__input-wrapper'>
                              <input
                                   className='form__input'
                                   type='password'
                                   {...register('password',
                                        {
                                             required: 'Обязательное поле',
                                             minLength: {
                                                  value: 6,
                                                  message: 'Пароль должен быть не менее 6 символов'
                                             }
                                        }
                                   )}
                                   placeholder='Введите пароль' />
                              {errors?.password && <div className='form__error'>{errors.password.message}</div>}
                         </div>
                         <button className='form__btn btn' type='submit' disabled={!isValid}>Войти</button>
                    </form>
               </>

          );
};

export default Authorization;