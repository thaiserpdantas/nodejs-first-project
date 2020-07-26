import express from 'express'

const app = express();

app.get('/', (request, response) => {
    return response.json({ message: 'Hello World' })
})

const port = 3333;
app.listen(3333, () => {
    console.log('✨ Server started on port: ', port)
})