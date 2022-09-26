import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Navigate, useNavigate } from 'react-router-dom';
import { AUTHORIZATION_ROUTE, START_ROUTE } from '../../utils/const';
import { useAuth } from '../../hooks/useAuth';

import './Registration'

const Registration = () => {
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
                    navigate(`${AUTHORIZATION_ROUTE}`)
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

                    <form className='form' onSubmit={handleSubmit(onSubmit, onError)}>
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