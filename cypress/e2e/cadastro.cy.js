/// <reference types="cypress" />

describe('Cadastro', function() {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('https://buger-eats.vercel.app/');     
    });

    it('Usúario deve se tornar um entregador', () => {
        cy.get('#page-home main a[href="/deliver"]').click();

        cy.get('#page-deliver a[href="/"]').should('have.text', 'Voltar para home');
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas');
        
        cy.fixture('entregador').then((dado) => {
            cy.get('input[name="name"]').type(dado.nome);
            cy.get('input[name="cpf"]').type(dado.cpf);
            cy.get('input[name="email"]').type(dado.email);
            cy.get('input[name="whatsapp"]').type(dado.whatsapp);

            cy.get('input[name="postalcode"]').type(dado.endereco.cep);
            cy.get('input[type=button][value="Buscar CEP"]').click();

            cy.get('input[name="address-number"]').type(dado.endereco.numero);
            cy.get('input[name="address-details"]').type(dado.endereco.complemento);

            cy.get('input[name="address"]').should("have.value", dado.endereco.rua);
            cy.get('input[name="district"]').should("have.value", dado.endereco.bairro);
            cy.get('input[name="city-uf"]').should("have.value", dado.endereco.cidade_uf);
        
            cy.contains(".delivery-method li", dado.metodo_entrega).click();
            cy.get('input[accept^="image"]').attachFile(dado.cnh);

            cy.get('.button-success[type="submit"]').click();
            
            cy.get('.swal2-modal #swal2-title').should('have.text', 'Aí Sim...');
            cy.get('.swal2-modal .swal2-confirm  ').click();
        });
    });
});