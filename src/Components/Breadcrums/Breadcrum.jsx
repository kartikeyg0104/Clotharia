import React from 'react'
import './Breadcrum.css'
import { Link } from 'react-router-dom'

const Breadcrum = (props) => {
    const {product} = props;
    
    return (
        <div className='breadcrum'>
            <div className="breadcrum-container">
                <Link to="/" className="breadcrum-item">
                    <span className="breadcrum-home-icon">🏠</span> Home
                </Link>
                <span className="breadcrum-separator">›</span>
                
                <Link to={`/${product.category}`} className="breadcrum-item">
                    {product.category}
                </Link>
                <span className="breadcrum-separator">›</span>
                
                <span className="breadcrum-item active">{product.name}</span>
            </div>
        </div>
    )
}

export default Breadcrum