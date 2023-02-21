import Opening from '../../components/opening/Opening'
import Sidebar from '../../components/sidebar/Sidebar'
import './home.css'
import { AuthContext } from '../../AuthContext'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    user === null && navigate('/langsung')
  }, [user])

  return (

    <div className='container'>
      <div className='wrapper'>
        <Sidebar />
        <Opening />
      </div>
    </div>
  )
}

export default Home