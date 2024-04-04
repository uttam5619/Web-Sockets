import { config } from 'dotenv'
import express from 'express'
config()
import { createServer} from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const PORT =process.env.PORT || 7000
const app= express()
const server= new createServer(app)
const io =new Server(server,{
    cors:{
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true,
    }
})

app.use(cors())

app.get('/', (req, res) => {
    res.send('hello world')
})

io.on('connect', (socket)=>{
    console.log(`a server node connected with socket id ${socket.id}`)
    socket.emit('welcome',`welcome to the server node having socket Id ${socket.id}`)
    //socket.broadcast.emit('welcome', `a new node has joined with ${socket.id}`)
    socket.on('message', (data)=>{
        console.log(data)
        io.emit('onSuccessfullyRecived',` ${data}`)
    })
})


server.listen(PORT, () =>{
    console.log(`listing on port ${PORT}`)
})