import { ObjectId } from "mongodb"
import {db} from "../database/database.config.js"
import {opcaoSchema} from "../schemas/opcao.schema.js"
import dayjs from "dayjs"

export async function criarOpcao(req , res){
    const {title , pollId} = req.body


    try {

        const enquete = await db.collection("enquetes").findOne({_id: new ObjectId(pollId)})
        console.log(enquete)

        if(!enquete) return res.sendStatus(404)

        const validation = opcaoSchema.validate(req.body , {abortEarly: false})

        if(validation.error){
            console.log(validation.error)
            return res.sendStatus(422)
        }    

        const opcaoExistente = await db.collection("opcoes").findOne({title})
        if(opcaoExistente) return res.sendStatus(409)

        const expireDate = dayjs(enquete.expireAt, "DD/MM/YYYY HH:mm")
        const now = dayjs()

        if(now.isBefore(expireDate)) return res.sendStatus(403) 
        
        const opcao = await db.collection("opcoes").insertOne({title , pollId})

        res.status(201).send(opcao)

    } catch (error) {
        res.status(500).send(error.message)
    }

}

export async function votarOpcao(req , res){
    // const {title} = req.body
    // // const validation = enqueteSchema.validate(req.body , {abortEarly: false})

    // // if(validation.error){
    // //     console.log(validation.error)
    // //     res.status(422).send("")
    // // }

    // try {
    //     await db.collection("opcoes").insertOne({title , expireAt: date})
    //     res.sendStatus(201)

    // } catch (error) {
    //     res.status(500).send(error.message)
    // }

}