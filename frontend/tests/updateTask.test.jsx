import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, expect, test } from 'vitest';
import TaskManager from '../src/components/TaskManager'; // Update the path if necessary
import axios from 'axios'; // Import axios for mocking

// Mock axios
vi.mock('axios');

test('should edit a task', async () => {
  // Mock axios.get to return the existing task
  axios.get.mockResolvedValueOnce({
    data: [
      { _id: '1', title: 'Existing Task', description: 'Task description', completed: false }
    ]
  });

  // Mock axios.put to return the updated task
  axios.put.mockResolvedValueOnce({
    data: { _id: '1', title: 'Updated Task', description: 'Updated description', completed: false }
  });

  render(<TaskManager />);

  // Wait until the existing task is loaded
  await waitFor(() => screen.getByText('Existing Task'));

  // Find and click the edit button for the task
  const editButton = screen.getByText('Bewerken');
  fireEvent.click(editButton);

  // Find the input fields for the task title and description
  const titleInputs = screen.getAllByPlaceholderText('Titel');
  const titleInput = titleInputs[1]; // Assuming the second input is for editing the task title
  const descriptionInputs = screen.getAllByPlaceholderText('Beschrijving'); // This should be unique for the description field
  const descriptionInput = descriptionInputs[1];

  // Change the values in the input fields
  fireEvent.change(titleInput, { target: { value: 'Updated Task' } });
  fireEvent.change(descriptionInput, { target: { value: 'Updated description' } });

  // Click the "Werk Taak Bij" button to update the task
  const updateButton = screen.getByText('Werk Taak Bij');
  fireEvent.click(updateButton);

  // Wait for the updated task to be displayed
  await waitFor(() => screen.getByText('Updated Task'));

  // Verify that the task has been updated
  expect(screen.getByText('Updated Task')).toBeInTheDocument();
  expect(screen.getByText('Updated description')).toBeInTheDocument();
});
