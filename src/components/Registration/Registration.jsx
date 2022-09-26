import React from 'react';
import { useForm } from 'react-hook-form';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Navigate, useNavigate } from 'react-router-dom';
import { AUTHORIZATION_ROUTE, START_ROUTE } from '../../utils/const';
import { useAuth } from '../../hooks/useAuth';

const Registration = () => {
     const navigate = useNavigate()
     const { isAuth } = useAuth()

     const { register, handleSubmit, reset, formState: { errors } } = useForm({
          defaultValues: {
               name: '',
               email: '',
               password: '',
          },
     })

     const onSubmit = (data, e) => {
          e.preventDefault()
          const auth = getAuth();
          createUserWithEmailAndPassword(auth, data.email, data.password)
               .then(({ user }) => {
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
                    <h1>Зарегистрироваться</h1>
                    <form onSubmit={handleSubmit(onSubmit, onError)}>
                         <input
                              type='text'
                              {...register('name',
                                   { required: true }
                              )}

                              placeholder='Имя' />
                         {errors?.name && <div className='form-error'>{errors.name.message}</div>}
                         <input
                              type='email'
                              {...register('email',
                                   {
                                        required: true,
                                        pattern: /([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
                                   }
                              )}
                              placeholder='Введите email' />
                         {errors?.email && <div className='form-error'>{errors.email.message}</div>}
                         <input
                              type='password'
                              {...register('password',
                                   {
                                        required: true,
                                        minLength: 6
                                   }
                              )}
                              placeholder='Введите пароль' />
                         {errors?.password && <div className='form-error'>{errors.password.message}</div>}
                         <button type='submit'>Зарегистрироваться</button>
                    </form>
               </>

          );
};

export default Registration;