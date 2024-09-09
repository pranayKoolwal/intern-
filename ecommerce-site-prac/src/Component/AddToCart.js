import React, { useState } from 'react'
import styled from 'styled-components';
import { FaCheck } from "react-icons/fa";
import {Button} from '../styles/Button'
import {NavLink} from 'react-router-dom'
import CartAmountToggle from './CartAmountToggle';
import { useCartContext } from '../Context/cart_context';
const AddToCart = ({product}) => {
    let {id,stock,colors} = product
    let {addToCart} = useCartContext();
    const [colrs, setColors] = useState(colors[0])
    const [Amount,setamount ] = useState(1)
    let setDecrease=()=>{
        Amount > 1 ? setamount(Amount-1):setamount(1)
    }
    let setincrease=()=>{
      Amount < stock ? setamount(Amount+1):setamount(1)
    }

  return (
     <Wrapper>
        <div className='colors'>
          <p>
             {colors.map((value)=>{
               return(
                   <button style={{backgroundColor:value}} 
                   className={colrs===value?'btnStyle active':'btnStyle'}
                   onClick={()=>{
                    setColors(value)
                   }}
                   >
                        {value===colrs?<FaCheck className='checkStyle'/>:<></>}                         
                   </button>
               )
             })}

           </p>  
        </div>
        {/*  {add to cart}  */}
        <CartAmountToggle 
        amount = {Amount}
        setDecrease = {setDecrease}
        setincrease = {setincrease}
        />
        <NavLink  to={'/cart'}  onClick={()=>addToCart(id,colrs,Amount,product)}>
            <Button className='btn '>Add To Cart</Button>
        </NavLink>
     </Wrapper>
  )
}
const Wrapper = styled.section`
  .colors p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
  .active {
    opacity: 1;
  }
  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }
  /* we can use it as a global one too  */
  .amount-toggle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;
    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }
    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }
`;

export default AddToCart
