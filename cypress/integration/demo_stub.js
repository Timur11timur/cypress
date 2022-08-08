it('stubs a network request', () => {
    cy.server();

    cy.route('/posts', [
        {'title': 'My Fake Post'}
    ]);

    cy.visit('/blog').contains('My Fake Post');
});

it('stubs a network request 2', () => {
    cy.server();

    cy.route('/posts', 'fixture:posts').as('getPosts');

    cy.visit('/blog').contains('My First Fake Post From Fixture');

    //cy.wait('@getPosts').then(cy.log) //Debug

    cy.wait('@getPosts').then(xhr => {
        cy.log(xhr.response.body)
    })
});

it('fixture from actual  response', () => {
    cy.server();

    cy.route('/posts').as('getPosts');

    cy.visit('/blog');

    cy.wait('@getPosts').then(xhr => {
        cy.writeFile('cypress/fixtures/post-data.json', xhr.response.body)
    })
});

