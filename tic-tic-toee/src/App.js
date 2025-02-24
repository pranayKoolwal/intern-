import React, { useState } from 'react';
import './App.css';
import Pattern from './Pattern';
import Manual from './Manual';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [data, setData] = useState(0);

  const restartGame = () => {
    setData(data === 0 ? 1 : 0);
    setTimeout(() => setData(data), 0); // Restart the game by toggling the state
  };

  const handleSwitch = (mode) => {
    setData(mode);
    toast(`You are now in ${mode === 0 ? 'computer' : 'manual'} mode`);
  };

  return (
    <div className="">
      {data === 0 ? <Pattern restartGame={restartGame} /> : <Manual restartGame={restartGame} />}
      <div className='container-btn'>
        <button onClick={() => handleSwitch(0)} className='btn'>computer</button>
        <button onClick={() => handleSwitch(1)} className='btn'>manual</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
