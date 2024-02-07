import React from "react";
import {createContext, ReactNode, useContext, useState} from "react";
import {ShoppingCart} from "../components/ShoppingCart.jsx";

/**
 * @typedef {object} ShoppingCartProviderProps
 * @property children {ReactNode}
 */

/**
 * @typedef {object} CartItem
 * @property id {number}
 * @property quantity {number}
 */

/**
 * @typedef {Object} ShoppingCartContext
 * @property {() => void} openCart
 * @property {() => void} closeCart
 * @property {(id: number) => number} getItemQuantity
 * @property {(id: number) => void} increaseCartQuantity
 * @property {(id: number) => void} decreaseCartQuantity
 * @property {(id: number) => void} removeFromCart
 * @property {number} cartQuantity
 * @property {CartItem[]} cartItems
 */


const ShoppingCartContext = createContext(/** @type {ShoppingCartContext} */({}))


export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

/** @param children {ShoppingCartProviderProps} */
export function ShoppingCartProvider({children}){
    const [isOpen, setIsOpen] = useState(false)

    const [cartItems, setCartItems] = useState(/** @type {CartItem[]} */([]))

    const cartQuantity = cartItems.reduce(
        (/** @type {number} */ quantity, /** @type{CartItem} */ item) => item.quantity + quantity,
        0
    );

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    /**
     *
     * @param id {number}
     * @returns {number|*}
     */
    function getItemQuantity(id) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    /** @param id {number} */
    function increaseCartQuantity(id) {
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id) == null) {
                return [...currentItems, { id, quantity: 1 }]
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    /** @param id {number} */
    function decreaseCartQuantity(id) {
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id)?.quantity === 1) {
                return currentItems.filter(item => item.id !== id)
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    /** @param id {number} */
    function removeFromCart(id) {
        setCartItems(currentItems => {
            return currentItems.filter(item => item.id !== id)
        })
    }

    return (
        <ShoppingCartContext.Provider
            value={{
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
            openCart,
            closeCart,
            cartItems,
            cartQuantity,
        }}>
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    )
}