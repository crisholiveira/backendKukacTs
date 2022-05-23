import express, { Request, Response } from "express"
const cors = require('cors')


const app = express()


app.use(express.json())

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))


import DesafioRouter from './routes/DesafioRoutes'

app.use('/desafio/', DesafioRouter)


app.listen(5000, () => {
    console.log("aplicação rodando")
})