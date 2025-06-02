import express from 'express'
import 'dotenv/config'
import { getHtml, getSong, nuevaCancion, editarCancion, eliminarCancion } from './src/controllers/songs.controllers.js'

// Usamos doble 'pipe' ("||") porque no queremos ningun tipo de 'falsies'
const PORT = process.env.PORT || 3000

const app = express()

// middleware que nos permite entender el body
// se usa en peticiones POST, PUT o PATCH
app.use(express.json())

// Muestra la pagina principal HTML
app.get('/', getHtml)

// Muestra las canciones del repertorio
app.get('/canciones', getSong)

// Agregamos una cancion al repertorio
app.post('/canciones', nuevaCancion)

// Actualizamos la informacion de una cancion del repertorio
app.put('/canciones/:id', editarCancion)

// Borramos una cancion del repertorio
app.delete('/canciones/:id', eliminarCancion)

app.listen(PORT, console.log(`[${new Date().toLocaleString()}] Server running on 🌈 http://localhost:${PORT}`))