import React, { createContext, useState, useEffect } from 'react'
import all_product from "../Components/Assets/all_product";
export const ShopContext=createContext(null)

const ShopContextProvider =(props) =>{
    const [cartItems, setCartItems] = useState({});
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    
    // Initialize cart with empty quantities
    useEffect(() => {
        const initializeCart = () => {
            let cart = {};
            for(let i=0; i<all_product.length; i++) {
                cart[all_product[i].id] = 0;
            }
            setCartItems(cart);
        }
        initializeCart();
    }, []);
    
    // Update totals when cart changes
    useEffect(() => {
        const updateTotals = () => {
            let items = 0;
            let amount = 0;
            
            for (const item in cartItems) {
                if (cartItems[item] > 0) {
                    let itemInfo = all_product.find(product => product.id === Number(item));
                    items += cartItems[item];
                    amount += itemInfo.new_price * cartItems[item];
                }
            }
            
            setTotalItems(items);
            setTotalAmount(amount);
        }
        
        updateTotals();
    }, [cartItems]);
    
    // Add to cart
    const addToCart = (itemId) => {
        setCartItems(prev => ({
            ...prev,
            [itemId]: prev[itemId] + 1
        }));
    }
    
    // Remove from cart
    const removeFromCart = (itemId) => {
        setCartItems(prev => ({
            ...prev,
            [itemId]: prev[itemId] - 1
        }));
    }
    
    // Update item quantity
    const updateCartItemCount = (newAmount, itemId) => {
        setCartItems(prev => ({
            ...prev,
            [itemId]: newAmount
        }));
    }
    
    // Get total cart amount
    const getTotalCartAmount = () => {
        return totalAmount;
    }
    
    // Get total cart items
    const getTotalCartItems = () => {
        return totalItems;
    }
    
    // Clear cart
    const clearCart = () => {
        let cart = {};
        for(let i=0; i<all_product.length; i++) {
            cart[all_product[i].id] = 0;
        }
        setCartItems(cart);
    }
    
    const contextValue = {
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemCount,
        getTotalCartAmount,
        getTotalCartItems,
        clearCart
    }
    
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
} 

export default ShopContextProvider;