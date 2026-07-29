import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/form.scss'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
  const [userName,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const {handleLogin}  = useAuth();
  

  async function handleSubmit(e) {
    e.preventDefault();
    await handleLogin(userName,password)
  }
  
  return (
    <main>
      <div className='form-container'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input onInput={(e)=>{setUsername(e.target.value)}} type="text" name='username' placeholder='Enter username' />
          <input onInput={(e)=>{setPassword(e.target.value)}} type="text" name='password' placeholder='Enter password' />
          <button type='submit'>Login</button>
        </form>
        <p>Don't have an account? <Link className='toggleAuthForm' to="/register">Register</Link></p>
      </div>
    </main>
  )
}

export default Login
