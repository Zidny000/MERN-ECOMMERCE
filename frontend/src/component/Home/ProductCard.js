import React from 'react'
import {Link} from "react-router-dom"
import { Rating } from '@material-ui/lab'



const ProductCard = ({product}) =>{
    const options = {
        size:"small",
        precision:0.5,
        value:product.ratings,
        readOnly:true,
    }
    return (
        <Link className='productCard' to={'product/'+product._id}>
            <img src={product.images[0].url} alt={product.name}/>
            <p>{product.name}</p>
            <div>
                <Rating {...options} /> 

            </div>
            <span> ({product.numOfReviews} Reviews)</span>
            <span>${product.price}</span> 
{/* 
            <div className="product font-rale">
                <a href="/"><img src={product.images[0].url} className="img-fluid" alt={product.name} /></a>
                <div className="text-center">
                <h6>{product.name}</h6>
                <div className="rating text-warning font-size-12">
                    <Rating {...options} /> 
                </div>
                <div className="price py-2">
                    <span>${product.price}</span>
                    
                </div>
    
                </div>
            </div> */}
        </Link>
       
    )
}

export default ProductCard