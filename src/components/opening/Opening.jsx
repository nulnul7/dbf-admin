import "./opening.css";

const Opening = () => {
  return (
    <div className="OpenContainer">
      <div className="openWrapper">
        <div className="openPortfolio">
          <div className="boxLine">
            <div className="number">12</div>
            <div className="openInfo">Graphic Design</div>
          </div>
          <div className="boxLine">
            <div className="number">9</div>
            <div className="openInfo">Web Design</div>
          </div>
          <div className="boxLine">
            <div className="number">6</div>
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
