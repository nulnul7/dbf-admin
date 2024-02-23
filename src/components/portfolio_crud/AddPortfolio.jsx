import { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import "./portfolio.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loadingPict from "../../assets/LoadingBunny.gif";
import jwt_decode from 'jwt-decode';

const AddPortfolio = () => {
  const [photos, setPhotos] = useState("");
  const [category, setCategory] = useState("");
  const [portf, setPortf] = useState({});
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  // bagian validasi token
  const [token, setToken] = useState('');
  const [expired, setExpired] = useState('');

  const getToken = async () => {
    try {
      const response = await axios.get('http://localhost:5500/5R2I/auth/token');
      setToken(response.data.aksesToken);
      const decoded = jwt_decode(response.data.aksesToken);
      setExpired(decoded.exp);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getToken();
  }, [])


  const handleChange = (e) => {
    setPortf((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  //alert untuk error dan navigasi ke login page
  // function tokenError() {
  //   alert('token sudah expired');

  //   setTimeout(() => {
  //     navigate('/langsung')
  //   }, 3000)
  // }

  // axios iterceptor panggil refresh token
  const axiosJWT = axios.create()

  axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    if (expired * 1000 < currentDate.getTime()) {
      const response = await axios.get(`http://localhost:5500/5R2I/auth/token`);
      config.headers.Authorization = `Bearer ${response.data.aksesToken}`
      setToken(response.data.aksesToken);
      const decoded = jwt_decode(response.data.aksesToken);
      setExpired(decoded.exp);
    }
    return config;

  }, (error) => {
    return Promise.reject(error.response.status)
  })

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
      //bagian kirim foto-foto
      const list = await Promise.all(
        Object.values(photos).map(async (photo) => {
          const datas = new FormData();
          datas.append("file", photo); // 'file' name is default
          datas.append("upload_preset", "portImages"); // 'upload_preset' name is default, 'portImages' nama folder di cloudinary

          // const uploadOptions = {
          //   use_filename: true // Menggunakan nama file asli
          // };

          const upload = await axiosJWT.post(
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
      const statusUpdate = await axiosJWT.post(
        "http://localhost:5500/5R2I/portfolio/add",
        portfolioData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      );
      console.log("status", statusUpdate);
      navigate("/getPortfolio");
    } catch (error) {
      console.error('Error:', error);
      return null;
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
                      <option value="graphicDesign">Graphic Design</option>
                      <option value="webDesign">Web Design</option>
                      <option value="photography">Photography</option>
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
