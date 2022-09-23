import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AUTHORIZATION_ROUTE } from '../../utils/const';
import Header from '../Header/Header';

const Layout = () => {
     const { isAuth } = useAuth()

     return isAuth
          ? (<>
               <Header/>
               <Outlet/>
          </>)
          : (
               <Navigate to={AUTHORIZATION_ROUTE} />
          )
};

export default Layout;