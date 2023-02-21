import './portfoliosUI.css'
import Sidebar from "../../components/sidebar/Sidebar";
// import {portfolioDB} from '../../Dummy'
import BoxPortf from "../../components/boxPortf/BoxPortf";
import images1 from "../../assets/images1";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';


const PortfoliosUI = () => {
  const [portfoliosData, setPortfoliosData] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const getPortfolios = async () => {
       const tempPort = await axios.get("http://localhost:5500/5R2I/portfolio");
       setPortfoliosData(tempPort.data);
      }
      getPortfolios();
    } catch (error) {
      console.log(error)
    }

  },[])

  const handleUpdate = (id) => {
    console.log('Update', id);
    navigate('/updatePortfolio', {state: {id}})  // state adalah nama default RRDom
  }

  const handleDelete = (id) => {
    console.log('delete', id);
    navigate('/deletePortfolio', {state: {id}})  // state adalah nama default RRDom
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
                      key = {portfolio._id}
                      images={portfolio.photos[0] || images1} 
                      title={portfolio.title} 
                      handleUpdate = {() => handleUpdate(portfolio._id)}
                      handleDelete = {() => handleDelete(portfolio._id)}
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
