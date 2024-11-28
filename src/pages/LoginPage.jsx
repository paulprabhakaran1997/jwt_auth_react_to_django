import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const LoginPage = () => {

    const { loginUser } = useContext(AuthContext)

    return (
        <div>
            <form onSubmit={loginUser}>
                <input
                    type="text" 
                    name="username" 
                    id="username" 
                />
                <input
                    type="password" 
                    name="password" 
                    id="password" 
                />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default LoginPage