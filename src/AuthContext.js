import React, {createContext, useEffect, useReducer} from 'react'


const INIT_USER = {
  loading: false,
  user: JSON.parse(localStorage.getItem('user')) || null,
  error: null
}

export const AuthContext = createContext(INIT_USER)


function loginReducer(state, action) {
  switch (action.type) {
      case "LOGIN_START":
          return {
              loading: true,
              user: null,
              error: undefined
          }
      case "LOGIN_SUCCESS":
          return {
              loading: false,
              user: action.payload,
              error: undefined
          }
      case "LOGIN_FAILED":
          return {
              loading: false,
              user: null,
              error: action.payload
          }
      case "LOGOUT":
          return {
              loading: null,
              user: null,
              error: undefined
          }
      default:
          return state;
  }
}


export const creteAuthContext = createContext(INIT_USER); 

const AuthContextProvider = ({children}) => {
  
  const [state, dispatch] = useReducer(loginReducer, INIT_USER);
  
  useEffect(()=>{
    localStorage.setItem('user', JSON.stringify(state.user))
  }, [state.user])

  return (
    <AuthContext.Provider value={{ loading: state.loading, user: state.user, error: state.error, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider