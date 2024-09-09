import React, { useContext } from 'react'
import Herosection from './Component/Herosection'
import {AppContext} from  './Context/ProductContext'
import {useProductContext} from './Context/ProductContext'
const About = () => {
  const name='pranay Koolwal'
  const data =  useProductContext()
  return (
    <div>

      <Herosection mine={name}/>
    </div>
  )
}

export default About