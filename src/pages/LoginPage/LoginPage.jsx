import React from 'react';
import { Link } from 'react-router-dom';
import Authorization from '../../components/Authorization/Authorization'
import Container from '../../components/Container/Container';
import { REGISTRATION_ROUTE } from '../../utils/const';
import './LoginPage.scss'

const LoginPage = () => {
     return (
          <Container size='small'>
               <div className='auth'>
                    <h1 className='auth__title main-page-title'>Войти</h1>
                    <Authorization />
                    <Link className='auth__link link' to={REGISTRATION_ROUTE}>Зарегистрироваться</Link>
               </div>
          </Container>
     );
};

export default LoginPage;