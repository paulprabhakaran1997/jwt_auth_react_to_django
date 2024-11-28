import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext';

const HomePage = () => {

  const [notes, setNotes] = useState([]);

  const { authToken, logout } = useContext(AuthContext);

  useEffect(() => {
    getNotes()
  }, []);

  const getNotes = async () => {
    console.log("ACcess token ==== ",String(authToken.access));
    axios({
      method: 'GET',
      url: 'http://127.0.0.1:8000/api/notes/',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authToken.access)
      }
    }).then(res => {
      console.log("RESSS === ", res);
      if (res.status === 200) {
        setNotes(res.data)
      }
    }).catch(err => {
      console.log("ERR ==== ", err);
      if (err.response.status === 401) {
        logout()
      }
    })    
  }

  return (
    <div>
      <p>You r Logged in Home Page !!!</p>

      <ul>
        {notes.map(obj => (
          <li key={obj.id}>{obj.body}</li>
        ))}
      </ul>

    </div>
  )
}

export default HomePage