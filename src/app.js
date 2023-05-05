import express from "express"
import cors from "cors"
import enqueteRouter from "./routes/enquete.routes.js"
import opcaoRouter from "./routes/opcao.routes.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(enqueteRouter , opcaoRouter)


const port = process.env.PORT ||5000 

app.listen(port, () => console.log(`Servidor rodando na porta: ${port}`))