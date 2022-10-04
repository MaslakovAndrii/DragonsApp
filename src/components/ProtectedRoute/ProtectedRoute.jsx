import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { AUTHORIZATION_ROUTE } from '../../utils/const';

const ProtectedRoute = ({children}) => {
     const { user } = UserAuth()
     console.log(user);

     if(!user) {
          return <Navigate to={AUTHORIZATION_ROUTE}/>
     }

     return children
};

export default ProtectedRoute;