import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AUTHORIZATION_ROUTE } from '../../utils/const';
import Container from '../Container/Container';
import Header from '../Header/Header';

const Layout = () => {
     const { isAuth } = useAuth()

     return isAuth
          ? (
               <div style={{
                    minHeight: '100vh',
                    background: 'linear-gradient(129deg, rgba(201,255,247,1) 0%, rgba(179,155,255,1) 50%, rgba(255,132,132,0.8730085784313726) 100%)'
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