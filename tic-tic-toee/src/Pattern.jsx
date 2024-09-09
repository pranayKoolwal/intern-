import React, { useEffect } from 'react' ;
import './Pattern.css';
import { useState } from 'react'; 
import { isCompositeComponent } from 'react-dom/test-utils';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
function Pattern() { 
  let mapping = [1,2,3,4,5,6,7,8,9] 
  let [collection , setCollection] = useState([])
  let [images, setImg] = useState(["","","","","","","","",""])
  let [char,setchar] = useState({
    me:[],
    pc:[]
  })
  let [currentPoints,setpos] = useState('')
  let [inner,setInner] = useState([])
  let [result,setresult] = useState('none')
  let winning_possiblities = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [2,5,8],
    [2,4,6],
    [0,4,8],
    [1,4,7]
  ]
  let reset = ()=>{
        setCollection([])
        let setInter = setTimeout(()=>{
          setImg([])
        },5000) 
      setchar({me:[],pc:[]})
      setpos('')
      setInner([])
      setresult('none')
  }
  useEffect(()=>{
      if(currentPoints!==""){
         let ImageData = [...images]
         ImageData[currentPoints] = 'cross'
        setImg([...ImageData])
        setCollection([...collection,currentPoints])
        }
        let forFinal = {...char}
        for (const iterator of forFinal['pc']) {
          if(images[iterator]===""){
             let data = {...forFinal}
             let pos = data['pc'].indexOf(iterator)
             data['pc'].splice(pos,1)
             forFinal={...data}
             setchar({...data})

            }
        }
             let sec=Array.from(new Set(forFinal['pc']))
             forFinal={...forFinal,pc:[...sec]}
             console.log(forFinal)
              for(let state in winning_possiblities){
                 let pointer_me = 0
                 let pointer_pc = 0
                  for(let innerState of winning_possiblities[state]){
                       if(forFinal['me'].includes(innerState) ){
                         ++pointer_me  
                       }
                       if(forFinal['pc'].includes(innerState)){
                         ++pointer_pc    
                       }
                  }

                  if(pointer_me===3 ){
                     toast.success('you won')
                     reset()
                  
                     break
                  }
                  else if(pointer_pc===3){
                    toast.error('you Lost')
                    reset()
                  
                    break                   
                  }
                  else if(forFinal['me'].length+forFinal['pc'].length === mapping.length ){
                    console.log(forFinal)

                     toast.dark('tie')
                     reset()
                  
                     break
                  }
                  
              }

  },[currentPoints])
let eventFunc = (get)=>{
    let mine={...char}
    mine['me'].push(get)
    let img = [...images]
    img[get] = 'cross'
    let col = [...collection,get]
    setchar({...mine}) 
    setpos(get)
    inBetweenFunc([...col],[...img],mine)
}
let inBetweenFunc=(col,img,person)=>{
  let end_check=0
  let data = [...inner]
    if(person['me'].length >1){
      for(let i in winning_possiblities){
        let pointer = 0
        if(!data.includes(i)){
             for (let j in winning_possiblities[i]){
               if(person['me'].includes(winning_possiblities[i][j]) ){
                   pointer++
               }
             }
             if(pointer===2 ){
               data.push(i)
               setInner([...data])
               again(winning_possiblities[i], person)
               pointer=0
               end_check='done'
               break
             }  
      } 
      else{
        comp(col,img)
      }   
    }
    }
    if(end_check!='done'){
            comp(col,img)
    }
}
let again = (get ,person)=>{
  for(let j of get){
      if(!person['me'].includes(j) && !collection.includes(j)){
            let Inner= [...images]
            Inner[j] = 'zero'
            let charData = {...person}
            charData['pc'].push(j)
            setchar({...charData})
            setCollection([...collection,j])    
            setImg([...Inner])    
            break
      }
  }

}
let comp = (num1 , num2)=>{
      let arr= []
      let innerNum1 = [...num1]
      let innerNum2 = [...num2]
      if(collection.length<mapping.length){
        while (true){
          let rd= Math.floor(Math.random() * mapping.length)
          if(!innerNum1.includes(rd)){
              innerNum1.push(rd)
              innerNum2[rd] = 'zero'
              setCollection([...innerNum1])
              setImg([...innerNum2])
              let pcData={...char}
              pcData.pc.push(rd)
              setchar({...pcData})
              let all=[]
              if(char['me'].length<=2){
                for(let index in winning_possiblities)
                  {
                    if(winning_possiblities[index].includes(rd) && !inner.includes(index)){
                          all.push(index)
                          break
                    }
                  }                
                setInner([...inner,...all])
              }
                 
              break 
          }
      }}    
}
   return(
    <>
      <div className="container" >
        {mapping.map((value)=>{
            return <>
              <div
                className={images[value-1]}
                id={value-1}
                onClick={  
                ()=>{eventFunc(value-1)}
                } >
            </div>
            </>
        })}
      </div>  
    </>
   )
}


export default Pattern