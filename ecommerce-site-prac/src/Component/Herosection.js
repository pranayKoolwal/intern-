import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '../styles/Button'
const Herosection = ({mine}) => {
  return (
    <Wrapper>
        <div className = 'container'>
            <div className='grid grid-two-column'>
                <div className='hero-section-data'>
                    <p className='intro'> welcome to {mine} Store</p>
                    <h1>Buddy Store</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make aLetraset sheets containing </p>
                    <NavLink to = '/products'>
                        <Button>click</Button>
                    </NavLink>
                </div>
                <div className='hero-section-image'>
                    <figure>
                        <img src='images/hero.jpg' className ='img-style'></img>
                    </figure>
                </div>
            </div>
        </div>
       
    </Wrapper>
    
  )
}
const Wrapper = styled.section`
  padding: 7rem 0;

  img {
    min-width: 7rem;
    height: 7rem;
  }

  .hero-section-data {
    p {
      margin: 2rem 0;
    }

    h1 {
      text-transform: capitalize;
      font-weight: bold;
    }

    .intro-data {
      margin-bottom: 0;
    }
  }

  .hero-section-image {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  figure {
    position: relative;

    &::after {
      content: "";
      width: 60%;
      height: 80%;
      background-color: rgba(81, 56, 238, 0.4);
      position: absolute;
      left: 50%;
      top: -5rem;
      z-index: -1;
    }
  }
  .img-style {
    width: 70%;
    height: auto;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid {
      gap: 10rem;
    }

    figure::after {
      content: "";
      width: 50%;
      height: 100%;
      left: 0;
      top: 10%;
      /* bottom: 10%; */
      background-color: rgba(81, 56, 238, 0.4);
    }
  }
`;
export default Herosection
