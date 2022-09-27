import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AUTHORIZATION_ROUTE } from '../../utils/const';
import Container from '../Container/Container';
import Header from '../Header/Header';
import bgImage from '../../assets/image/bg.jpg'

const Layout = () => {
     const { isAuth } = useAuth()

     return isAuth
          ? (
          <div style={{
               minHeight: '100vh',
               backgroundImage: `url(${bgImage})`,
               backgroundPosition: 'center',
               backgroundSize: 'cover',
               backgroundRepeat: 'no-repeat',
          }}>
               <Container size='max'>
                    <Header />
                    <Outlet />
               </Container>
          </div>
          )
          : (
               <Navigate to={AUTHORIZATION_ROUTE} />
          )
};

export default Layout;