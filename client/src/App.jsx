import { useEffect, useMemo, useState } from 'react'
import './App.css'
import {io} from 'socket.io-client'

function App() {
  const [message, setMessage] =useState(' ')

  const socket = useMemo(()=>io('http://localhost:5000'),[]) 

  const formHandling =(e)=>{
    e.preventDefault()
    socket.emit('message',message)
  }

  useEffect(()=>{

    socket.on('connect', ()=>{
      console.log(' client connected with socketID',socket.id)
    })
    socket.on('welcome', (e)=>{
      console.log(e)
    })
    socket.on('onSuccessfullyRecived',(e)=>{
      console.log(e)
    })

  },[])

  return (

    <div className='w-6/12 mx-auto text-center border border-gray-500'>
      <h1 className='text-3xl'>this is Socket Io</h1>
      <form onSubmit={formHandling}>
        <input type='text' value={message} onChange={(e)=>{setMessage(e.target.value)}}
          className='w-60 h-10 border'
        ></input>
        <button type='submit' className='w-20 h-10 border bg-gray-300'>Send</button>
      </form>
    </div>
  )

}

export default App
