/* eslint-disable no-undef */
describe('Task Manager - POST Task', () => {
    beforeEach(() => {
      // Mock het GET-verzoek om een lege lijst weer te geven
      cy.intercept('GET', '**/api/tasks', {
        statusCode: 200,
        body: [],
      }).as('getTasks');
  
      // Mock het POST-verzoek voor het toevoegen van een taak
      cy.intercept('POST', '**/api/tasks', (req) => {
        req.reply({
          statusCode: 201,
          body: { id: 1, title: req.body.title, description: req.body.description, completed: false },
        });
      }).as('postTask');
    });
  
    it('should allow adding a new task', () => {
      cy.visit('http://localhost:5173/tasks');
  
      // Wacht op de initiële GET-aanroep
      cy.wait('@getTasks');
  
      // Vul het formulier in en verstuur de taak
      cy.get('input[placeholder="Titel"]').type('Nieuwe Taak');
      cy.get('textarea[placeholder="Beschrijving"]').type('Beschrijving van taak');
      cy.contains('Voeg Taak Toe').click();
  
      // Controleer of het POST-verzoek is uitgevoerd
      cy.wait('@postTask').its('request.body').should('deep.equal', {
        title: 'Nieuwe Taak',
        description: 'Beschrijving van taak',
        completed: false,
      });
  
      // Controleer of de taak wordt weergegeven
      cy.contains('Nieuwe Taak').should('exist');
    });
  });
  