import React from 'react'
import styled from 'styled-components'
import {useState} from 'react'
import { TiTick } from "react-icons/ti";
import FormatPrice from '../Helper/FormatPrice'
import { useFilterContext } from '../Context/FilterContext'
import {Button} from '../styles/Button'
const FilterSection = () => {
   const {filters:{text,colors,minPrice,price,maxPrice},clear,updateFilterValue,all_products,categoryFunc,category} = useFilterContext()
  const getUniqueData=(data,attr)=>{
   
   let   newValue = ['All',...new Set(data.map((curr)=>{
      return curr[attr]
  }))]
  if(attr==='colors'){
     newValue=[...new Set(newValue.flat(Infinity))] 
  }
    return newValue
  }
  const categoryData = getUniqueData(all_products, 'category')
  const companyData=getUniqueData(all_products,'company')
  const colorData = getUniqueData(all_products,'colors')
  return (
    <Wrapper>
        <div className='filter-search'>
            <form className = '' onSubmit={(e)=>{e.preventDefault();}}>
                <input type='text' name='text' placeholder='search'  value={text}  onChange={updateFilterValue}/>
            </form>
            
        </div>
        <div className='filter-category'>
            <h3>category</h3>
            <div>
                {categoryData.map((value,inx)=>{
                  
                  return <button type='button' value={value} name='category' onClick={updateFilterValue} className={value===category?'active font':'font'}>{value}</button>
                })}
            </div>
        </div>

        <div className='filter-company'>
          <h3>Company</h3>
          <form action='#'>
              <select name='company' id="company" 
              className="filter-company--select" onClick={updateFilterValue}>
                {companyData.map((value,inx)=>{
                  return <option>{value}</option>
                })}
              </select>
          </form>
        </div>
        <div  className='filter-colors colors'>
          <h3>color</h3>
          <div className ='filter-color-style'>
            {colorData.map((value,ixn)=>{
              return <button key={ixn}
              type="button"
              value={value}
              name="colors"
              style= {{ backgroundColor: value!=='All'?value:'transparent'}}
              className="btnStyle"
              onClick={updateFilterValue} >
                 {value==='All'?'All':null}
                  {value===colors?<TiTick style={{color:'white'}}/>:<></>}
                 
              </button>
            })}
          </div>
        </div>
        <div className="filter_price">
        <h3>Price</h3>
        <p>
          <FormatPrice price={price} />
        </p>
        <input
          type="range"
          name="price"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={updateFilterValue}
        />
      </div>
      <div>
        <Button 
         onClick={clear}>
            clear Filter
        </Button>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  h3 {
    padding: 2rem 0;
    font-size: bold;
  }
  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }
  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;
      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;
        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }
        .font{
         font-size:13px;
        }
      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }
  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }
  .filter-color-style {
    display: flex;
    justify-content: center;
  }
  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
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
  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }
  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;
export default FilterSection
