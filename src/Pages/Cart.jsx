import React, { useContext } from 'react'
import './CSS/Cart.css'
import { ShopContext } from '../Context/ShopContext'
import { useNavigate } from 'react-router-dom'
import CartItem from '../Components/CartItem/CartItem'

const Cart = () => {
  const { cartItems, getTotalCartAmount, getTotalCartItems, clearCart } = useContext(ShopContext);
  const navigate = useNavigate();
  
  const totalAmount = getTotalCartAmount();
  const totalItems = getTotalCartItems();
  
  return (
    <div className='cart'>
      <div className="cart-container">
        <div className="cart-items-header">
          <h1>Your Cart</h1>
          <hr />
          {totalItems > 0 ? (
            <p>{totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
        
        {totalItems === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <button onClick={() => navigate('/')}>CONTINUE SHOPPING</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              <div className="cart-items-format-header">
                <p>Product</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
              </div>
              <hr />
              
              {Object.keys(cartItems).map((itemId) => {
                if (cartItems[itemId] > 0) {
                  return <CartItem key={itemId} itemId={Number(itemId)} />
                }
                return null;
              })}
            </div>
            
            <div className="cart-bottom">
              <div className="cart-total">
                <div className="cart-total-item">
                  <p>Subtotal</p>
                  <p>${totalAmount}</p>
                </div>
                <hr />
                <div className="cart-total-item">
                  <p>Shipping Fee</p>
                  <p>${totalAmount > 0 ? 10.00 : 0.00}</p>
                </div>
                <hr />
                <div className="cart-total-item cart-total-final">
                  <h3>Total</h3>
                  <h3>${totalAmount > 0 ? (totalAmount + 10.00).toFixed(2) : 0.00}</h3>
                </div>
                <div className="cart-checkout">
                  <button onClick={() => navigate('/checkout')}>PROCEED TO CHECKOUT</button>
                  <button className="clear-cart" onClick={clearCart}>CLEAR CART</button>
                </div>
              </div>
              <div className="cart-promocode">
                <div>
                  <p>If you have a promo code, Enter it here</p>
                  <div className="promobox">
                    <input type="text" placeholder="Promo Code" />
                    <button>Apply</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart