import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/TaskManager.css";


const TaskManager = () => {
  const [tasks, setTasks] = useState([]); // Huidige taken
  const [newTask, setNewTask] = useState({ title: "", description: "", completed: false });
  const [editTask, setEditTask] = useState(null);  // Dit is voor de taak die we willen bewerken


  // const taskServiceUrl = import.meta.env.VITE_TASK_SERVICE_URL;
  // console.log(taskServiceUrl); // Dit zou je de waarde van je variabele moeten geven
  

  // Ophalen van de taken bij het laden van de component
  useEffect(() => {
    axios.get("http://localhost:3000/api/tasks")
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => console.error("Er is een fout bij het ophalen van de taken", error));
  }, []);

  // Toevoegen van een nieuwe taak
  const handleAddTask = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/api/tasks", newTask)
      .then(response => {
        setTasks([...tasks, response.data]); // Voeg de nieuwe taak toe aan de lijst
        setNewTask({ title: "", description: "", completed: false }); // Reset het formulier
      })
      .catch(error => console.error("Er is een fout bij het toevoegen van de taak", error));
  };

  // Verwijderen van een taak
  const handleDeleteTask = (taskId) => {
    axios.delete(`http://localhost:3000/api/tasks/${taskId}`)
      .then(() => {
        setTasks(tasks.filter(task => task._id !== taskId)); // Verwijder de taak uit de lijst
      })
      .catch(error => console.error("Er is een fout bij het verwijderen van de taak", error));
  };

  // Bijwerken van de taakstatus
  const handleToggleCompletion = (taskId) => {
    const taskToUpdate = tasks.find(task => task._id === taskId);
    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

    axios.put(`http://localhost:3000/api/tasks/${taskId}`, updatedTask)
      .then(response => {
        setTasks(tasks.map(task => task._id === taskId ? response.data : task));
      })
      .catch(error => console.error("Er is een fout bij het bijwerken van de taak", error));
  };

  // Start bewerkingsmodus voor taak
  const handleEditTask = (task) => {
    setEditTask(task);  // Zet de taak die je wilt bewerken
  };

  // Taak bijwerken
  const handleUpdateTask = (e) => {
    e.preventDefault();
    if (!editTask) return;

    axios.put(`http://localhost:3000/${editTask._id}`, editTask)
      .then(response => {
        setTasks(tasks.map(task => task._id === editTask._id ? response.data : task));
        setEditTask(null);  // Na het updaten, reset de bewerkingsmodus
      })
      .catch(error => console.error("Er is een fout bij het bijwerken van de taak", error));
  };

  return (
    <div className="task-manager-container">
      <h2>Beheer je Taken</h2>

      {/* Formulier voor het toevoegen van een taak */}
      <form onSubmit={handleAddTask} className="task-form">
        <input
          type="text"
          placeholder="Titel"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Beschrijving"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          required
        ></textarea>
        <button type="submit">Voeg Taak Toe</button>
      </form>

      {editTask && (
        <form onSubmit={handleUpdateTask} className="task-form">
          <h3>Bewerk Taak</h3>
          <input
            type="text"
            placeholder="Titel"
            value={editTask.title}
            onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Beschrijving"
            value={editTask.description}
            onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
            required
          ></textarea>
          <button type="submit">Werk Taak Bij</button>
          <button type="button" onClick={() => setEditTask(null)}>Annuleer</button>
        </form>
      )}

      {/* Lijst van taken */}
      <div className="task-list">
        {tasks.map(task => (
          <div key={task._id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.completed ? "Voltooid" : "Nog niet voltooid"}</p>
            <button onClick={() => handleToggleCompletion(task._id)}>
              {task.completed ? "Markeer als Niet Voltooid" : "Markeer als Voltooid"}
            </button>
            <button onClick={() => handleDeleteTask(task._id)}>Verwijder</button>
            <button onClick={() => handleEditTask(task)}>Bewerken</button> {/* Bewerken knop */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
