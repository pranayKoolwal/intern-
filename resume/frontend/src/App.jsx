import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ResumeForm from './ResumeForm'

function App() {
  const [count, setCount] = useState(0)

  return (
     <>
          <div>
              <ResumeForm/>
          </div>
     </>
  )
}

export default App
