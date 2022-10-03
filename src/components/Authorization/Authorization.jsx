import React from 'react';
import { useNavigate } from 'react-router-dom';
import { START_ROUTE } from '../../utils/const';
import { useForm } from 'react-hook-form';
import { UserAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext'



const Authorization = () => {
     const navigate = useNavigate()
     const dispatch_N = useNotification()
     const { singIn } = UserAuth()

     const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
          defaultValues: {
               email: '',
               password: '',
          },
          mode: 'onChange',
     })
     

     const onSubmit = async (data) => {
          try {
               await singIn(data.email, data.password)
               navigate(START_ROUTE)
               reset()
          } catch (err) {
               console.log(err);
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
          <>
               <form className='form' noValidate onSubmit={handleSubmit(onSubmit)} >
                    <div className='form__input-wrapper'>
                         <input
                              className='form__input'
                              type='email'
                              {...register('email',
                                   {
                                        required: 'Required field',
                                        pattern: {
                                             value: /([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
                                             message: 'Enter correct email'
                                        }
                                   }
                              )}
                              placeholder='Enter email' />
                         {errors?.email && <div className='form__error'>{errors.email.message}</div>}
                    </div>
                    <div className='form__input-wrapper'>
                         <input
                              className='form__input'
                              type='password'
                              {...register('password',
                                   {
                                        required: 'Required field',
                                        minLength: {
                                             value: 6,
                                             message: 'Password must be at least 6 characters'
                                        }
                                   }
                              )}
                              placeholder='Enter password' />
                         {errors?.password && <div className='form__error'>{errors.password.message}</div>}
                    </div>
                    <button className='form__btn btn' type='submit' disabled={!isValid}>Sing in</button>
               </form>
          </>

     );
};

export default Authorization;