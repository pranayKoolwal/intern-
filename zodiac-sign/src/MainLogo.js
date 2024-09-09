import React, { useEffect } from 'react'
import { useState  } from 'react'
import Aries from './ImagesSign/aries.jpg'
import taurus from './ImagesSign/taurus.jpg'
import gemini from './ImagesSign/gemini.jpg'
import cancer from './ImagesSign/cancer.jpg'
import leo from './ImagesSign/leo.jpg'
import virgo from './ImagesSign/virgo.jpg'
import libra from './ImagesSign/libra.jpg'
import scorpius from './ImagesSign/scorpio.webp'
import sagittarius from './ImagesSign/sagittarius.jpg'
import aquarious from './ImagesSign/aquarious.jpg'
import piscus from './ImagesSign/piscus.avif'
import capricorn from './ImagesSign/capricorn.jpg'
import './Sign.css'
import axios from 'axios'
const MainLogo = ({data}) => {
  const [zodiacName,setZodiacName] = useState('')
  const [image,setImage] = useState('')
  const {month, name, date} = data
  useEffect(()=>{

     if(month===3 && date >= 21 ||  month===4 && date <=19  ){
             setImage(Aries)
             setZodiacName('Aries')
     }
     else if(month===4 && date >= 20 || month===5 && date <=20)
     {
      setImage(taurus)
      setZodiacName('taurus')
     }
     else if(month===5 && date >= 21 || month===6 && date <=20)
     {
      setImage(gemini)
      setZodiacName('gemini')
     }
     else if(month===6 && date >= 21 || month===7 && date <=22)
     {
      setImage(cancer)
      setZodiacName('cancer')
     }
     else if(month===7 && date >= 23 || month===8 && date <=22)
     {
      setImage(leo)
      setZodiacName('leo')
     }
     else if(month===8 && date >= 23 || month===9 && date <=22)
     {
            setImage(virgo)
      setZodiacName('virgo')
     }
     else if(month===9 && date >= 23 || month===10 && date <=22)
     {
      setImage(libra)
      setZodiacName('libra')
     }
     else if(month===10 && date >= 23 || month===11 && date <=21)
     {
      setImage(scorpius)
      setZodiacName('scorpius')
     }
     else if(month===11 && date >= 22 || month===12 && date <=21)
     {
      setImage(sagittarius)
      setZodiacName('sagittarius')
     }
     else if(month===12 && date >= 22 || month===1 && date <=19)
     {
      setImage(capricorn)
      setZodiacName('capricorn')
     }
     else if(month===1 && date >= 20 || month===2 && date <=18)
     {
      setImage(aquarious)
      setZodiacName('aquarious')
     }
     else if(month===2 && date >= 19 || month=== 3 && date <=20)
     {
      setImage(piscus)
      setZodiacName('piscus')
     }
  },[])
  return (
       <>
           {name==='' || month==='' || date===''?<></>:
           
            <div className='imagesData'>
                  <div className='name'>Hey {name} your zodiac sign is {zodiacName}</div>
                  <div className='img'>
                     <img src={image}/>
                  </div>
            </div>
           
           }
       </>

  ) 
}

export default MainLogo
