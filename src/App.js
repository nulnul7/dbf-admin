import Login from "./components/login/Login";
import Home from "./pages/home/Home";
import {
  Routes,
  Route,
} from "react-router-dom";
import AddPortfolio from "./components/portfolio_crud/AddPortfolio";
import UpdatePortfolio from "./components/portfolio_crud/UpdatePortfolio";
import DeletePortfolio from "./components/portfolio_crud/DeletePortfolio";
import PortfoliosUI from "./pages/portfolios/PortfoliosUI";
import BlogUI from "./pages/Blogs/BlogUI";
import AddBlog from "./components/blog_crud/AddBlog";
import DeleteBlog from "./components/blog_crud/DeleteBlog";
import UpdateBlog from "./components/blog_crud/UpdateBlog";
import ErrorPage from '../src/pages/Errorpage'


function App() {
  return (
    <div className="Container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/langsung" element={<Login />} />
        <Route path="/getPortfolio" element={<PortfoliosUI />} />
        <Route path="/addPortfolio" element={<AddPortfolio />} />
        <Route path="/updatePortfolio" element={<UpdatePortfolio />} />
        <Route path="/deletePortfolio" element={<DeletePortfolio />} />
        <Route path="/getBlog" element={<BlogUI />} />
        <Route path="/addBlog" element={<AddBlog />} />
        <Route path="/updateBlog" element={<UpdateBlog />} />
        <Route path="/deleteBlog" element={<DeleteBlog />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
