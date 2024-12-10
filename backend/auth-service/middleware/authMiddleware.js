const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Voeg de gedecodeerde gegevens toe aan de request
    next(); // Ga door naar de volgende middleware/route
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = { authenticateToken };
