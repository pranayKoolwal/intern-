import { Route , Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'
import HomePage from './Components/HomePage';
import { ThemeProvider } from "styled-components";
import Login from './Components/Login';
function App() {
 return(
 <>
   <ThemeProvider theme={{}}>
           <HomePage/>
    </ThemeProvider> 
 </>
 )
}

export default App;
