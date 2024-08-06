const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const bowlRoutes = require('./src/routes/bowlRoutes');
const { PORT } = require('./config');

const app = express();
const render = 'https://petabyte-server.onrender.com/';
const local = 'http://localhost:3000/';

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/bowls', bowlRoutes);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(PORT, async () => {
  console.log(`Server is running on ${render} \nPort: ${port}`);
});