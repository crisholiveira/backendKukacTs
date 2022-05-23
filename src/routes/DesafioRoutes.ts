import { Router, Request, Response } from 'express'

const router = Router()
import { palindromos, caixa, garagem } from "../controllers/DesafioController"

export default router
    .post('/palindromos', palindromos)
    .post('/caixa', caixa)
    .post('/garagem', garagem)

