import {Fragment,useEffect} from "react"
import Carousel from "react-material-ui-carousel"
import "./ProductDetails.css"
import {useSelector,useDispatch} from "react-redux"
import { clearErrors, getProductDetails } from "../../actions/productAction"
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component"
import ReviewCard  from "./ReviewCard"
import Loader from "../layout/Loader/Loader"


const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        dispatch(getProductDetails(id));
    },[dispatch,id,error]) 

    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
      };
    
    return (
        <Fragment>
            {loading ? <Loader /> : ( 
                <Fragment>
                    <div className="ProductDetails">
                        <div>
                            <Carousel>
                                {product.images &&
                                product.images.map((item, i) => (
                                    <img
                                    className="CarouselImage"
                                    key={i}
                                    src={item.url}
                                    alt={`${i} Slide`}
                                    />
                                ))}
                            </Carousel>
                        </div>
                    
                        <div>
                        <div className="detailsBlock-1">
                            <h2>{product.name}</h2>
                            <p>Product # {product._id}</p>
                        </div>
                        <div className="detailsBlock-2">
                            <ReactStars {...options} />
                            <span className="detailsBlock-2-span">
                            ({product.numOfReviews} Reviews)
                            
                            </span>
                        </div>
                        <div className="detailsBlock-3">
                            <h1>{`₹${product.price}`}</h1>
                            <div className="detailsBlock-3-1">
                            <div className="detailsBlock-3-1-1">
                                <button>-</button>
                                <input type="number" value = "1" readOnly />
                                <button>+</button>
                            </div>
                            <button
                                disabled={product.Stock < 1 ? true : false}
                            >
                                Add to Cart
                            </button>
                            </div>

                            <p>
                            Status:
                            <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                {product.Stock < 1 ? "OutOfStock" : "InStock"}
                            </b>
                            </p>
                        </div>

                        <div className="detailsBlock-4">
                            Description : <p>{product.description}</p>
                        </div>

                        <button className="submitReview">
                            Submit Review
                        </button>
                        </div>
                    </div>

                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews && 
                                product.reviews.map((review)=> <ReviewCard review={review} />
                            )}
                        </div>
                    ):(
                        <p className="noReviews">No Review Yet</p>
                    )}
                    
                </Fragment>
            )}
        </Fragment>
    
        
    )
}

export default ProductDetails;