Cypress.Commands.add('getIframe', () => {
    return cy
        .get('iframe')
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .then(cy.wrap);
});

it('works with iframe', () => {
    cy.visit('/');

    // cy.getIframe().find('#iframe-button').then($button => {
    //     expect($button.text()).to.equal('Click Me');
    // });

    cy.getIframe().find('#iframe-button').should('have.text', 'Click Me');

    cy.getIframe().click();
});
