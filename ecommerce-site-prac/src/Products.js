import React from "react";
import styled from "styled-components";
import FilterSection from "./Component/FilterSection";
import Sort from "./Component/Sort";
import ProductList from "./Component/ProductList";
import { useState } from "react";
import { useEffect } from "react";
import { useProductContext } from "./Context/ProductContext";
import { useFilterContext } from "./Context/FilterContext";
const Products = () => {
  const{filter_products} = useFilterContext()
  return <Wrapper>
        <div className='container grid grid-filter-column'>
            <div>
               <FilterSection/>
            </div>
            <section className="product-view--sort">
                 <div className="sort-filter">
                     <Sort/>
                 </div>
                 <div className="main-product">
                      <ProductList  />
                 </div>
            </section>
        </div>
     </Wrapper>;
};

const Wrapper = styled.section`
  .grid-filter-column {
    grid-template-columns: 0.2fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-filter-column {
      grid-template-columns: 1fr;
    }
  }
`;

export default Products;
