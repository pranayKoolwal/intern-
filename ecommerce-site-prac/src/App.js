import React from "react";
import { BrowserRouter ,Routes,Route } from "react-router-dom";
// import {  } from "react-router-dom";
import Home from './Home'
import Cart from "./Cart"
import About from "./About"
import Products from './Products'
import Footer from './Component/Footer'
import Contact from "./Contact"
import SingleProduct from './SingleProduct'
import Errorpage  from './ErrorPage'
import {GlobalStyle} from './GlobalStyle'
import { ThemeProvider } from "styled-components";
import Header from "./Component/Header";
const App = () => {
  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29,29,29,0.8)",
      white: "#fff",
      black: "#212529",
      helper: "#8490ff",
      bg: "#F6F8FA",
      footer_bg: "#040424",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };
  
  return (
    <>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <GlobalStyle/>
      <Header/>
          <Routes>
              <Route path="/" element = {<Home/>}/>
              <Route path="/About" element={<About/>}/>
              <Route path="/contact" element = {<Contact/>}/>
              <Route path="/products" element = {<Products/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path='/singleproduct/:id' element={<SingleProduct/>}/>
              <Route path="*" element={<Errorpage/>}/>
          </Routes>
        <Footer/>
      </BrowserRouter>
      </ThemeProvider>
    </>
  );
};
export default App;
