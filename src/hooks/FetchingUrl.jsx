import axios from "axios";
import { useState, useEffect } from "react";

const FetchingUrl = (url) => {

    const [portfolioCount, setPortfolioCount] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setLoading(true)
        try {
            const getNumber = async () => {
                const getPortfolio = await axios.get(url)
                setPortfolioCount(getPortfolio)
            }
            setLoading(false)
            getNumber()
        } catch (error) {
            setError(true)
        }

    }, [url])

    const reFetchingUrl = () => {
        setLoading(true)
        try {
            const getNumber = async () => {
                const getPortfolio = await axios.get(url)
                setPortfolioCount(getPortfolio)
            }
            setLoading(false)
            getNumber()
        } catch (error) {
            setError(true)
        }


    }

    return { portfolioCount, loading, error, reFetchingUrl }

}

export default FetchingUrl






// import axios from "axios";
// import { useState, useEffect } from "react";

// const Fetch = (url) => {

//     const [portNumber, setPortNumber] = useState([])
//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState(false)

//     useEffect(() => {
//         setLoading(true)
//         try {
//             const getNumber = async () => {
//                 const getPortfolio = await axios.get(url)
//                 console.log('isi portfolio', getPortfolio);
//                 // const { category } = getPortfolio.data
//                 const photographyCategory = (categr) => {
//                     return getPortfolio.data.filter(item => item.category === categr)
//                 }

//                 setPortNumber([
//                     { "photography": photographyCategory("Photography") },
//                     { "webDesign": photographyCategory("Web Design") },
//                     { "graphicDesign": photographyCategory("Graphic Design") }
//                 ])
//             }
//             setLoading(false)
//             getNumber()
//         } catch (error) {
//             setError(true)
//         }

//     }, [url])

//     const reFecth = () => {
//         setLoading(true)
//         try {
//             const getNumber = async () => {
//                 const getPortfolio = await axios.get(url)
//                 console.log('isi portfolio', getPortfolio);
//                 // const { category } = getPortfolio.data
//                 const photographyCategory = (categr) => {
//                     return getPortfolio.data.filter(item => item.category === categr)
//                 }

//                 setPortNumber([
//                     { "photography": photographyCategory("Photography") },
//                     { "webDesign": photographyCategory("Web Design") },
//                     { "graphicDesign": photographyCategory("Graphic Design") }
//                 ])
//             }
//             setLoading(false)
//             getNumber()
//         } catch (error) {
//             setError(true)
//         }
//     }

//     // console.log(portNumber, "isi useState");


//     return { portNumber, loading, error, reFecth }
// }

// export default Fetch