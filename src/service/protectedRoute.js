import React from 'react';
import { Navigate } from 'react-router-dom';
import { app_token_Name } from 'src/api/instanceAxios';

const ProtectedRoute = ({children}) => { 
    const isAccess = localStorage.getItem(app_token_Name)
    if(!isAccess){
        return <Navigate to="/" replace />
    }
    else{
        return children
    }
};

export default ProtectedRoute;
