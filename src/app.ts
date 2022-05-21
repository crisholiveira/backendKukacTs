import express, {Request, Response} from "express"
import bodyParser from "body-parser"

const app = express()


app.use(express.json())
app.use(bodyParser.json())

import DesafioRouter from './routes/DesafioRoutes'

app.use('/desafio/', DesafioRouter)


app.listen(5000, () => {
    console.log("aplicação rodando")
})