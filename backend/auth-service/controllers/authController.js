const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Registratiefunctie
const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Controleer of de gebruiker al bestaat
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash het wachtwoord
    const hashedPassword = await bcrypt.hash(password, 10);

    // Maak een nieuwe gebruiker aan
    const newUser = new User({ username, password: hashedPassword });

    // Sla de gebruiker op in de database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Inlogfunctie
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Zoek de gebruiker op
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Vergelijk wachtwoorden
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Maak een JWT-token aan
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login };
