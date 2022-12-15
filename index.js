// const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors') 

app.use(cors()) 
app.use(express.json()) 

let notes = [
  {
        'id': 2,
        'content': 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
        'important': true,
        'date': '01-11-2020'
    },
    {
        'id': 1,
        'content': 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        'important': true,
        'date': '01-11-2020'
    },
    {
        'id': 3,
        'content': 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
        'important': true,
        'date': '01-11-2020'
    }
]

// const app = http.createServer((req,res)=>{
//     res.writeHead(200, {"Content-Type": "application/json" })
//     res.end(JSON.stringify(notes))
// })

app.get('/', (req,res)=>{
    res.send('<h1>Hello world</h1>')
})

app.get('/api/notes', (req,res)=>{
    res.json(notes)
})

app.get('/api/notes/:id', (req,res)=>{
    const id = Number(req.params.id)
    // console.log({id})
    const note = notes.find(note => note.id == id)
    if(note){
        res.json(note)
    }else{
        res.status(404).end()
    }
})

app.delete('/api/notes/:id', (req,res)=>{
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})

app.post('/api/notes', (req,res)=>{
    const note = req.body
    // console.log(note)
    if(!note || !note.content){
        return res.status(400).json({
            error: 'note.content is missing'
        })
    }

    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: typeof note.important !== 'undefined' ? note.important : false,
        date: new Date().toISOString()
    }

    notes = [...notes, newNote]

    res.json(newNote)
})

const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`Server  running on port: ${PORT}`)
})