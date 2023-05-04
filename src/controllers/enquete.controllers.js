import dayjs from "dayjs"
import {db} from "../database/database.config.js"
import { enqueteSchema } from "../schemas/enquete.schema.js"

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
    try {
        
    } catch (error) {
        res.status(500).send(error.message)
    }

}

export async function resultadoEnquete(req , res){
    try {
        
    } catch (error) {
        res.status(500).send(error.message)
    }

}