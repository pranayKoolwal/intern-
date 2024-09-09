import React from 'react'
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
const CartAmountToggle = ({amount,setDecrease,setincrease}) => {
  return (
    <div className='cart-button' >
       <div className='amount-toggle'>
          <button onClick={()=>{setDecrease()}}><FaMinus/></button>
          <div className=''>{amount}</div>
          <button onClick={()=>{setincrease()}}><FaPlus/></button>
       </div>
    </div>
  )
}

export default CartAmountToggle
