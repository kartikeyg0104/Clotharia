import React, { useContext } from 'react'
import './CartItem.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItem = (props) => {
  const { itemId } = props;
  const { all_product, cartItems, removeFromCart, updateCartItemCount } = useContext(ShopContext);
  
  const product = all_product.find(item => item.id === itemId);
  
  return (
    <div className='cartitem'>
      <div className="cartitem-image">
        <img src={product.image} alt="" />
      </div>
      <div className="cartitem-details">
        <p className='cartitem-name'>{product.name}</p>
        <div className="cartitem-category">{product.category}</div>
      </div>
      <div className="cartitem-price">${product.new_price}</div>
      <div className="cartitem-quantity">
        <button 
          onClick={() => updateCartItemCount(Math.max(1, cartItems[itemId] - 1), itemId)}
          className="quantity-btn"
        >
          -
        </button>
        <input 
          type="number" 
          value={cartItems[itemId]} 
          onChange={(e) => {
            const newValue = Number(e.target.value);
            if (newValue >= 0) {
              updateCartItemCount(newValue, itemId);
            }
          }}
        />
        <button 
          onClick={() => updateCartItemCount(cartItems[itemId] + 1, itemId)}
          className="quantity-btn"
        >
          +
        </button>
      </div>
      <div className="cartitem-total">
        ${(product.new_price * cartItems[itemId]).toFixed(2)}
      </div>
      <div className="cartitem-remove-icon" onClick={() => removeFromCart(itemId)}>
        <img src={remove_icon} alt="" />
      </div>
    </div>
  )
}

export default CartItem
