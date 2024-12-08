const express = require('express');
const router = express.Router();
const {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    deleteTasks,
  } = require('../controllers/taskController');

// Haal alle taken op
router.get('/', getTasks);

//Haal een taak op
router.get('/:id', getTaskById);

// Maak een nieuwe taak aan
router.post('/', createTask);

// Update een taak
router.put('/:id', updateTask);

// Verwijder een taak
router.delete('/:id', deleteTask);

router.delete('/', deleteTasks);

module.exports = router;
