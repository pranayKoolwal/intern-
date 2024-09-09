import React from 'react'

const productReducer = (state,action) => {
   if(action.type==='set-loading'){
    return {...state , isLoading:true   }
   }
   if(action.type==='api_err'){
    return {...state , isLoading:false ,isError:true    }
   }
   if(action.type === 'MY_API_DATA'){
      const featrueData = action.payload.filter((value,inx)=>{
         return value.featured === true
      })
      return {
        ...state,
        isLoading:false,
        products:action.payload,
        featureProduct: featrueData
      }
   }
   if(action.type==='set-single-loading'){
      return {...state , isSingleLoading:true}
   }
   if(action.type==='Set_Single_Error'){
      return {...state , isError:true , isSingleLoading:false }
   }
   if(action.type==='Set_Single_Product'){
      return {...state , isSingleLoading:false , singleProduct:action.payload}
   }
   
    
  
}

export default productReducer
