import React, { Fragment, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const PublicRouter = ({children}) => {
    const {user} = useContext(AuthContext);
    return (
        !!user ? <Navigate to="/" /> : <Fragment>{children}</Fragment>
    )
}

export default PublicRouter