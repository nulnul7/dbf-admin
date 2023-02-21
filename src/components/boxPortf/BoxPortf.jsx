import { Link } from "react-router-dom";
import "./boxPortf.css";

const BoxPortf = ({ images, title, handleUpdate, handleDelete }) => {
  return (
    <div className="boxContainer">
      <div className="boxWrapper">
        <div className="boxTitle">{title}</div>
        <img src={images} alt="" className="boxImage" />
        <div className="btnWrapper">
          <button className="btnBox" onClick={handleUpdate}>
            <Link to="/updatePortfolio">Update</Link>
          </button>
          <button className="btnBox" onClick={handleDelete}>
            <Link to="/deletePortfolio">Delete</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoxPortf;
