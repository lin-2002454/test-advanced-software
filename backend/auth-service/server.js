const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

// Laad de omgevingsvariabelen
dotenv.config();

// Verbind met MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Voor het verwerken van JSON-gegevens

// router.get('/tasks', authenticateToken, (req, res) => {
//     res.json({ message: 'This is a protected route', user: req.user });
//   });

// Auth routes instellen
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Auth service running at http://localhost:${PORT}`);
});
