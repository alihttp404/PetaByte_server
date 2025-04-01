const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');
const bowlRoutes = require('./src/routes/bowlRoutes');
const port = 3000;

const app = express();

const allowedOrigins = [
  'http://localhost:60768', // Your local dev origin (port might change!)
  'https://petabyte-b96f9.web.app', // Your deployed Flutter app origin
  // Add your custom domain here too if you set one up
  // 'https://your-custom-domain.com'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify allowed methods
  allowedHeaders: "Content-Type,Authorization", // Specify allowed headers
  credentials: true // If you need to send cookies or authorization headers
};

const render = 'https://petabyte-server.onrender.com/';
const local = 'http://localhost:3000/';

app.use(express.json());
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use('/api/users', userRoutes);
app.use('/api/bowls', bowlRoutes);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, async () => {
  console.log(`Server is running on ${render} \nPort: ${port}`);
});
