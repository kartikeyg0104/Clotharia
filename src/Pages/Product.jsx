import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrum from '../Components/Breadcrums/Breadcrum'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import './CSS/Product.css'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'

const Product = () => {
    const { all_product } = useContext(ShopContext)
    const { productId } = useParams()
    const product = all_product.find((e) => e.id === Number(productId))
    
    if (!product) {
        return (
            <div className="product-not-found">
                <h2>Product not found!</h2>
                <p>The product you are looking for does not exist.</p>
            </div>
        )
    }
    
    return (
        <div className="product">
            <Breadcrum product={product}/>
            <ProductDisplay product={product}/>
            <RelatedProducts product={product}/>
        </div>
    )
}

export default Product