import dayjs from "dayjs"
import {db} from "../database/database.config.js"
import { enqueteSchema } from "../schemas/enquete.schema.js"
import { ObjectId } from "mongodb"

export async function criarEnquete(req , res){
    const {title , expireAt} = req.body

    const validation = enqueteSchema.validate(req.body , {abortEarly: false})
    let date = expireAt

    if(!expireAt){
        date = dayjs().add(30 , "days").format("DD/MM/YYYY HH:mm")
    }

    if(validation.error){
        console.log(validation.error)
        res.sendStatus(422)
    }

    try {
        const enquete = await db.collection("enquetes").insertOne({title , expireAt: date})
        res.status(201).send(enquete)

    } catch (error) {
        res.status(500).send(error.message)
    }

}

export async function pegarEnquete(req , res){

    try {
        const enquetes = await db.collection("enquetes").find().toArray()
        res.send(enquetes)

    } catch (error) {
        res.status(500).send(error.message)
    }

}

export async function opcoesEnquete(req , res){

    const {id} = req.params

    try {
        const opcoes = await db.collection("opcoes").find({pollId: id}).toArray()
        console.log(opcoes)
        if(!opcoes) return res.sendStatus(404)

        res.send(opcoes)

    } catch (error) {
        res.status(500).send(error.message)
    }

}

export async function resultadoEnquete(req , res){
    
    const {id} = req.params

    try {
        const enquete = await db.collection("enquetes").findOne({_id: new ObjectId(id)})
        if(!enquete) return res.sendStatus(404)

        const todasOpcoes = await db.collection("opcoes").find({pollId:id}).toArray()
        const opcoes = todasOpcoes.map((opcao) => String(opcao._id))

        const ganhador = await db.collection("votos").aggregate([
          {$match: {choiceId: {$in:opcoes}}},
          {$group: {_id: "$choiceId" , voteAmount:{$sum: 1}}},
          {$sort: {voteAmount: -1}}
        ]).toArray()

        const opcao = await db.collection("opcoes").findOne({_id: new ObjectId(ganhador[0]._id)})
        const votes = ganhador[0].voteAmount
        const resultado = {title: opcao.title , votes}
        const resultadoFinal = {...enquete , resultado}

    res.send(resultadoFinal)
    } catch (error) {
        res.status(500).send(error.message)
    }

}