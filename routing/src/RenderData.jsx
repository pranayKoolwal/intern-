import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState , useEffect} from 'react';
import Nevbar from './Nevbar';
function RenderData() {
  const [data, setdata] = useState([])
  const [HelpFunc , SetFunc]= useState('')
  const [pointer , setPointer]= useState(0)
  let help=(params='')=>{
     SetFunc(params)
  }
  useEffect(()=>{
    Handle()
  },[])
  let Handle = async()=>{
        try{
          let Data= await axios.get('https://dummyjson.com/products')
          console.log(Data)
          setdata([...Data.data.products])
        }
        catch(error){
          console.log(error.message)
        }
  }
  
let JsxData = ({value})=>{
    console.log('return')
    return(
        <>
          <div className="card">
              <div className="wrapper">
                <img
                  src={value}
                  className="cover-image"
                />
              </div>
             
          </div>
</>
)  
  }
  return (
    <>
    <Nevbar criteria={{data,help}}/>
    <div className='container'>
            {data.map((value,inx)=>{
              if(HelpFunc==value.category ){
                return <JsxData  value = {value.thumbnail}/>
              }
              
              
               
             
              })
              }
       
              </div>
          </>
  )
            }

export default RenderData;
