import { createContext, useState } from 'react'

export const CartContext = createContext([])

const CartProvider = (children) => {
    const [cart, setCart] = useState([])

    const isInCart = (productId) => {
        return cart.findIndex(itemCart => itemCart.id === productId) >= 0
    }

    const clearCart = () => {
        setCart([])
    }

    const addToCart = (item, quantity) => {
        if(cart.length === 0) {
            const itemToAdd = {
                ...item.producto,
                quantity: parseInt(quantity)
            }
            setCart([itemToAdd])
            cart.push(itemToAdd)
            return
        }

        const itemDuplicateIndex = cart.findIndex(itemCart => itemCart.id === item.producto.id)
        
        if(itemDuplicateIndex >= 0) {
            const itemToUpdate = {
                ...item.producto,
                quantity: cart[itemDuplicateIndex].quantity + parseInt(quantity)
            }
            const cartDraft = [...cart]
            cartDraft[itemDuplicateIndex] = itemToUpdate
            setCart(cartDraft)
        } else {
            const itemToAdd = {
                ...item.producto,
                quantity: parseInt(quantity)
            }
            const cartDraft = [...cart, itemToAdd]
            setCart(cartDraft)
        }
    }

    const removeFromCart = () => { }

    return (
        <CartContext.Provider value={{ cart, isInCart, clearCart, addToCart, removeFromCart, cartQty: cart.length }}>
            {children.children}
        </CartContext.Provider>
    )
}

export default CartProvider