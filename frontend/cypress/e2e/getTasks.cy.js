/* eslint-disable no-undef */
describe('Task Manager - GET Tasks', () => {
  beforeEach(() => {
    // Mock de GET API-aanroep
    cy.intercept('GET', '**/api/tasks', {
      statusCode: 200,
      body: [
        { id: 1, title: 'Test Taak 1', description: 'Beschrijving 1', completed: false },
        { id: 2, title: 'Test Taak 2', description: 'Beschrijving 2', completed: true },
      ],
    }).as('getTasks');
  });

  it('should display tasks fetched from the API', () => {
    cy.visit('http://localhost:5173/tasks'); // Pas de URL aan naar jouw frontend

    // Wacht op het GET-verzoek
    cy.wait('@getTasks');

    // Controleer of taken correct worden weergegeven
    cy.contains('Test Taak 1').should('exist');
    cy.contains('Test Taak 2').should('exist');
  });
});




