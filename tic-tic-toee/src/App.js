import logo from './logo.svg';
import './App.css';
import Pattern from './Pattern';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
function App() {
  let [data,setData ] = useState(0)
  return (
    <div className="">
          {data ===0?<><Pattern/></>:<></>}
          <div className='container-btn'>
          <button onClick={()=>{setData(1)}} className='btn'>manual</button>
          <button onClick={()=>{setData(0)}} className='btn'>computer</button>
          </div>
          
          <ToastContainer/>
    </div>
  );
}

export default App;
