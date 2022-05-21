import express, { Request, Response } from "express"


const app = express()


app.use(express.json())


import DesafioRouter from './routes/DesafioRoutes'

app.use('/desafio/', DesafioRouter)


app.listen(5000, () => {
    console.log("aplicação rodando")
})