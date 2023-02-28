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
    const [idBlog, setIdBlog] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false)
    const [indicatorNumber, setIndicatorNumber] = useState(10)
    const location = useLocation();
    const navigate = useNavigate();

    const id = useRef(location.state.id); // useRef biar tidak reRender Dom
    const { current } = id;

    useEffect(() => {
        setIdBlog(current);
        try {
            const getBlogData = async () => {
                const blog = await axios.get(`http://localhost:5500/5R2I/blog/${current}`);
                setUpdateBlog(blog.data);
                setBlogPhotos(blog.data.photos)
                console.log(blog.data, 'isi blog');
            }
            getBlogData()
            console.log('isi photos', blogPhotos);
        } catch (error) {
            console.log(error);
        }

        // eslint-disable-next-line
    }, [current]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        //loading info
        const options = {
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;

                let precentage = Math.floor((loaded * 100) / total);
                console.log('options', precentage);
                setIndicatorNumber(precentage)
                precentage !== 100 ? setLoading(true) : setLoading(false)
            },
        };

        try {
            const updatePhotos = await Promise.all(
                Object.values(blogPhotos).map(async (photo) => {
                    const updateForm = new FormData();
                    updateForm.append("file", photo);
                    updateForm.append("upload_preset", "blogImages");
                    const sendBlog = await axios.post(
                        "https://api.cloudinary.com/v1_1/mangga/image/upload",
                        updateForm,
                        options
                    );
                    return sendBlog.data.url   // Blog URL from cloudinary
                })
            );

            const { title, glance, content, author, category } = updateBlog;
            const updateData = { title, glance, content, author, photos: updatePhotos, category }

            await axios.put(`http://localhost:5500/5R2I/blog/update/${current}`, updateData)
            navigate('/getBlog')

        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        setUpdateBlog((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const { title, glance, content, author } = updateBlog
    // const getPhoto = (
    //     updateBlog.photos.map(photo => {
    //         return { photo }
    //     })
    // )


    return (
        <div className="container">
            <div className="wrapper">
                <Sidebar />
                <div className="contentWrapper">
                    <div className="addPortHeader">Update Blog</div>
                    {
                        loading &&
                        <div className="loadingWrapper">
                            <div className="loader"></div>
                            <img src={loadingPict} alt="loading pict" className="pictLoader" />
                            <div className="LoadingNumber" style={{ width: `${indicatorNumber * 5}px`, backgroundColor: "greenyellow" }}>{indicatorNumber}</div>
                        </div>
                    }
                    <div className="addPort">
                        <form className="addPortForm">
                            <div className="addPortInput">
                                <label htmlFor="idPortfolio">Id</label>
                                <input
                                    type="text"
                                    id="idPortfolio"
                                    value={idBlog}
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
                                    defaultValue={title}
                                    required
                                />
                            </div>
                            <div className="addPortInput">
                                <label htmlFor="glance">Glance</label>
                                <input
                                    type="text"
                                    id="glance"
                                    name="glance"
                                    defaultValue={glance}
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
                                    value={content}
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
                                    defaultValue={author}
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



