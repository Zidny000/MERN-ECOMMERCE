
import { Fragment, useEffect } from "react"
// import { CgMouse } from "react-icons/all";
import "./Home.css"
import Product from "./Product.js"
import MetaData from "../layout/MetaData"
import {getProduct} from "../../actions/productAction"
import {useSelector,useDispatch} from "react-redux"



const product = {
    name:"Blue Tshirt",
    images: [{url:"https://i.ibb.co/DRST11n/1.webp"}],
    price:"$234",
    _id:"1234"
}
const Home = ()=>{
    const dispatch = useDispatch();
    const {loading,error,products,productsCount} = useSelector(state=>state.products)
    useEffect(()=>{
        dispatch(getProduct())
    },[dispatch])

    return(
        <Fragment>

            <MetaData title="Ecommerce"/>

            <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                <a href="#container">
                    <button>
                    Scroll 
                    </button>
                </a>

            </div>

            <h2 className="homeHeading">Featured Product</h2>
            <div className="container" id="container">
               {products && products.map(product => <Product product={product} /> )}
            </div>
            
        </Fragment>
    )
}

export default  Home