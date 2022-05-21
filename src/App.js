import React, {useState} from 'react';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Login from './components/authScreen/login'
import SignUp from './components/authScreen/signUp';
import {auth} from './services/firebase'
import {useAuthState} from 'react-firebase-hooks/auth';
import firebase from 'firebase/compat/app'
import CircularProgress from '@mui/material/CircularProgress'
import Home from './components/Home/home'

function App() {

  const [user, loading, error] = useAuthState(auth);

     if(loading){
        return(
            <div style={{display:'flex',justifyContent:'center',height:'100vh',alignItems:'center',backgroundColor:'white'}}> <CircularProgress /></div>
        )
    }

    // if user is not logged in return sign in page else return app
    if(user){
      return (
        <Routes>
          <Route path='/' element = {user ? <Home user={user}  />:<Login />} />
        <Route path="signUp" element={<SignUp />} />
        
        </Routes>
    )
    }
    
}

export default App;
