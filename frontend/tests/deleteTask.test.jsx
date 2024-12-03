import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, expect, test } from 'vitest';
import TaskManager from '../src/components/TaskManager';
import axios from 'axios';

test('should delete a task', async () => {
    // Mock de axios-aanroepen
    vi.mock('axios');
    
    axios.get.mockResolvedValue({
      data: [{ _id: '1', title: 'Existing Task', description: 'Task description', completed: false }]
    });
  
    axios.delete.mockResolvedValue({});
  
    render(<TaskManager />);
  
    // Wacht tot de taak in de lijst verschijnt
    await waitFor(() => screen.getByText('Existing Task'));
  
    // Zoek de verwijderknop
    const deleteButton = screen.getByText('Verwijder');
    fireEvent.click(deleteButton);
  
    // Controleer of de taak uit de lijst is verwijderd
    await waitFor(() => expect(screen.queryByText('Existing Task')).toBeNull());
  });
  