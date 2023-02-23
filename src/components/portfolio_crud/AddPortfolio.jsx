import { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import "./portfolio.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import loadingPict from "../../assets/LoadingBunny.gif";

const AddPortfolio = () => {
  const [photos, setPhotos] = useState("");
  const [category, setCategory] = useState("");
  const [portf, setPortf] = useState({});
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPortf((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //loading info
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        
        let precentage = Math.floor((loaded * 100) / total);
        console.log('options', precentage);
        precentage !== 100 ? setLoading(true) : setLoading(false)
      },
    };

    try {
      const list = await Promise.all(
        Object.values(photos).map(async (photo) => {
          console.log("ini photo, photo");
          const datas = new FormData();
          datas.append("file", photo); // 'file' name is default
          datas.append("upload_preset", "portImages"); // 'upload_preset' name is default, 'portImages' nama folder di cloudinary

          const upload = await Axios.post(
            "https://api.cloudinary.com/v1_1/mangga/image/upload",
            datas,
            options
          );
          const { url } = upload.data;
          return url;
        })
      );

      const { client, description, title } = portf;
      const portfolioData = {
        client,
        description,
        title,
        photos: list,
        category,
      };
      const statusUpdate = await Axios.post(
        "http://localhost:5500/5R2I/portfolio/add",
        portfolioData
      );
      console.log("status", statusUpdate);
      navigate("/getPortfolio");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <Sidebar />
        <div className="PContainer">
          <div className="PWrapper">
            <div className="addPortHeader">Add Porfolio</div>
            <div className="addPort">
              <form className="addPortForm">
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
                  Submit
                </button>
                {
                  loading && <img src={loadingPict} alt="" className="loading" />
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPortfolio;
