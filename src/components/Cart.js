import React, { createContext, useContext, useState } from 'react';
import './Cart.css';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleArrowLeft} from "@fortawesome/free-solid-svg-icons"; // Tạo file CSS riêng cho giỏ hàng

// Tạo Context cho giỏ hàng
const CartContext = createContext();

// Tạo Provider cho giỏ hàng
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item, quantity) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + quantity }
                        : cartItem
                );
            }
            return [...prevCart, { ...item, quantity }];
        });
    };

    const updateQuantity = (itemId, quantity) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === itemId ? { ...item, quantity } : item
            )
        );
    };

    const removeFromCart = (itemId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook để sử dụng Cart Context
export const useCart = () => useContext(CartContext);

// Giao diện giỏ hàng
const Cart = () => {
    const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="cart">
            <Link to={'/home'} style={{
                width: "50px",
                height: "50px",
                fontSize: "30px",
                color: "black",
                paddingLeft: "5px"
            }}><FontAwesomeIcon icon={faCircleArrowLeft} /></Link>
            <h2>Giỏ hàng của bạn</h2>
            {cart.length === 0 ? (
                <p>Giỏ hàng của bạn đang trống.</p>
            ) : (
                <div>
                    {cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <img className="cart-item__image" src={item.image1} alt={item.name} />
                            <div className="cart-item__details">
                                <h3>{item.name}</h3>
                                <p>Giá: {item.price}</p>
                                <div className="cart-item__quantity">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                                    <p>Số lượng: {item.quantity}</p>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>
                                <p>Tổng giá: {item.price * item.quantity}</p>
                                <div className="cart-item__actions">
                                    <button onClick={() => removeFromCart(item.id)}>Xóa khỏi giỏ hàng</button>
                                    <button className="cart-buy-now" onClick={() => alert(`Mua ngay ${item.name}`)}>Mua ngay</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="cart-summary">
                        <h3>Tổng cộng: {calculateTotal()}</h3>
                        <button className="cart-clear" onClick={clearCart}>Xóa tất cả</button>
                        <button className="cart-buy-all">Mua tất cả</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
