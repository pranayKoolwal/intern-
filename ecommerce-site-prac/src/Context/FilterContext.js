import { createContext, useContext } from "react";
import { useProductContext } from "./ProductContext";
import { useReducer } from "react";
import { useState } from "react";
import { useEffect } from "react";
import filterReducer  from '../reducer/FilterReducer'
let filter=createContext()
let initialState={
    filter_products:[],
    all_products:[],
    grid_view:false,
    sorting_value:'lowest',
    filters:{
        text:'',
        company:'All',
        colors:'All',
        maxPrice: 0,
        price: 0,
        category:"All",
        minPrice: 0,
    }
}
const FilterContext =({children})=>{
    const [state,dispatch] = useReducer (filterReducer,initialState)
    const {products} = useProductContext()
    useEffect(()=>{
        dispatch({type:'load_filter',payload:products})
    },[products])
    // useEffect(()=>{
            
    //   },[state.sorting_value])
    useEffect(()=>{
        dispatch({type:'Filter_Products'})
        dispatch({type:'SORTING_PRODUCTS'})
       },[state.filters,state.sorting_value])
  
    const setGridview=()=>{
        dispatch({type:'set_grid'})
    }
    const setListview=()=>{
        dispatch({type:'set_List'})
    }
    const clear=()=>{
        dispatch({type:'clear_filter',payload:products})
    }
    const categoryFunc=(data)=>{
        dispatch({type:'set_cat',payload:data})
    }
    const Sorting = (get)=>{
        let user=get.target.value
        dispatch({type:'Get_Sorted',payload:user})
    }
    const updateFilterValue=(e)=>{
        let name=e.target.name
        let value=e.target.value

        dispatch({type:'update_filter_Value',payload:{name,value}})
    }
    return(
        <filter.Provider value = {{...state , clear,setGridview,setListview,Sorting,updateFilterValue,categoryFunc}}>
           {children}
         </filter.Provider>
   
    )
}
const useFilterContext= ()=>{
    return useContext(filter)
}
export{FilterContext,useFilterContext,filter}