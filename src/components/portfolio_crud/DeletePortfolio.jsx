import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from "../sidebar/Sidebar";
import './portfolio.css';

const DeletePortfolio = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const {id} = location.state

  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      const delPort = await axios.delete(`http://localhost:5500/5R2I/portfolio/delete/${id}`, () => {
        console.log(delPort);
      })
      navigate('/getPortfolio')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="wrapper">
        <Sidebar />
        <div className="PContainer">
          <div className="PWrapper">
            <div className="addPortHeader">Delete Porfolio</div>
            <div className="addPort">
              <form className="addPortForm">
                <div className="addPortInput">
                    <label htmlFor="idPortfolio">Id</label>
                    <input
                      type="text"
                      id="idPortfolio"
                      value={id}
                      name="idPortfolio"
                      readOnly
                    />
                </div>
                <button onClick={handleDelete} className="btnSubmit">
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePortfolio;
