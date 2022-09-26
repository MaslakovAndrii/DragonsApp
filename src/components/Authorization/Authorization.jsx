import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { REGISTRATION_ROUTE, START_ROUTE } from '../../utils/const';
import { setUser } from '../../store/slices/userSlice';
import { useAuth } from '../../hooks/useAuth';


const Authorization = () => {
     const dispatch = useDispatch()
     const navigate = useNavigate()
     const { isAuth } = useAuth()

     const { register, handleSubmit, reset, formState: { errors } } = useForm({
          defaultValues: {
               email: '',
               password: '',
          },
          mode: 'onSubmit',
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
                    console.log(error);
               });
     }
     const onError = (errors, e) => {
          console.log('error');
     }



     return isAuth
          ? <Navigate to={START_ROUTE} />
          : (
               <>
                    <h1>Войти</h1>
                    <form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
                         <input
                              type='email'
                              {...register('email',
                                   { required: true, pattern: /([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/ }
                              )}
                              placeholder='Введите email' />
                         {errors?.email && <div className='form-error'>{errors.email.message}</div>}
                         <input
                              type='password'
                              {...register('password',
                                   { required: true, minLength: 6 }
                              )}
                              placeholder='Введите пароль' />
                         {errors?.password && <div className='form-error'>{errors.password.message}</div>}
                         <button type='submit'>Войти</button>
                    </form>
                    <Link to={REGISTRATION_ROUTE}>Зарегистрироваться</Link>
               </>

          );
};

export default Authorization;