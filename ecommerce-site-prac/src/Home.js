import React from 'react'
import styled from "styled-components"
import Herosection from './Component/Herosection'
import Trusted from './Component/Trusted'
import Services from './Component/Services'
import Footer from './Component/Footer'
import FeatureProduct from './Component/FeatureProduct'
const Home = () => {
  const data = 'pranay koolwal\'s '
  return(
    <>
    <Herosection mine = {data}></Herosection>
    <FeatureProduct/>
    <Services/>
    <Trusted/>   
    </>
  ) 
}
export default Home;
