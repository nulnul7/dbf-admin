import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../AuthContext'
import './login.css'


const Login = () => {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [errorInfo, setErrorInfo] = useState('');
    const navigate = useNavigate();

    const { dispatch } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" })
        try {
            const userLogin = { username, password }
            const login = await axios.post('http://localhost:5500/5R2I/auth/login', userLogin)
            const getUser = JSON.parse(login.config.data);
            // tidak bisa construck isi getUser karena bentrok dengan nama state, jadi diganti namaUser
            const namaUser = getUser.username;
            const aksesToken = login.data.aksesToken;
            console.log('login: ', login, aksesToken);

            if (login.status === 200) {
                dispatch({ type: "LOGIN_SUCCESS", payload: { namauser: namaUser, aksesToken } });
                navigate('/')
            }
        } catch (error) {
            setErrorInfo(error.response.data.message);
            dispatch({ type: "LOGIN_FAILED", error: error.response.data })
        }
    }

    return (
        <div className="LogContainer">
            <div className="LogWrapper">
                <h1 className="login">Login</h1>
                <div className="LogForm">
                    <form className='loginForm'>
                        <input type='text' id="name" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="username" required />
                        <div className='errInfo'>{errorInfo !== 'wrong password cui!' && errorInfo}</div>
                        <input type='password' id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" required />
                        <div className='errInfo'>{errorInfo === 'wrong password cui!' && errorInfo}</div>
                        <button className='submitBtn' onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login