/* eslint-disable no-undef */
describe('Task Manager - PUT Task', () => {
    beforeEach(() => {
      // Mock GET request
      cy.intercept('GET', '**/api/tasks', {
        statusCode: 200,
        body: [{ _id: '1', title: 'Test Taak', description: 'Beschrijving', completed: false }],
      }).as('getTasks');
  
      // Mock PUT request
      cy.intercept('PUT', '**/api/tasks/*', (req) => {
        const updatedTask = req.body;
        if (updatedTask.description) {
          req.reply({
            statusCode: 200,
            body: { ...updatedTask, _id: req.url.split('/').pop() },
          });
        } else {
          req.reply({
            statusCode: 400,
            body: { message: 'Beschrijving is verplicht' },
          });
        }
      }).as('putTask');
    });
  
    it('should allow updating the description of a task', () => {
      cy.visit('http://localhost:5173/tasks');
  
      // Wacht op GET-verzoek
      cy.wait('@getTasks');
  
      // Zoek de taak en klik op "Bewerk"
      cy.contains('Test Taak')
        .parent()
        .find('button')
        .contains('Bewerk')
        .click();
  
      // Wijzig de beschrijving
      cy.get('textarea[placeholder="Beschrijving"]')
        .eq(1)
        .clear()
        .type('Nieuwe Beschrijving');
  
      // Klik op "Werk Taak Bij"
      cy.contains('Werk Taak Bij').click();
  
      // Wacht op PUT-verzoek en controleer response
      cy.wait('@putTask').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body.description).to.eq('Nieuwe Beschrijving');
      });
  
      // Controleer of de UI is bijgewerkt
      cy.contains('Test Taak')
        .parent()
        .should('contain', 'Nieuwe Beschrijving');
    });
  });
  
  
  
  
  
  
  
  
  
  
  
  