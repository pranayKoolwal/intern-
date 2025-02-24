import React from 'react'
import "./TOdo.css"
import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { colors } from '@mui/material';
function Todo() {
  const [pointer1,setpointer]  = useState(0)
  const [update, setupdate  ] = useState(0)
  const [task, settask] = useState("")
  const [description, setDesc] = useState("")
  const [time, setTime] = useState("")
  const [main, setmain] = useState({
    Task:[],
    Des:[],
    TimeData:[]
  })
  let handleFunc = (e)=>{
    e.preventDefault();
    if(pointer1===0){
      let setting = {...main}

      setting.Des.push(description ? description : "No Description")
      setting.Task.push(task ? task : "No Task")
      setting.TimeData.push(time ? time : "No Time")
      setmain({...setting})
      settask("")
      setDesc("")
      setTime("")
    }
    else{
          let setData = {...main}        
          setData['Task'][update]  = task 
          setData['Des'][update]  = description
          setData['TimeData'][update] = time
          setmain({...setData})
          console.log(update)
          settask("")
          setDesc("")
          setupdate("")
          setTime("")
          setpointer(0)
    }
  }
  let deletefunc = (inx)=>{
    let del = {...main}
    for(let x in del){
       del[x].splice(inx,1)
    }
    setmain({...del})
  }
  let updatefunc = (inx)=>{
    let del = {...main}
    settask(del.Task[inx])
    setpointer(1)
    setDesc(del.Des[inx])
    setTime(del.TimeData[inx])
    setupdate(inx)
  }
  return (
    <>
      <h1  className='Top'>have some Goals in life</h1>
      <form className="container" onSubmit={handleFunc}>
        <h1>TO-DO</h1>
          <input type="text" className='task' value={task}  placeholder='Enter Task' onChange={(e)=>{
             settask(e.target.value)
             console.log(task)
          }}/>
          <br/>
          <input type='datetime-local' value={time} onChange={(e)=>{
            setTime(e.target.value.toString())
          }}/>
          <br/>
          <textarea  className='des' value={description}  placeholder='Description' onChange={(e)=>{
             setDesc(e.target.value)
          }}/>
          <br/>
        <input type="submit" className='submit' value="submit" />
      </form>
      {main.Des.length>0?
      <>
          <table id='customers'>
          <tr>
             <th>task</th>
             <th>desciption</th>
             <th>Time</th>
             <th>delete</th>
             <th>update</th>
          </tr>
          {main.Des.map((value,inx)=>{
              return(<tr>
                 <td>{main.Task[inx]}</td>
                 <td>{value}</td>
                 <td>{main.TimeData[inx]}</td>
                 <td onClick={()=>{
                  deletefunc(inx)
                 }}><DeleteIcon/></td>
                 <td onClick={()=>{
                  updatefunc(inx )
                 }}><UpgradeIcon/></td>
              </tr>)
          })}
       </table>
      </>
        :
        <>
      </>}
      
    </>
  )
}

export default Todo