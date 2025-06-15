import React, { useContext, useState, useEffect } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'

const ShopCategory = (props) => {
    const { all_product } = useContext(ShopContext);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [sortOption, setSortOption] = useState('default');
    const [showSortMenu, setShowSortMenu] = useState(false);
    
    // Filter products by category
    useEffect(() => {
        const filteredProducts = all_product.filter(item => props.category === item.category);
        sortProducts(filteredProducts, sortOption);
    }, [all_product, props.category, sortOption]);
    
    // Function to sort products based on the selected option
    const sortProducts = (products, option) => {
        let sorted = [...products];
        
        switch (option) {
            case 'price-low-to-high':
                sorted.sort((a, b) => a.new_price - b.new_price);
                break;
                
            case 'price-high-to-low':
                sorted.sort((a, b) => b.new_price - a.new_price);
                break;
                
            case 'name-a-to-z':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
                
            case 'name-z-to-a':
                sorted.sort((a, b) => b.name.localeCompare(a.name));
                break;
                
            case 'discount':
                sorted.sort((a, b) => {
                    const discountA = a.old_price - a.new_price;
                    const discountB = b.old_price - b.new_price;
                    return discountB - discountA;
                });
                break;
                
            default:
                // Default sorting (no particular order, just as they come from the data)
                break;
        }
        
        setSortedProducts(sorted);
    };
    
    // Get the sort option label for display
    const getSortLabel = () => {
        switch (sortOption) {
            case 'price-low-to-high': return 'Price: Low to High';
            case 'price-high-to-low': return 'Price: High to Low';
            case 'name-a-to-z': return 'Name: A to Z';
            case 'name-z-to-a': return 'Name: Z to A';
            case 'discount': return 'Highest Discount';
            default: return 'Featured';
        }
    };
    
    // Handle clicking outside the sort menu to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showSortMenu && !event.target.closest('.shopcategory-sort-container')) {
                setShowSortMenu(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSortMenu]);
    
    // Set the displayed product count range
    const productCount = sortedProducts.length;
    const displayRange = productCount > 0 ? `1-${Math.min(12, productCount)}` : '0';
    
    return (
        <div className='shop-category'>
            <img className='shopcategory-banner' src={props.banner} alt="" />
            <div className="shopcategory-indexSort">
                <p>
                    <span>Showing {displayRange}</span> out of {productCount} products
                </p>
                <div className="shopcategory-sort-container">
                    <div 
                        className="shopcategory-sort"
                        onClick={() => setShowSortMenu(!showSortMenu)}
                    >
                        Sort by: <span className="selected-sort">{getSortLabel()}</span> 
                        <img 
                            src={dropdown_icon} 
                            alt="dropdown" 
                            className={showSortMenu ? 'rotated' : ''}
                        />
                    </div>
                    
                    {showSortMenu && (
                        <div className="sort-options">
                            <div 
                                className={`sort-option ${sortOption === 'default' ? 'active' : ''}`}
                                onClick={() => {
                                    setSortOption('default');
                                    setShowSortMenu(false);
                                }}
                            >
                                Featured
                            </div>
                            <div 
                                className={`sort-option ${sortOption === 'price-low-to-high' ? 'active' : ''}`}
                                onClick={() => {
                                    setSortOption('price-low-to-high');
                                    setShowSortMenu(false);
                                }}
                            >
                                Price: Low to High
                            </div>
                            <div 
                                className={`sort-option ${sortOption === 'price-high-to-low' ? 'active' : ''}`}
                                onClick={() => {
                                    setSortOption('price-high-to-low');
                                    setShowSortMenu(false);
                                }}
                            >
                                Price: High to Low
                            </div>
                            <div 
                                className={`sort-option ${sortOption === 'name-a-to-z' ? 'active' : ''}`}
                                onClick={() => {
                                    setSortOption('name-a-to-z');
                                    setShowSortMenu(false);
                                }}
                            >
                                Name: A to Z
                            </div>
                            <div 
                                className={`sort-option ${sortOption === 'name-z-to-a' ? 'active' : ''}`}
                                onClick={() => {
                                    setSortOption('name-z-to-a');
                                    setShowSortMenu(false);
                                }}
                            >
                                Name: Z to A
                            </div>
                            <div 
                                className={`sort-option ${sortOption === 'discount' ? 'active' : ''}`}
                                onClick={() => {
                                    setSortOption('discount');
                                    setShowSortMenu(false);
                                }}
                            >
                                Highest Discount
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="shopcategory-products">
                {sortedProducts.length > 0 ? (
                    sortedProducts.map((item) => (
                        <Item 
                            key={item.id} 
                            id={item.id} 
                            name={item.name} 
                            image={item.image} 
                            new_price={item.new_price} 
                            old_price={item.old_price}
                        />
                    ))
                ) : (
                    <div className="no-products">
                        <h3>No products found</h3>
                        <p>Try different filters or browse our other collections.</p>
                    </div>
                )}
            </div>
            <div className="shopcategory-loadmore">
                Explore More
            </div>
        </div>
    )
}

export default ShopCategory