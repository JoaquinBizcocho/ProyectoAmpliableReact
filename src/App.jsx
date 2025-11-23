import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PeluControl from './Components/PeluControl'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <PeluControl />
       </div>
    </>
  )
}

export default App
