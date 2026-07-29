import React, { use, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'



const Register = () => {
  const [userName, setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {handleRegister} = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault()
    await handleRegister(userName,email,password)
    navigate('/')
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input onInput={(e) => {setUsername(e.target.value)}} type="text" name='username' placeholder='Enter username' />
          <input onInput={(e) => {setEmail(e.target.value)}} type="text" name='email' placeholder='Enter email' />
          <input onInput={(e) => {setPassword(e.target.value)}} type="text" name='password' placeholder='Enter password' />
          <button>Register</button>
        </form>
        <p>Already have an account? <Link className='toggleAuthForm' to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default Register
