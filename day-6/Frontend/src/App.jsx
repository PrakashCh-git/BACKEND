import React, { useState,useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])

  async function fetchData() {
    const Notes = await axios.get('http://localhost:3000/api/notes');
    setNotes(Notes.data.notes)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
    {
      notes.map((elem,idx)=>{
        return <div key={idx} className='main-box'>
          <h1>{elem.title}</h1>
          <p>{elem.description}</p>
        </div>
      })
    }
    </>
  )
}

export default App
