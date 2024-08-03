const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const bowlRoutes = require('./src/routes/bowlRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/bowls', bowlRoutes);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
  console.log('Server is running on https://petabyte-server.onrender.com/\nPort: ', port);
});
