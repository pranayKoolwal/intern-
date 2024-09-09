import React from 'react'
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
const Stars = ({str}) => {
   
    const arr = Array.from({length:5},(value,inx)=>{
         let inxData = inx+0.1
         let inxData2 = inx+ 0.99 
         return(
         <>
             <span>
             {/* && str<inxData2   */}
                {str>=inx+1?
                <>
                   <FaStar/>
                </>:
                str>=inxData  && str<=inxData2 ? 
                <>
                   <FaStarHalfAlt/>
                </>
                :
                     <FaRegStar/>
                }
             </span>
         </>)
    })
  return (
    <div>
       {arr}   
    </div>
  )
}

export default Stars
