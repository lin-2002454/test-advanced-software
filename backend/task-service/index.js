const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');



// Importeer connectie functie voor MongoDB
const connectDB = require('./config/db');

// Laad de omgevingsvariabelen
dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Je frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Geautoriseerde methoden
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// Verbind de database
connectDB();


app.use(express.json()); // Middleware om JSON-lichaam van een request te parsen
app.get('/', (req, res) => {
  res.send('Hallo World!')
});

const taskRoutes = require('./routes/taskRoutes');

app.use('/api/tasks', taskRoutes);  // Voeg de route voor taken toe
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
  
// const express = require('express');
// const app = express();
// const port = 3000;

// app.use(express.json());



// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
