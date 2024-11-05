const Task = require('../models/Task');

// Haal alle taken op
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// haal een taak bij id
const getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
      const getTaskById = await Task.findById(id);
      if (!getTaskById) return res.status(404).json({ message: 'Task not found' });
      res.json(getTaskById);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  

// Maak een nieuwe taak aan
const createTask = async (req, res) => {
  const { title, description, completed } = req.body;
  const newTask = new Task({
    title,
    description,
    completed,
  });

  try {
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update een taak
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Verwijder een taak
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
