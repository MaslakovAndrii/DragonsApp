import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from '../../store/slices/userSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { AUTHORIZATION_ROUTE, START_ROUTE } from '../../utils/const';
import { useAuth } from '../../hooks/useAuth';

const Registration = () => {
     const navigate = useNavigate()
     const dispatch = useDispatch()
     const { isAuth } = useAuth()

     const { register, handleSubmit, reset } = useForm({
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
                    dispatch(setUser({
                         email: user.email,
                         id: user.uid,
                         token: user.accessToken
                    }))
                    navigate(`${AUTHORIZATION_ROUTE}`)
                    reset()
               })
               .catch((error) => {
                    console.log(error);
               });
     }
     const onError = (errors, e) => {

     }
     return isAuth
          ? <Navigate to={START_ROUTE} />
          : (
               <>
                    <h1>Зарегистрироваться</h1>
                    <form onSubmit={handleSubmit(onSubmit, onError)}>
                         <input type='text' {...register('name', { required: true })} placeholder='Имя' />
                         <input type='email' {...register('email', { required: true })} placeholder='Введите email' />
                         <input type='password' {...register('password', { required: true })} placeholder='Введите пароль' />
                         <button type='submit'>Зарегистрироваться</button>
                    </form>
               </>

          );
};

export default Registration;