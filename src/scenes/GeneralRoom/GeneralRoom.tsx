import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


import api from '../../services/api'

function GeneralRoom() {
  const [response, setResponse] = useState("")

  useEffect(()=> {
    api.get('/').then(response=>{
        setResponse(response.data)
        })
  }, []);
  return (
    <div>
      <p>
        Another Screen
      </p>
      <Link to="/BangBang">Bang Bang</Link>
      <p>{response}</p>
    </div>
  )
}

export default GeneralRoom
