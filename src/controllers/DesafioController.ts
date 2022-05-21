
import { Request, Response } from "express"
import fs from "fs"


export function palindromos(req: Request, res: Response) {

    const numInicial = req.body.numInicial
    const numFinal = req.body.numFinal

    if (numFinal < numInicial) {
        res.status(422).json({ message: "O número final precisa ser maior que o número incial" })
        return
    }

    if (!numInicial) {
        res.status(422).json({ message: "O número incial da sequência é obrigatório" })
        return
    }

    if (!numFinal) {
        res.status(422).json({ message: "O número final da sequência é obrigatório" })
        return
    }

    let palindromo = []
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
            this.modelo = req.body.modelo
            this.anoFabricacao = req.body.anoFabricacao
        }
    }

    

    let veiculo = new Veiculo()  

    

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
            

            let moto = new Moto()
            let cadastro = JSON.stringify(req.body)
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
                    this.qtdPortas = req.body.qtdPortas
                }
            }

            let carro = new Carro()
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
