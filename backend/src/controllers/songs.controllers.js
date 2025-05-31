import fs from 'fs'
import path from 'path'
import crypto from 'crypto'


const REPERTORIO_PATH = path.resolve('repertorio.json')

const getHtml = (req, res) => {
  const filePath = path.resolve('../frontend/index.html')
  res.sendFile(filePath)
}

const getSong = (req, res) => {
  try {
    const canciones = JSON.parse(fs.readFileSync(REPERTORIO_PATH, 'utf8'))
    res.json(canciones)
  } catch (error) {
    console.error('Error creating song:', error)
    res.status(500).json({ message: 'El recurso no está disponible' })
  }
}

const nuevaCancion = (req, res) => {
  try {
    const { titulo, artista, tono } = req.body
    const id = crypto.randomUUID()
    const nueva = { id, titulo, artista, tono }
    const canciones = JSON.parse(fs.readFileSync(REPERTORIO_PATH, 'utf8'))
    canciones.push(nueva)
    fs.writeFileSync(REPERTORIO_PATH, JSON.stringify(canciones, null, 2))
    res.send('Canción creada con éxito')
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'El recurso no está disponible' })
  }
}

const editarCancion = (req, res) => {
  try {
    const { id } = req.params
    const { titulo, artista, tono } = req.body
    let canciones = JSON.parse(fs.readFileSync(REPERTORIO_PATH, 'utf8'))
    const index = canciones.findIndex(c => c.id == id)
    if (index === -1) return res.status(404).json({ message: 'Canción no encontrada' })
    canciones[index] = { id: Number(id), titulo, artista, tono }
    fs.writeFileSync(REPERTORIO_PATH, JSON.stringify(canciones, null, 2))
    res.send('Canción editada con éxito')
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'El recurso no está disponible' })
  }
}

const eliminarCancion = (req, res) => {
  try {
    const { id } = req.params
    let canciones = JSON.parse(fs.readFileSync(REPERTORIO_PATH, 'utf8'))
    canciones = canciones.filter(
      c => String(c.id) !== String(id) && String(c.cancion) !== String(id)
    )
    fs.writeFileSync(REPERTORIO_PATH, JSON.stringify(canciones, null, 2))
    res.send('Canción eliminada con éxito')
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'El recurso no está disponible' })
  }
}

export { getHtml, getSong, nuevaCancion, editarCancion, eliminarCancion }