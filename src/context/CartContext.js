// src/context/CartContext.js
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (productToAdd) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === productToAdd.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === productToAdd.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...productToAdd, quantity: 1 }];
        });
        console.log("Producto añadido al carrito (frontend):", productToAdd.name);
    };

    const incrementQuantity = (productId) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decrementQuantity = (productId) => {
        setCartItems(prevItems =>
            prevItems.map(item => {
                if (item.id === productId) {
                    if (item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                    return null; // Marcar para eliminar
                }
                return item;
            }).filter(item => item !== null)
        );
    };
    
    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const value = {
        cartItems,
        addToCart,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};