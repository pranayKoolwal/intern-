import React from 'react'
import './Weather.css'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import cloudy from './images/cloudy.webp'
import rainy from "./images/rainy.gif"
import sunny from './images/sunny.gif'
import windy from './images/windy.gif'
import Haze from './images/Haze.gif'
import smoke from "./images/smokeicons.jpg"
function Weather() {
  let blank=" "
  const [city, setcity] = useState('jaipur')
  const [field, setfield]  = useState('')
  const [main,setmain]= useState({})
  const [Images,setImages]= useState('')
  useEffect(()=>{
     handler()
     switch(main.weather){ 
         case 'Sunny':
            setImages(sunny)
            break
          case 'Clouds':
            setImages(cloudy)
            break  
          case 'Windy':
            setImages(windy)
            break
          case 'Haze':
            setImages(Haze)
            break
          case 'Rainy':
            setImages(rainy)
            break
          case 'Smoke':
            setImages(Haze)
            break                
          default :
                 setImages(sunny) 
     }
  },[main])
  let handler= async() =>{
    try{
      let ApiData=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7e09268196bced9ca9b9ca19b44cfe2c`) 
      let temperatue=ApiData.data.main.temp
      let cityName=ApiData.data.name
      let country=ApiData.data.sys.country
      let weather=ApiData.data.weather[0].main
      let wind = ApiData.data.wind.speed
      let humidity= ApiData.data.main.humidity
      let pressure= ApiData.data.main.pressure
      let maxTemp = ApiData.data.main.temp_max
      let minTemp = ApiData.data.main.temp_min
      setmain({
        temperatue,
        cityName,
        weather,
        humidity,
        pressure,
        maxTemp,
        minTemp,
        wind,
        weather,
        country
      })
    }
    catch(err){
      console.error('comming')
    }
    setcity('')
  }
  return (
    <>
      <div className="search">
        <input type="text"  onChange={(e)=>{
            setcity(e.target.value)
        }} placeholder='Search'/>
        <button type='submit' onClick={handler}>submit</button>
      </div>
       <div className="container">
           <div className="top"><img src={Images} alt="" /></div>
           <div className="bottom">
               <div className="innerOne">
                   <div className="temperature"> <div>{main.temperatue}<span style={{fontSize:'20px'}}>°C</span></div> </div>
                   <div className="other">
                       <div className="weatherImg">{main.weather}</div>
                       <div className="Sec-main">
                           <div>{`humidity  ${main.humidity}`}</div>
                           <div>{`pressure  ${main.pressure}`}</div>
                           <div>{`minTemp  ${main.minTemp}`}</div>
                           <div>{`maxTemp  ${main.maxTemp}`}</div>
                       </div>
                   </div>
               </div>
               <div className="innerTwo">
                     <div className='date'>{new Date().toLocaleDateString()}</div>
                     <div className='coun'>{main.cityName+" - "+main.country}</div>
               </div>
           </div>
       </div>
    </>
    
  )
}

export default Weather