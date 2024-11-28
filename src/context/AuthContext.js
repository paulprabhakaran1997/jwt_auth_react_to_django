import axios from "axios";
import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;


export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();

    const [authToken, setAuthToken] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
    const [loading , setLoading] = useState(true)

    const loginUser = async (e) => {
        e.preventDefault();       

        axios({
            method:'POST',
            url : 'http://127.0.0.1:8000/api/token/',
            headers : {
                'Content-Type' : 'application/json'
            },
            data : JSON.stringify({'username' : e.target.username.value , 'password' : e.target.password.value})
        }).then(res => {
            console.log("RES ==== ",res);
            if(res.status === 200){
                setAuthToken(res.data)
                setUser(jwt_decode(res.data.access));
                localStorage.setItem('authTokens',JSON.stringify(res.data));
                navigate("/");
            }
            else{
                console.log("Something Went Wrong");
            }
        }).catch(err =>{
            console.log("ERR ==== ",err);
        })
    }

    const logout = () =>{
        localStorage.removeItem('authTokens');
        setAuthToken(null)
        setUser(null)
        navigate('/login')
    }

    const updateToken = async () =>{
        console.log("Update Token Call",authToken?.refresh);
        axios({
            method:'POST',
            url : 'http://127.0.0.1:8000/api/token/refresh/',
            headers : {
                'Content-Type' : 'application/json'
            },
            data : JSON.stringify({'refresh' : authToken?.refresh})
        }).then(res => {
            console.log("RESSS === ",res);
            if(res.status === 200){
                setAuthToken(res.data)
                setUser(jwt_decode(res.data.access));
                localStorage.setItem('authTokens',JSON.stringify(res.data));
            }
            
        }).catch(err =>{
            console.log("ERR ==== ",err);
            logout();
        })

        if(loading){
            setLoading(false)
        }

    }

    const contextData = {
        user : user,
        setUser : setUser,
        loginUser : loginUser,
        logout : logout,
        authToken : authToken,
    }


    useEffect(() =>{

        if(loading){
            updateToken()
        }

        const fourMinutes = 1000 * 60 * 4;
        const interval = setInterval(() =>{
            if(authToken){
                updateToken()
            }
        },fourMinutes)

        return () => clearInterval(interval)

    },[authToken, loading])

    return (
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}