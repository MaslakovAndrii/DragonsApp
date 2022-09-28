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
                    backgroundRepeat: 'no-repeat',
                    background: 'rgb(58,180,161)',
                    background: 'linear-gradient(129deg, rgba(58,180,161,1) 0%, rgba(83,29,253,1) 50%, rgba(252,69,69,0.5730085784313726) 100%)'
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