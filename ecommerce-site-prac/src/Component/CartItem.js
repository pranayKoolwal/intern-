import React from 'react'
import FormatPrice from '../Helper/FormatPrice'
import CartAmountToggle from './CartAmountToggle'
import { FaTrash } from 'react-icons/fa'
import { useState } from 'react'
import { useCartContext } from '../Context/cart_context'
const CartItem = ({id,name,image,color,price,amount,stock}) => {
    let {removeItem,increment,decrement} = useCartContext()
    let [mainAmount,setAmount] = useState(amount)
   
  return (
    <div className='cart-heading grid grid-five-column'>
        <div className='cart-image--name'>
            <div>
                <figure>
                    <img src={image} alt={id} />
                </figure>
            </div>
            <div>
               <p>{name}</p>
               <div className='color-div'>
                 <p>color:</p>
                 <div className = 'color-style ' style = {{backgroundColor:color ,color:color }}></div>
               </div>
            </div>
        </div>
        <div className='cart-hide'>
            <p>
                <FormatPrice price={price}/>
            </p>
        </div>
        <div>
            <CartAmountToggle 
            amount = {amount}
            setDecrease = {()=>{decrement(id)}}
            setincrease = {()=>{increment(id)}}
            />
        </div>
        <div className='cart-hide'>
            <p>
                <FormatPrice price={price*amount}/>
            </p>
        </div>
        <div>
            <FaTrash className='remove_icon' onClick={()=>{removeItem(id)}}/>
        </div>
    </div>
  )
}

export default CartItem
