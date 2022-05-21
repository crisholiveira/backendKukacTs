import { Router, Request, Response } from 'express'

const router = Router()
import { palindromos, caixa, garagem } from "../controllers/DesafioController"

export default router
    .get('/palindromos', palindromos)
    .get('/troco', caixa)
    .post('/garagem', garagem)

