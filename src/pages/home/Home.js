import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../AuthContext'
import Opening from '../../components/opening/Opening'
import Sidebar from '../../components/sidebar/Sidebar'
import './home.css'


const Home = () => {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();


  useEffect(() => {
    userData == null && navigate('/langsung')
  }, [userData, navigate])

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