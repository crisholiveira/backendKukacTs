
import { Request, Response } from "express"
import fs from "fs"



export function palindromos(req: Request, res: Response) {

    let {numInicial, numFinal} = req.body
    let palindromo = []      
    
    if (!numInicial) {
        res.status(422).json({ message: "O número incial da sequência é obrigatório" })
        return
    }

    if (numFinal < numInicial || !numFinal) {
        res.status(422).json({ message: "O número final deve ser maior que o número incial" })
        return
    }
    
   
        for (let j = numInicial; j <= numFinal; j++) {
            if (j.toString() == j.toString().split("").reverse().join("")) {
                palindromo.push([j])
            }
        }     
        
   

    try {

        res.status(200).json({ palindromo })

    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export function caixa(req: Request, res: Response) {
    let valorCompra = req.body.valorCompra
    let valorPago = req.body.valorPago
    let troco = valorPago - valorCompra
    let nota100 = Math.floor(troco / 100)
    let nota10 = Math.floor((troco / 10) - (nota100 * 10))
    let nota1 = Math.floor((troco / 1) - (nota10 * 10) - (nota100 * 100))


    if (!valorCompra) {
        res.status(422).json({ message: "O valor total da compra é obrigatório" })
        return
    }

    if (!valorPago) {
        res.status(422).json({ message: "É obrigatório informar o valor pago pelo cliente!" })
        return
    }

    if (valorCompra < 0 || valorPago < 0) {
        res.status(422).json({ message: "Os valores precisam ser maiores que zero" })
        return
    }

    if (valorPago < valorCompra) {
        res.status(422).json({ message: "Não há troco" })
        return

    }

    try {
        res.status(200).json({ troco, nota100, nota10, nota1 })

    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export function garagem(req: Request, res: Response) {
    let tipoVeiculo: number = req.body.tipoVeiculo

    if (!tipoVeiculo) {
        res.status(422).json({ message: "O tipo de veículo é obrigatório. Digite 1 para moto ou 2 para carro" })
        return

    }


    class Veiculo {
        modelo: string;
        anoFabricacao: number;
        constructor(modelo: string, anoFabricacao: number) {
            this.modelo = modelo
            this.anoFabricacao = anoFabricacao
        }
    }

    

    let veiculo = new Veiculo(req.body.modelo, req.body.anoFabricacao) 
    if(!veiculo.modelo) {
        res.status(422).json({ message: "O modelo é obrigatório" })
        return
    }
    if(!veiculo.anoFabricacao) {
        res.status(422).json({ message: "O ano de fabricação é obrigatório" })
        return
    }

    

    try {
        if (tipoVeiculo == 1) {
            class Moto extends Veiculo {
                qtdRodas: number;
                qtdPassageiros: number
                constructor(modelo: string, anoFabricacao: number, qtdRodas: number, qtdPassageiros: number) {
                    super(modelo, anoFabricacao)
                    this.qtdRodas = req.body.qtdRodas
                    this.qtdPassageiros = req.body.qtdPassageiros
                }
            }
            

            let moto = new Moto(req.body.modelo, req.body.anoFabricacao, req.body.qtdRodas, req.body.qtdPassageiros)
            let cadastro = JSON.stringify(req.body)
            if(!moto.qtdRodas) {
                res.status(422).json({ message: "A quantidade de rodas é obrigatória" })
                return
            }
            if(!moto.qtdPassageiros) {
                res.status(422).json({ message: "A quantidade de passageiros é obrigatória" })
                return
            }
            fs.appendFile("cadastromoto.txt", cadastro, function(err) {
                if(err) {
                    return (err);
                } else {
                    return ("Cadastro gravado com sucesso");        }
            })
            res.status(200).json({ moto })
        }

        if (tipoVeiculo == 2) {
            class Carro extends Veiculo {
                qtdPortas: number;
                constructor(modelo: string, anoFabricacao: number, qtdPortas: number) {
                    super(modelo, anoFabricacao)
                    this.qtdPortas = qtdPortas
                }
            }

            let carro = new Carro(req.body.modelo, req.body.anoFabricacao,req.body.qtdPortas)
            if(!carro.qtdPortas) {
                res.status(422).json({ message: "A quantidade de portas é obrigatória" })
                return
            }
            let cadastro = JSON.stringify(req.body)
            fs.appendFile("cadastrocarro.txt", cadastro, function(err) {
                if(err) {
                    return (err);
                } else {
                    return ("Cadastro gravado com sucesso");        }
            })
            res.status(200).json({ carro })
        }


    } catch (error) {
        res.status(500).json({ message: error })
    }
}
