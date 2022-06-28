it('works', () => {
    cy.visit('/').contains('Environment: Acceptance');
});
