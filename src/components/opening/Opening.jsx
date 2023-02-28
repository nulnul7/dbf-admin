import axios from "axios";
import { useState, useEffect } from "react";
import "./opening.css";


const Opening = () => {
  const [portNumber, setPortNumber] = useState({})

  useEffect(() => {
    const getNumber = async () => {
      const getPortfolio = await axios.get('http://localhost:5500/5R2I/portfolio')
      console.log('isi portfolio', getPortfolio);
      // const { category } = getPortfolio.data
      const photographyCategory = (categr) => {
        return getPortfolio.data.filter(item => item.category === categr)
      }
      setPortNumber([
        { "photography": photographyCategory("Photography") },
        { "webDesign": photographyCategory("Web Design") },
        { "graphicDesign": photographyCategory("Graphic Design") }
      ])
    }
    getNumber()
  }, [])

  console.log(portNumber, "isi useState");

  return (
    <div className="OpenContainer">
      <div className="openWrapper">
        <div className="openPortfolio">
          <div className="boxLine">
            <div className="number">{Array(portNumber.graphicDesign).length}</div>
            <div className="openInfo">Graphic Design</div>
          </div>
          <div className="boxLine">
            <div className="number">{Array(portNumber.webDesign).length}</div>
            <div className="openInfo">Web Design</div>
          </div>
          <div className="boxLine">
            <div className="number">{Array(portNumber.photography).length}</div>
            <div className="openInfo">Photography</div>
          </div>
        </div>
        <div className="openBlog">
          <div className="number numberBlog">3</div>
          <div className="openInfo">Blog</div>
        </div>
      </div>
    </div>
  );
};

export default Opening;
