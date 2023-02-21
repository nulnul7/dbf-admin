import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../AuthContext'
import './login.css'

const Login = () => {

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const { user, loading, error, dispatch } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" })
        try {
            const userLogin = { name, password }
            const login = await axios.post('http://localhost:5500/5R2I/auth/login', userLogin)
            console.log('userlogin', login);
            if (login.status === 200) {
                dispatch({ type: "LOGIN_SUCCESS", payload: login.data.details });
                navigate('/getPortfolio')
            }
        } catch (error) {
            dispatch({ type: "LOGIN_FAILED", payload: error.response.data })
        }
    }

    return (
        <div className="LogContainer">
            <div className="LogWrapper">
                <h1 className="login">Login</h1>
                <div className="LogForm">

                    <form className='loginForm'>
                        <input type='text' id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="username" required />
                        <input type='password' id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" required />
                        <button className='submitBtn' onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login