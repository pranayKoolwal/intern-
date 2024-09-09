import { CgLogIn } from "react-icons/cg"

const filterReducer =(state,action)=>{
    switch(action.type){
        case 'load_filter':
            let maximumData = [...action.payload].map((value)=>{
                return value.price
            }) 
            let findMax = Math.max(...maximumData)
            return {
                ...state,
                filter_products:[...action.payload],
                all_products:[...action.payload],
                filters:{...state.filters,maxPrice:findMax,price:findMax}      
            }
        case 'set_grid':
            return{
                ...state,
                grid_view:true
            }    
        case 'set_List':
            return{
                ...state,
                grid_view:false
            }
        case 'Get_Sorted':    
                  return{
                    ...state,
                    sorting_value:action.payload
                  }
        case 'SORTING_PRODUCTS':

                let newSorting = [...state.filter_products]
                if(state.sorting_value==='a-z'){
                newSorting=newSorting.sort((a,b) => {
                    return a.name.localeCompare(b.name)
                })
            }
            else if(state.sorting_value==='z-a'){
                newSorting=newSorting.sort((a,b) => {
                    return b.name.localeCompare(a.name)
                })
            }
            else if(state.sorting_value==='lowest'){
                newSorting=newSorting.sort((a,b)=>{
                    return a.price - b.price
                })
            }
            else if(state.sorting_value==='highest'){
                newSorting=newSorting.sort((a,b) => {
                     return b.price - a.price 
                })
            }
            
            return {
                ...state,
                filter_products:newSorting
            }
        case 'update_filter_Value':
                const {name,value} = action.payload
                return {
                    ...state, 
                    filters:{
                        ...state.filters,
                        [name] : value
                    }
                }          

        case 'Filter_Products':
            let {all_products} = state
            let another = [...all_products]
            const {text,colors,company,category,price} = state.filters
            if(text){
                another=another.filter((value) =>{
                    return value.name.toLowerCase().includes(text)
                })
            }
            if(category!=="All"){
                another = another.filter((value,inx)=>{
                    return value.category === state.filters.category
                }) 
            }
                if(company!=='All'){
                    another = another.filter((value,inx)=>{
                        return value.company === state.filters.company
                    }) 
                }        
                if(colors!=='All'){                    
                    another = another.filter((value)=>{
                        return  value.colors.includes(state.filters.colors)
                    })
                }
                if(price){
                    another=another.filter((value)=>{
                        return state.filters.price>=value.price
                    })      
                }
                    return{
                        ...state,
                        filter_products:[...another]
                    }
        case 'clear_filter':
            let findmax =Math.max(... [...action.payload].map((value,inx)=>{
                return value.price                
            })    )
            return{
                ...state,
                filter_products:[...action.payload],
                all_products:[...action.payload],
                filters:{...state.filters,
                    text:'',
                    company:'All',
                    colors:'All',
                    maxPrice:findmax,
                    price:findmax,  
                    category:"All",
                    minPrice: 0,
                }
            }     
        default:
             return{
                ...state
             }    
    }
}


export default filterReducer