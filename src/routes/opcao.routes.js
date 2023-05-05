import { Router } from "express";
import { criarOpcao, votarOpcao } from "../controllers/opcao.controllers.js";

const opcaoRouter = Router()

opcaoRouter.post("/choice" , criarOpcao)
opcaoRouter.post("/choice/:id/vote" , votarOpcao)


export default opcaoRouter