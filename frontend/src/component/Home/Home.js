import 'bootstrap/dist/css/bootstrap.css';
import { Fragment, useEffect } from "react"
// import { CgMouse } from "react-icons/all";
import "./Home.css"
import Product from "./ProductCard.js"
import Loader from "../layout/Loader/Loader"
import MetaData from "../layout/MetaData"
import {clearErrors,getProduct} from "../../actions/productAction"
import {useSelector,useDispatch} from "react-redux"
import { useAlert } from "react-alert"
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import banner1 from "../../images/banner1-cr-500x150.jpg";
import banner2 from "../../images/banner2-cr-500x150.jpg";
import blog1 from "../../images/blog/blog1.jpg";
import blog2 from "../../images/blog/blog2.jpg";
import blog3 from "../../images/blog/blog3.jpg";




const Home = ()=>{
    const alert=useAlert()
    const dispatch = useDispatch();
    const {loading,error,products} = useSelector(state=>state.products)

    const options1 = {
      loop:true,
      nav:true,
      dots:false,
      responsive:{
       0:{
        items:2
       },
       425:{
        items:3
       },
       1000:{
        items:4
       }
      }
    }

    const options2 = {
      loop:true,
      nav:false,
      dots:true,
      responsive:{
       0:{
        items:2
       },
       425:{
        items:3
       },
       1000:{
        items:4
       }
      }
    }
    
    useEffect(()=>{
        if(error){
          alert.error(error)
          dispatch(clearErrors())
        }
        dispatch(getProduct())
    },[dispatch,error,alert])

    return(
        <Fragment>
        {loading ? (
         <Loader />
        ) : (
          <Fragment>
            <MetaData title="ECOMMERCE" />
  
            <div className="banner">
              <p>Welcome to Ecommerce</p>
              <h1>FIND AMAZING PRODUCTS BELOW</h1>
  
              <a href="#container">
                <button>
                  Scroll
                </button>
              </a>
            </div>
  
            <h2 className="homeHeading">Featured Products</h2>

            <div className="itemContainer">
              <div className="items"> 
                <OwlCarousel className='owl-carousel owl-theme owl-loaded owl-drag' {...options1}>
                {products &&
                    products.map((product) => (
                      <Product key={product._id} product={product} />
                    ))}
                </OwlCarousel>
              </div>
            
            </div>

            <h2 className="homeHeading">Top Brands</h2>

            <div className="itemContainer">
              <div className="items"> 

                {products &&
                    products.map((product) => (
                      <Product key={product._id} product={product} />
                    ))}

              </div>

            </div>
            
            <div className="container text-center">
              <img src={banner1} alt="banner1" class="img-fluid" style={{width:'400px',marginRight:'5px'}}/>
              <img src={banner2} alt="banner2" class="img-fluid" style={{width:'400px'}} />
            </div>


            
            <h2 className="homeHeading">New phones</h2>
            
            <div className="itemContainer">
              <div className="items"> 
                <OwlCarousel className='owl-carousel owl-theme owl-loaded owl-drag' {...options2}>
                {products &&
                    products.map((product) => (
                      <Product key={product._id} product={product} />
                    ))}
                </OwlCarousel>
              </div>
            
            </div>



            <div className="container py-4">
              <h4 className="font-rubik font-size-20 mb-5"> Latests Blogs  </h4>
              <hr />
              <OwlCarousel className="owl-carousel owl-theme owl-loaded owl-drag">
                  
                  <div className="cards border-0 font-rale mr-5" style={{width: '18rem'}}>
                    <h5 className="card-title font-size-16 mb-3">Upcoming Mobiles</h5>
                    <img src={blog1} alt="card1" className="card-img-top"/>
                    <p className="card-text font-size-14 text-black-50 py-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate minus nisi natus expedita fugiat doloremque quaerat esse quis unde, sapiente aliquid nulla reprehenderit tempore atque distinctio amet provident vel ipsum.</p>
                  </div>
              
                  <div className="cards border-0 font-rale mr-5" style={{width: '18rem'}}>
                    <h5 className="card-title font-size-16 mb-3">Upcoming Mobiles</h5>
                    <img src={blog2} alt="card1" className="card-img-top"/>
                    <p className="card-text font-size-14 text-black-50 py-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate minus nisi natus expedita fugiat doloremque quaerat esse quis unde, sapiente aliquid nulla reprehenderit tempore atque distinctio amet provident vel ipsum.</p>
                  </div>
                
                  <div className="cards border-0 font-rale mr-5" style={{width: '18rem'}}>
                    <h5 className="card-title font-size-16 mb-3">Upcoming Mobiles</h5>
                    <img src={blog3} alt="card1" className="card-img-top" />
                    <p className="card-text font-size-14 text-black-50 py-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate minus nisi natus expedita fugiat doloremque quaerat esse quis unde, sapiente aliquid nulla reprehenderit tempore atque distinctio amet provident vel ipsum.</p>
                  </div>
              
                </OwlCarousel>
          
            </div>


                        
          </Fragment>
        )}
      </Fragment>
       
    )
}

export default  Home