/* eslint-disable no-undef */
describe('Task Manager - DELETE Task', () => {
    beforeEach(() => {
      // Mock GET request
      cy.intercept('GET', '**/api/tasks', {
        statusCode: 200,
        body: [{ _id: '1', title: 'Test Taak', description: 'Beschrijving', completed: false }],
      }).as('getTasks');
  
      // Mock DELETE request
      cy.intercept('DELETE', '**/api/tasks/*', (req) => {
        const taskId = req.url.split('/').pop();
        if (taskId === '1') {
          req.reply({
            statusCode: 200,
            body: { message: `Task with id ${taskId} deleted successfully` },
          });
        } else {
          req.reply({
            statusCode: 404,
            body: { message: 'Taak niet gevonden' },
          });
        }
      }).as('deleteTask');
    });
  
    it('should delete a task successfully', () => {
      cy.visit('http://localhost:5173/tasks');
  
      // Wacht op GET-verzoek
      cy.wait('@getTasks');
  
      // Zoek de taak en klik op "Verwijder"
      cy.contains('Test Taak')
        .parent()
        .find('button')
        .contains('Verwijder')
        .click();
  
      // Wacht op DELETE-verzoek en controleer response
      cy.wait('@deleteTask').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body.message).to.include('deleted successfully');
      });
  
      // Controleer dat de taak niet meer zichtbaar is
      cy.contains('Test Taak').should('not.exist');
    });
  });
  
  

  
  
  
  
  
  
  
  
  
  




  