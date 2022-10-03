import React from 'react';
import { Link } from 'react-router-dom';
import { REGISTRATION_ROUTE} from '../../utils/const';

import Authorization from '../../components/Authorization/Authorization'
import Container from '../../components/Container/Container';

import './LoginPage.scss'

const LoginPage = () => {

     return (
               <Container size='small'>
                    <div className='auth'>
                         <h1 className='auth__title main-page-title'>Login</h1>
                         <Authorization />
                         <Link className='auth__link link' to={REGISTRATION_ROUTE}>Create account</Link>
                    </div>
               </Container>
          );
};

export default LoginPage;