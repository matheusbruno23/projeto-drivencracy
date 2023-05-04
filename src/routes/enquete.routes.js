import { Router } from "express";
import { criarEnquete, opcoesEnquete, pegarEnquete, resultadoEnquete } from "../controllers/enquete.controllers.js";

const enqueteRouter = Router()

enqueteRouter.post("/poll" , criarEnquete)
enqueteRouter.get("/poll" , pegarEnquete)
enqueteRouter.get("/poll/:id/choice" , opcoesEnquete)
enqueteRouter.get("/poll/:id/result" , resultadoEnquete)

export default enqueteRouter