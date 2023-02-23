import { useState } from 'react';
import './blog.css';
import Sidebar from '../sidebar/Sidebar';
import axios from 'axios';
import loadingPict from "../../assets/LoadingBunny.gif";


const AddBlog = () => {

    const [blogPhotos, setBlogPhotos] = useState({});
    const [category, setCategory] = useState([]);
    const [blog, setBlog] = useState({})
    const [loading, setLoading] = useState();

    const handleChange = (e) => {
        //create 2 part value; previous value and realtime value and store to usestate
        setBlog((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

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

        //first upload photos to cloudinary and return url address
        try {
            const getURLBlogPhoto = (
                await Promise.all(
                    Object.values(blogPhotos).map(async (photo) => {
                        const photoPostForm = new FormData()
                        photoPostForm.append("file", photo) // nama file yg mau di post
                        photoPostForm.append("upload_preset", "blogImages") // nama folder upload preset
                        const postBlog = await axios.post("https://api.cloudinary.com/v1_1/mangga/image/upload",
                            photoPostForm,
                            options
                        )
                        console.log(postBlog.data.url, "ohyeah");
                        return postBlog.data.url
                    })
                )
            )
            const { author, title, content, glance } = blog
            const blogContent = {
                author, title, content, glance, category, photos: getURLBlogPhoto
            }
            const blogPost = await axios.post("http://localhost:5500/5R2I/blog/add", blogContent)
            console.log(blogPost, "isi blogPost");

        } catch (error) {
            console.log("isi dari error", error);
        }

        setBlogPhotos({})
    }

    return (
        <div className="container">
            <div className="wrapper">
                <Sidebar />
                <div className="PContainer">
                    <div className="PWrapper">
                        <div className="addPortHeader">Add Blog</div>
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
                                    Add Blog
                                </button>
                            </form>
                        </div>
                        {loading ? loadingPict : null}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddBlog