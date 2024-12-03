/* eslint-disable no-undef */
describe('Task Manager - Mark Task as Completed', () => {
    beforeEach(() => {
      // Mock GET request
      cy.intercept('GET', '**/api/tasks', {
        statusCode: 200,
        body: [{ _id: '1', title: 'Test Taak', description: 'Beschrijving', completed: false }],
      }).as('getTasks');
  
      // Mock PUT request (voor het markeren als voltooid)
      cy.intercept('PUT', '**/api/tasks/*', (req) => {
        const updatedTask = req.body;
        if (updatedTask.completed !== undefined) {
          req.reply({
            statusCode: 200,
            body: { ...updatedTask, _id: req.url.split('/').pop() },
          });
        } else {
          req.reply({
            statusCode: 400,
            body: { message: 'Completed status is required' },
          });
        }
      }).as('putTask');
    });
  
    it('should mark a task as completed', () => {
      cy.visit('http://localhost:5173/tasks');
  
      // Wacht op GET-verzoek
      cy.wait('@getTasks');
  
      // Zoek de taak en klik op "Markeer als Voltooid"
      cy.contains('Test Taak')
        .parent()
        .find('button')
        .contains('Markeer als Voltooid')
        .click();
  
      // Wacht op PUT-verzoek en controleer de response
      cy.wait('@putTask').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body.completed).to.eq(true);
      });
  
      // Controleer of de UI is bijgewerkt (taak is gemarkeerd als voltooid)
      cy.contains('Test Taak')
        .parent()
        .should('contain', 'Voltooid');
    });
  });
  