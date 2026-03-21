import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react';


const App = () => {

  const [allnote, setAllnote] = useState([]);

  async function fetchData() {
    try {
      const note = await axios.get('http://localhost:3000/api/note');
      setAllnote(note.data.note);
    } catch (error) {
      console.log(error);
    }
  }

async function submitHandler(e) {
  e.preventDefault();

  const title = e.target.title.value;
  const description = e.target.description.value;

  try {
    await axios.post("http://localhost:3000/api/note", {
      title,
      description
    });

    fetchData(); // reload notes from DB
    e.target.reset(); // clear form
  } 
  catch (error) {
    console.log(error);
  }
}


async function deleteHandler(id) {
  await axios.delete(`http://localhost:3000/api/note/${id}`);
  fetchData();
}

async function updateHandler(e,extra) {
  e.preventDefault();
  const description = e.target.updatedDescription.value;
  await axios.patch(`http://localhost:3000/api/note/${extra}`, {
    description
  })
  fetchData();
  e.target.reset(); 
}


  useEffect(()=>{
    fetchData();
  },[])




  return (
    <>
        <form className='from-for-imput' onSubmit={(e)=>{
          submitHandler(e);
        }}>
          <input type="text" name='title' placeholder='Enter Title' />
          <input type="text" name='description' placeholder='Enter Description' />
          <button>Submit</button>
        </form>
      
        <div className='main-container'>
          {
            allnote.map((elem,idx)=>{
              return <div key={idx} className='main-box'>
                <h1>{elem.title}</h1>
                <p>{elem.description}</p>
                <button onClick={()=>{
                  deleteHandler(elem._id)
                }}>Delete</button>

                <form className='form-for-update' onSubmit={(e)=>{
                  const extra = elem._id;
                  updateHandler(e,extra);
                }}>
                  <input type="text" name="updatedDescription" placeholder='Enter new description' />
                  <button>Update</button>
                </form>
              </div>
            })
          }
        </div>
    </>
  )
}

export default App

