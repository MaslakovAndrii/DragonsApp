import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTHORIZATION_ROUTE } from '../../utils/const';
import { useForm } from 'react-hook-form';


import './Registration'
import { UserAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

const Registration = () => {
     const navigate = useNavigate()
     const { createUser } = UserAuth()
     const dispatch_N = useNotification()


     const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
          defaultValues: {
               name: '',
               email: '',
               password: '',
          },
          mode: 'onChange',
     })


     const onSubmit = async (data) => {
          try {
               await createUser(data.email, data.password)
               navigate(AUTHORIZATION_ROUTE)
               reset()
          } catch (err) {
               dispatch_N({
                    type: 'SHOW_NOTIFICATION',
                    payload: {
                         type: 'error',
                         message: `${err}`
                    }
               })
          }
          
     }

     return (
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

     );
};

export default Registration;