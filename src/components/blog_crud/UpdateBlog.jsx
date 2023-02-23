import { useState, useRef } from "react";
import Sidebar from "../sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import './blog.css';
import loadingPict from "../../assets/LoadingBunny.gif";

const UpdateBlog = () => {

    const [updateBlog, setUpdateBlog] = useState({});
    const [blogPhotos, setBlogPhotos] = useState({});
    const [idPort, setIdPort] = useState("");
    const [category, setCategory] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const id = useRef(location.state.id); // useRef biar tidak reRender Dom
    const { current } = id;

    useEffect(() => {
        setIdPort(current);
        // eslint-disable-next-line
    }, [current]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatePhotos = await Promise.all(
                Object.values(blogPhotos).map(async (photo) => {
                    const updateForm = new FormData();
                    updateForm.append("file", photo);
                    updateForm.append("upload_preset", "blogImages");
                    return await axios.post(
                        "https://api.cloudinary.com/v1_1/mangga/image/upload",
                        updateForm
                    );
                })
            );
            console.log("isi dari updateForm", updatePhotos);

            const { client, description, title } = updateBlog;
            const updateData = { client, description, title, photos: category }
            const updating = await axios.put(`http://localhost:5500/5R2I/portfolio/update/${idPort}`, updateData)
            console.log('status', updating);

            navigate('/getPortfolio')

        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        setUpdateBlog((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    return (
        <div className="container">
            <div className="wrapper">
                <Sidebar />
                <div className="contentWrapper">
                    <div className="addPortHeader">Update Blog</div>
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
                                <label htmlFor="glance">Glance</label>
                                <input
                                    type="text"
                                    id="glance"
                                    name="glance"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='textBlog'>
                                <label htmlFor="content">Contents</label>
                                <textarea
                                    rows="10"
                                    cols="61"
                                    id="content"
                                    name="content"
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
                                    onChange={(e) => setBlogPhotos(e.target.files)}
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
                                    <optgroup label="Blog category">
                                        <option value="design">Graphic Design</option>
                                        <option value="techno">Web Design</option>
                                        <option value="sports">Sports</option>
                                        <option value="etcetera">Etcetera</option>
                                    </optgroup>
                                </select>
                            </div>
                            <div className="addPortInput">
                                <label htmlFor="author">Author</label>
                                <input
                                    type="text"
                                    id="author"
                                    name="author"
                                    onChange={handleChange}
                                />
                            </div>
                            <button onClick={handleSubmit} className="btnSubmit">
                                Update Blog
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UpdateBlog



