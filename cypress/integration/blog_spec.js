describe('Blog', () => {
    beforeEach(() => {
        //cy.log('Starting');
        cy.refreshDatabase();
    })

    it('shows all posts', () => {
        cy.create('App\\Models\\Post', { title: 'My First Post' });

        cy.visit('/blog', {
            failOnStatusCode: false //for debugging
        }).contains('My First Post ')
    });

    it('creates a post');
});
