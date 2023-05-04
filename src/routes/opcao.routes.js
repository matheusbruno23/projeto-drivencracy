import { Router } from "express";
import { criarOpcao, votarOpcao } from "../controllers/opcao.controllers.js";

const opcaoRouter = Router()

opcaoRouter.post("/choice" , criarOpcao)
opcaoRouter.get("/choice/:id/vote" , votarOpcao)


export default opcaoRouter