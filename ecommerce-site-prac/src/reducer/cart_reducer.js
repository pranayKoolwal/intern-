import React from 'react'

const cart_reducer = (state,action) => {


    switch(action.type) {
        case 'addToCart':
            let {id,color,amount,product}  = action.payload
            let exists = state.cart.find((cur)=>cur.id === id+color)
            if(exists){
                console.log(state.cart)
                let unique=state.cart.map((value,inx)=>{
                    if(value.id===id+color){
                        let another_amount=value.amount+amount
                        if(another_amount>value.stock){
                              another_amount=value.stock 
                        }
                        return{
                            ...value,
                            amount:another_amount
                        }
                    }
                    else{
                        return{
                            ...value
                        }
                    }
                })
                return {
                    ...state,
                    cart:[...unique]
                }
            }
            else{
                let cartProducts ;
                cartProducts={
                    id:id+color,
                    name:product.name,
                    color,
                    amount,
                    image:product.image[0].url,
                    price:product.price,
                    stock:product.stock
                }
                
                
                return{
                  ...state,
                  cart:[...state.cart,cartProducts]   
                }
            }
        case 'increase':
            console.log('world')
            let checkOut=state.cart.map((value,ixn)=>{
                if(value.id===action.payload){
                    let new_amount= value.amount+1
                    if(new_amount>value.stock){
                        new_amount=1
                    }
                    return {
                        ...value,
                        amount:new_amount
                    }
                }
                else{
                    return{
                        ...value
                    }
                }
            })  
            return{
                ...state,
                cart:[...checkOut]

            }
        case 'total_items':
            if(state.cart.length>0){
                let innerTotal = state.cart.reduce((initial, recur )=>{
                    return  initial+recur.amount
              },0)
              console.log(innerTotal,'this is inner  Total')
              return{
                  ...state,
                  totalItem:innerTotal
              }
            }
            
        case 'decrease':
            let checkOut2=state.cart.map((value,ixn)=>{
                if(value.id===action.payload){
                    let new_amount= value.amount-1
                    if(new_amount<1){
                        new_amount=1 
                    }
                    return {
                        ...value,
                        amount:new_amount
                    }
                }
                else{
                    return{
                        ...value
                    }
                }
            })  
            return{
                ...state,
                cart:[...checkOut2]

            }
        case 'REMOVE_ITEM':
            let data=[...state.cart]
            let updatedValue=data.filter((value)=>value.id!==action.payload)
            return {
                ...state,
                cart:[...updatedValue]
            }
        case 'total_price':
            let TotalPrice=state.cart.reduce((initial,recr)=>{
                initial += recr.amount*recr.price
                return initial
        
            },0) 

            return {
                ...state, 
                totalAmount:TotalPrice
            }  
        case 'clear_all':
            return{
                cart:[],
                totalAmount:'',
                totalItem:'',
                shippingFee:5000
            }        
    
        default:

            return {
                ...state
            }
    }
  
}

export default cart_reducer
