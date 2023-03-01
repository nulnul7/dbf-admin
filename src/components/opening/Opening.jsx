import FetchingUrl from "../../hooks/FetchingUrl";
import "./opening.css";


const Opening = () => {

  const urlCountPortfolio = "http://localhost:5500/5R2I/portfolio/find/countByCategory?categories=graphicDesign,webDesign,photography"
  const { portfolioCount, error, loading } = FetchingUrl(urlCountPortfolio)
  console.log('isi port Number', portfolioCount, error, loading);


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
          <div className="number numberBlog">3</div>
          <div className="openInfo">Blog</div>
        </div>
      </div>
    </div>
  );
};

export default Opening;
