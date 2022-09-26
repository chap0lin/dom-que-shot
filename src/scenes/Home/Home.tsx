import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import './Home.css'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <img src={logo} className="logo" alt="Vite logo" />
      </div>
      <div className="card">
        <h3>
          Selected Room: {count}
        </h3>
        <input type="number" value={count} onChange={(e)=>setCount(parseInt(e.target.value))} />
        <Link to="/GeneralRoom"><button>Join Room</button></Link>
      </div>
    </div>
  )
}

export default Home
