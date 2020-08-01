import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());

app.get('/', (request, response) => response.json({ message: 'Hello Node' }));

const port = 3333;
app.listen(3333, () => {
    console.log('✨ Server started on port: ', port);
});
