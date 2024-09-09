import React, { createContext, useContext, useEffect } from 'react'
import {creactContext} from 'react'
import { useReducer } from 'react'
import reducer from '../reducer/productReducer'
import axios from 'axios'
const  AppContext= createContext()
const initialData = {
    isLoading:false,
    isError:false,
    products:[],
    featureProduct:[],
    isSingleLoading:false,
    singleProduct:{}
}
const AppProvider = ({children})=>{
    const [state,disFunc ] = useReducer( reducer,initialData)
    // let Api = "";
    let Api = 'https://api.pujakaitem.com/api/products'
    const getProducts = async (params)=>{

        disFunc({type:'set-loading'})
       try {
         const res = await axios.get(params) 
         const products = await res.data
         disFunc({type:'MY_API_DATA',payload:products})
       } catch (error) {
          disFunc({type:'api_err'})
       }
    }
    // 2nd api
    const SingleProductPageData = async (params)=>{
        disFunc({type:'set-single-loading'})
        try {
            const res = await axios.get(params) 
            const singleProducts = await res.data
            disFunc({type:'Set_Single_Product',payload:singleProducts})
        } catch (error) {
            disFunc({type:'Set_Single_Error'})
        }
    }
    useEffect(()=>{
        getProducts(Api);
    },[])
    return <AppContext.Provider value = {{...state , SingleProductPageData}}>{children}</AppContext.Provider>
}
const useProductContext = ()=>{
    return  useContext(AppContext)
}
   
export {AppProvider,AppContext,useProductContext}
