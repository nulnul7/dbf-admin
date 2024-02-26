import './portfoliosUI.css'
import Sidebar from "../../components/sidebar/Sidebar";
// import {portfolioDB} from '../../Dummy'
import BoxPortf from "../../components/boxPortf/BoxPortf";
import images1 from "../../assets/images1";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext';


const PortfoliosUI = () => {
  const [portfoliosData, setPortfoliosData] = useState([])
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext)
  console.log('isi user : ', userData);

  const axiosInstance = axios.create({ baseURL: process.env.REACT_APP_API_URL, })


  useEffect(() => {
    if (userData == null) { navigate('/langsung') }
    try {
      const getPortfolios = async () => {
        const tempPort = await axiosInstance.get("portfolio");
        setPortfoliosData(tempPort.data);
      }
      getPortfolios();
    } catch (error) {
      console.log(error)
    }

  }, [userData, navigate])


  const handleUpdate = (id) => {
    console.log('Update', id);
    navigate('/updatePortfolio', { state: { id } })  // state adalah nama default RRDom
  }

  const handleDelete = (id) => {
    console.log('delete', id);
    navigate('/deletePortfolio', { state: { id } })  // state adalah nama default RRDom
  }

  return (
    <div className="container">
      <div className="wrapper">
        <Sidebar />
        <div className="PContainer">
          <div className="PWrapper">
            <div className="addPortHeader">Portfolio</div>
            <div className="setPortfolios">
              {
                portfoliosData.map(portfolio => {
                  return (
                    <BoxPortf
                      key={portfolio._id}
                      images={portfolio.photos[0] || images1}
                      title={portfolio.title}
                      handleUpdate={() => handleUpdate(portfolio._id)}
                      handleDelete={() => handleDelete(portfolio._id)}
                    />
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfoliosUI;
