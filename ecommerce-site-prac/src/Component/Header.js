import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import Nav from './Nav'
const Header = () => {
  return (
      <MainHeder>
        <NavLink to='/'>
            <img src='../images/dd.jpg' className='logo'/>
        </NavLink>
        <Nav/>
      </MainHeder>
  )
}
const MainHeder = styled.header` 
 height: 7rem;
 background-color:${({theme})=>theme.colors.bg};
 display:flex;
 justify-content: space-between;
 align-items: center;
 position: relative;
.logo{
  left:20px;
  width:120%;
 height: 7rem;
 position:relative;
 border-radius:50%;
}
@media (max-width:${({theme})=>theme.media.mobile}) { 
} 
`;
export default Header
