import React, { Fragment, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRouter = ({children}) => {
    const {user} = useContext(AuthContext)
  return (
    !!user ? <Fragment>{children}</Fragment> : <Navigate to="/login" />
  )
}

export default PrivateRouter