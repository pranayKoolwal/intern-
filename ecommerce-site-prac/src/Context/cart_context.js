import { createContext, useContext, useEffect } from "react";
import { useReducer } from "react";
import reducer from '../reducer/cart_reducer'
const CartContext=createContext()
const initialState={
    cart:[],
    totalAmount:0,
    totalItem:0,
    shippingFee:5000
}
const CartProvider=({children})=>{

  
    const [state, dispatch] = useReducer(reducer,initialState)
    useEffect(()=>{
        dispatch({type:'total_items'})
        dispatch({type:'total_price'})
    },[state.cart])
    const addToCart = (id,color,amount,product)=>{
        dispatch({type:'addToCart',payload:{id,color,amount,product}})
    }
    const removeItem=(id)=>{
        dispatch({type:'REMOVE_ITEM',payload:id})
    }
    const increment=(id)=>{
        dispatch({type:'increase' , payload:id})
    }
    const decrement=(id)=>{
        dispatch({type:'decrease',payload:id})
    }
    const clearCart = ()=>{
        dispatch({type:'clear_all'})
    }
    return <CartContext.Provider value={{...state,addToCart,increment,removeItem,clearCart,decrement}}>{children}</CartContext.Provider>
}
const useCartContext = ()=>{
    return useContext(CartContext)
}
export {CartProvider,useCartContext}