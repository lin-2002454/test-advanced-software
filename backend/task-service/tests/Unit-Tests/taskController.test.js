// taskController.test.js
const Task = require('../../models/Task'); // Het model dat je moet mocken
const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require('../../controllers/taskController');

// Mock Express response object
const res = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
};

// Mock de Mongoose Task model
jest.mock('../../models/Task');

describe('Task Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks voor elke test
  });

  // Test voor getTasks
  test('should fetch all tasks', async () => {
    const tasks = [
      { title: 'Test task 1', description: 'Test description 1', completed: false, _id: '1' },
      { title: 'Test task 2', description: 'Test description 2', completed: true, _id: '2' },
    ];

    // Mock de return waarde van Task.find()
    Task.find.mockResolvedValue(tasks);

    const req = {}; // Mock request (leeg voor get)
    await getTasks(req, res);

    expect(res.json).toHaveBeenCalledWith(tasks);
    expect(res.status).not.toHaveBeenCalled();
  });

  // Test voor getTaskById
  test('should fetch a task by id', async () => {
    const task = { title: 'Test task', description: 'Test description', completed: false, _id: '1' };

    // Mock de return waarde van Task.findById()
    Task.findById.mockResolvedValue(task);

    const req = { params: { id: '1' } };
    await getTaskById(req, res);

    expect(res.json).toHaveBeenCalledWith(task);
    expect(res.status).not.toHaveBeenCalled();
  });

  // Test voor createTask
  test('should create a new task', async () => {
    const newTaskData = { title: 'Test task', description: 'Test description', completed: false };

    const newTask = { ...newTaskData, _id: '1' };

    // Mock de save() methode om de nieuwe taak op te slaan
    Task.prototype.save.mockResolvedValue(newTask);

    const req = { body: newTaskData };
    await createTask(req, res);

    expect(res.json).toHaveBeenCalledWith(newTask);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  // Test voor updateTask
  test('should update a task', async () => {
    const updatedTask = { title: 'Updated Task', description: 'Updated description', completed: true, _id: '1' };

    // Mock de return waarde van Task.findByIdAndUpdate
    Task.findByIdAndUpdate.mockResolvedValue(updatedTask);

    const req = { params: { id: '1' }, body: updatedTask };
    await updateTask(req, res);

    expect(res.json).toHaveBeenCalledWith(updatedTask);
    expect(res.status).not.toHaveBeenCalled();
  });

  // Test voor deleteTask
  test('should delete a task', async () => {
    const deletedTask = { title: 'Test task', description: 'Test description', completed: false, _id: '1' };

    // Mock de return waarde van Task.findByIdAndDelete
    Task.findByIdAndDelete.mockResolvedValue(deletedTask);

    const req = { params: { id: '1' } };
    await deleteTask(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: 'Task deleted' });
    expect(res.status).not.toHaveBeenCalled();
  });

  // Test voor getTaskById wanneer de taak niet wordt gevonden
  test('should return 404 if task not found', async () => {
    Task.findById.mockResolvedValue(null);

    const req = { params: { id: 'nonexistent-id' } };
    await getTaskById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Task not found' });
  });

  // Test voor createTask met fout
  test('should return 400 if task creation fails', async () => {
    Task.prototype.save.mockRejectedValue(new Error('Database error'));

    const req = { body: { title: 'Test task' } };
    await createTask(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});
