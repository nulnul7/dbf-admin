import { useState } from 'react';
import './blog.css';
import Sidebar from '../sidebar/Sidebar';
import axios from 'axios';

const AddBlog = () => {

    const [blogPhotos, setBlogPhotos] = useState({});
    const [category, setCategory] = useState([]);
    const [blog, setBlog] = useState({})

    const handleChange = (e) => {
        //create 2 part value; previous value and realtime value and store to usestate
        setBlog((prev) => ({ ...prev, [e.target.id]: e.target.value }))
        // console.log(blog, "isi dari blog");

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        //first upload photos to cloudinary and return url address
        try {
            const photoURL = Object.values(blogPhotos).map(async (photo) => {
                const photoForm = new FormData();
                photoForm.append("file", photo)
                photoForm.append("upload_preset", "portImages")
                const postPhoto = await axios("https://api.cloudinary.com/v1_1/mangga/image/upload",
                    photoForm
                )
                console.log(postPhoto, "isi dari post foto", photoURL);
            })
        } catch (error) {
            console.log(error.data);
        }


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
                                    <label htmlFor="description">Glance</label>
                                    <input
                                        type="text"
                                        id="description"
                                        name="description"
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
                                <button onClick={handleSubmit} className="btnSubmit">
                                    Add Blog
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AddBlog