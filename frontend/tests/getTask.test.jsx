import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, test } from 'vitest';
import TaskManager from '../src/components/TaskManager';
import axios from 'axios';

describe('TaskManager Component', () => {
  it('should render the title', () => {
    render(<TaskManager />);
    const titleElement = screen.getByText(/Beheer je Taken/i);
    expect(titleElement).toBeInTheDocument();
  });

// Mock de axios-aanroepen
vi.mock('axios');

// Mock de get-aanroep voor ophalen van taken
axios.get.mockResolvedValue({
  data: [
    { _id: '1', title: 'Task 1', description: 'Description 1', completed: false },
    { _id: '2', title: 'Task 2', description: 'Description 2', completed: true }
  ]
});

test('should display tasks after fetching them', async () => {
  render(<TaskManager />);

  // Wacht tot de taken in de lijst verschijnen
  await waitFor(() => screen.getByText('Task 1'));
  await waitFor(() => screen.getByText('Task 2'));

  // Controleer of de taken correct worden weergegeven
  expect(screen.getByText('Task 1')).toBeInTheDocument();
  expect(screen.getByText('Task 2')).toBeInTheDocument();
});

});


