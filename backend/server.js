import express from 'express'
import 'dotenv/config'
import { getHtml, getSong, nuevaCancion, editarCancion, eliminarCancion } from './src/controllers/songs.controllers.js'

const PORT = process.env.PORT ?? 3000

const app = express()

app.use(express.json())

app.get('/', getHtml)

app.get('/canciones', getSong)

app.post('/canciones', nuevaCancion)

app.put('/canciones/:id', editarCancion)

app.delete('/canciones/:id', eliminarCancion)

app.listen(PORT, console.log(`Server on 🌈 http://localhost:${PORT}`))