import React, { createContext, useEffect, useReducer } from 'react'


const INIT_USER = {
  loading: false,
  // username: JSON.parse(localStorage.getItem('username')) || null,
  username: localStorage.getItem('username') || null,
  aksesToken: null,
  error: null
}

export const AuthContext = createContext(INIT_USER)


function loginReducer(state, action) {
  switch (action.type) {
    case "LOGIN_START":
      return {
        loading: true,
        userData: null,
        error: undefined
      }
    case "LOGIN_SUCCESS":
      return {
        loading: false,
        userData: action.payload,
        error: undefined
      }
    case "LOGIN_FAILED":
      return {
        loading: false,
        userData: null,
        error: action.payload
      }
    case "LOGOUT":
      return {
        loading: null,
        userData: null,
        error: undefined
      }
    default:
      return state;
  }
}

export const creteAuthContext = createContext(INIT_USER);

const AuthContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(loginReducer, INIT_USER);

  useEffect(() => {
    // localStorage.setItem('username', JSON.stringify(state.username))
    localStorage.setItem('username', state.username)
  }, [state.username])

  return (
    <AuthContext.Provider value={{
      loading: state.loading,
      userData: state.userData,
      error: state.error,
      dispatch
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider