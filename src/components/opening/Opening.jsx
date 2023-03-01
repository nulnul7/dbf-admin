import { useState, useEffect } from "react";
import axios from "axios";
import FetchingUrl from "../../hooks/FetchingUrl";
import "./opening.css";

const Opening = () => {

  const [blogCount, setBlogCount] = useState(null)

  const urlCountPortfolio = "http://localhost:5500/5R2I/portfolio/find/countByCategory?categories=graphicDesign,webDesign,photography"
  const { portfolioCount, error, loading } = FetchingUrl(urlCountPortfolio)

  const getCountBlog = async () => {
    try {
      const getBlog = await axios.get('http://localhost:5500/5R2I/blog')
      setBlogCount(getBlog.data.length);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getCountBlog()
  },[])

  return (
    <div className="OpenContainer">
      <div className="openWrapper">
        {
          loading ? "please wait..." :
            <>
              <div className="openPortfolio">
                <div className="boxLine">
                  <div className="number">{portfolioCount?.data?.[0]}</div>
                  <div className="openInfo">Graphic Design</div>
                </div>
                <div className="boxLine">
                  <div className="number">{portfolioCount?.data?.[1]}</div>
                  <div className="openInfo">Web Design</div>
                </div>
                <div className="boxLine">
                  <div className="number">{portfolioCount?.data?.[2]}</div>
                  <div className="openInfo">Photography</div>
                </div>
              </div>
            </>
        }
        <div className="openBlog">
          <div className="number numberBlog">{blogCount}</div>
          <div className="openInfo">{blogCount > 1 ? 'Blogs' : 'Blog'}</div>
        </div>
      </div>
    </div>
  );
};

export default Opening;
