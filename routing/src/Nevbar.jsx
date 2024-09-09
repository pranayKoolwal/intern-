import React from 'react'
import { useState } from 'react'
function Nevbar(get) {
    const [AppData, SetAppData] = useState('')
    let Data= [...get.criteria.data]
    let Check = []
  return (
    <div className='nav'>
        {Data.map((value,inx)=>{
            if(!Check.includes(value.category)){
                Check.push(value.category)
                return <div onClick={()=>{
                    get.criteria.help(value.category)
                }}>{value.category}</div>
            }
        })}
    </div>
  )
}

export default Nevbar