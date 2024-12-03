import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, expect, test } from 'vitest';
import TaskManager from '../src/components/TaskManager';
import axios from 'axios';

// Mock de axios-aanroepen
vi.mock('axios');

// Mock de get-aanroep
axios.get.mockResolvedValue({
  data: [{ _id: '1', title: 'Existing Task', description: 'Task description', completed: false }]
});

// Mock de post-aanroep voor toevoegen van taak
axios.post.mockResolvedValue({
  data: { _id: '2', title: 'New Task', description: 'Task description', completed: false }
});


test('should add a new task', async () => {
  render(<TaskManager />);

  // Vul de formulier velden in
  const titleInput = screen.getByPlaceholderText('Titel');
  const descriptionInput = screen.getByPlaceholderText('Beschrijving');
  
  fireEvent.change(titleInput, { target: { value: 'New Task' } });
  fireEvent.change(descriptionInput, { target: { value: 'Task description' } });

  // Klik op de knop om de taak toe te voegen
  const addButton = screen.getByText('Voeg Taak Toe');
  fireEvent.click(addButton);

  // Wacht tot de taak in de lijst verschijnt
  await waitFor(() => screen.getByText('New Task'));

  // Controleer of de nieuwe taak correct is toegevoegd
  expect(screen.getByText('New Task')).toBeInTheDocument();
});
