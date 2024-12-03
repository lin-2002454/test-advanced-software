import {  it, expect, vi } from 'vitest';
import axios from 'axios';

// Mock axios-methoden
vi.mock('axios');

// Stel de mockwaarden in
axios.get.mockResolvedValue({
  data: [{ _id: '1', title: 'Task 1', description: 'Description 1', completed: false }],
});

axios.put.mockResolvedValue({
  data: { _id: '1', title: 'Task 1', description: 'Description 1', completed: true },
});
// Testen
it('should toggle completion correctly', async () => {
    const getResponse = await axios.get('/tasks');
    expect(getResponse.data).toEqual([
      { _id: '1', title: 'Task 1', description: 'Description 1', completed: false },
    ]);
  
    const putResponse = await axios.put('/tasks/1', { completed: true });
    expect(putResponse.data).toEqual({
      _id: '1',
      title: 'Task 1',
      description: 'Description 1',
      completed: true,
    });

});
