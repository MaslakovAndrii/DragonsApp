import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AUTHORIZATION_ROUTE, START_ROUTE } from '../../utils/const';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';

import Notification from '../../components/Notification/Notification';

import './Registration'

const Registration = () => {
     const [notification, setNotification] = useState(false)
     const navigate = useNavigate()
     const { isAuth } = useAuth()

     const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
          defaultValues: {
               name: '',
               email: '',
               password: '',
          },
          mode: 'onChange',
     })


     const onSubmit = (data, e) => {
          e.preventDefault()
          const auth = getAuth();
          createUserWithEmailAndPassword(auth, data.email, data.password)
               .then(() => {
                    updateProfile(auth.currentUser, {
                         displayName: data.name
                    })
                    reset()
                    navigate(`${AUTHORIZATION_ROUTE}`)
               })
               .catch(() => {
                    setNotification({ type: 'error', message: 'Ошибка! Пользователь с таким email уже существует.' })
               });
     }

     return isAuth
          ? <Navigate to={START_ROUTE} />
          : (
               <>
                    {notification ? <Notification type={notification.type} message={notification.message} handleVisible={setNotification} /> : null}

                    <form className='form' onSubmit={handleSubmit(onSubmit)}>
                         <div className='form__input-wrapper'>
                              <input
                                   className='form__input'
                                   type='text'
                                   {...register('name',
                                        { required: 'Обязательное поле' }
                                   )}
                                   placeholder='Имя' />
                              {errors?.name && <div className='form__error'>{errors.name.message}</div>}
                         </div>
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
                                             },
                                        }
                                   )}
                                   placeholder='Введите пароль' />
                              {errors?.password && <div className='form__error'>{errors.password.message}</div>}
                         </div>
                         <button className='form__btn btn' type='submit' disabled={!isValid} >Зарегистрироваться</button>
                    </form>
               </>

          );
};

export default Registration;