import React from 'react'
import { BsFillGridFill,BsList } from 'react-icons/bs';
import styled from 'styled-components'
import { useFilterContext } from '../Context/FilterContext';
const Sort = () => {
  let {filter_products,grid_view,setGridview,setListview,Sorting} = useFilterContext()
  return (
    <Wrapper className='sort-section'>
       <div className='sorting-list--grid'>
         <button className={grid_view?'active sort-btn':'sort-btn '}>
             <BsFillGridFill className='icon' onClick={()=>{
                setGridview()
             }}/>
         </button>
         <button className={!grid_view?'active sort-btn':'sort-btn '}>
           <BsList className='icon'  onClick={()=>{
            setListview()
           }} />
         </button> 
       </div>
       <div className='product-data'>
           <p>
            {`${filter_products.length} Products Available`}
           </p>
       </div>
       <div className='sort-selection'>
           <form action='#'>
               <select  name='sort' id = 'sort' className='sort-selection--style' onClick={Sorting}>  
                     <option value={'lowest'} >Price(Lowest)</option>
                     <option value={'#'} disabled></option>
                     <option value={'highest'}>Price(Highest)</option>
                     <option value={'#'} disabled></option>
                     <option value={'a-z'}>Price(a-z)</option>
                     <option value={'#'} disabled></option>
                     <option value={'z-a'}>Price(z-a)</option>
               </select>
           </form>
       </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;
  .sorting-list--grid {
    display: flex;
    gap: 2rem;
    .sort-btn {
      padding: 0.8rem 1rem;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .icon {
      font-size: 1.6rem;
    }
    .active {
      background-color: ${({ theme }) => theme.colors.black};
      color: #fff;
    }
  }
  .sort-selection .sort-selection--style {
    padding: 0.5rem;
    cursor: pointer;
    .sort-select--option {
      padding: 0.5rem 0;
      cursor: pointer;
      height: 2rem;
      padding: 10px;
    }
  }
`;
export default Sort
