/// <reference types="cypress" />

describe('Home Page', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('https://buger-eats.vercel.app/');
        cy.screenshot();
    });

    it('App deve estar online', () => {
        cy.get('#page-home main h1').should('have.text', 'Seja um parceiro entregador pela Buger Eats');
        cy.get('#page-home main p').should('have.text', 'Em vez de oportunidades tradicionais de entrega de refeições em horários pouco flexíveis, seja seu próprio chefe.');
    });
});