import "./portfolio.css";
import { useState, useRef } from "react";
import Sidebar from "../sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const UpdatePortfolio = () => {
  const [updatePortf, setUpdatePortf] = useState({});
  const [photos, setPhotos] = useState(""); // data default object or string
  const [idPort, setIdPort] = useState("");
  const [category, setCategory] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const id = useRef(location.state.id); // useRef biar tidak reRender Dom
  const { current } = id;

  useEffect(() => {
    setIdPort(current);
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatePhotos = await Promise.all(
        Object.values(photos).map(async (photo) => {
          const updateForm = new FormData();
          updateForm.append("file", photo);
          updateForm.append("upload_preset", "portImages");
          return await axios.post(
            "https://api.cloudinary.com/v1_1/mangga/image/upload",
            updateForm
          );
        })
      );
      const url = updatePhotos.map((item) => item.data.url);

      const { client, description, title} = updatePortf;
      const updateData = {client, description, title, photos: url, category}
      const updating = await axios.put(`http://localhost:5500/5R2I/portfolio/update/${idPort}`, updateData)
      console.log('status', updating);
      
      navigate('/getPortfolio')

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setUpdatePortf((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  return (
    <div className="container">
      <div className="wrapper">
        <Sidebar />
        <div className="PContainer">
          <div className="PWrapper">
            <div className="addPortHeader">Update Porfolio</div>
            <div className="addPort">
              <form className="addPortForm">
                <div className="addPortInput">
                  <label htmlFor="idPortfolio">Id</label>
                  <input
                    type="text"
                    id="idPortfolio"
                    value={idPort}
                    name="idPortfolio"
                    readOnly
                  />
                </div>
                <div className="addPortInput">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="addPortInput">
                  <label htmlFor="client">Client</label>
                  <input
                    type="text"
                    id="client"
                    name="client"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="addPortInput">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="addPortInput">
                  <label htmlFor="photos">Photos</label>
                  <input
                    type="file"
                    id="photos"
                    name="photos"
                    multiple
                    onChange={(e) => setPhotos(e.target.files)}
                    required
                  />
                </div>
                <div className="addPortSelect">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    className="addPortSelect"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <optgroup label="portfolio category">
                      <option value="Graphic Design">Graphic Design</option>
                      <option value="Web Design">Web Design</option>
                      <option value="Photography">Photography</option>
                    </optgroup>
                  </select>
                </div>
                <button onClick={handleSubmit} className="btnSubmit">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePortfolio;
