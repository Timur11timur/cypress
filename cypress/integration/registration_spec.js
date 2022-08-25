describe('Registration', () => {
    before(() => {
        cy.create('App\\Models\\User', {
            'email': 'usernamethatdoesntexists@example.com'
        });
    });

    after(() => {
        cy.refreshDatabase();
    })

    //it.only(... - only this test on this page will be displayed

    it('redirects authenticated users elsewhere', () => {
        cy.login();

        cy.visit('/register').assertRedirect('/home');
    });

    it('loads sign up page', () => {
        cy.visit('/register').contains('Register');
        cy.request('/register').its('status').should('eq', 200 );
    });

    it('allows user to sign up', () => {
        cy.visit('/register');

        cy.get('#name').type('name');
        cy.get('#email').type('email@example.com');
        cy.get('#password').type('Password1!');
        cy.get('#password-confirm').type('Password1!');
        cy.get('[type=submit]').click();

        cy.assertRedirect('/home');
        cy.contains('You are in!');
    });

    describe('Validation', () => {
        it('display email address validation errors', () => {
            cy.visit('/register');

            cy.get('#name').type('validname');
            cy.get('#email').type('usernamethatdoesntexists@example.com');
            cy.get('#password').type('Password1!');
            cy.get('#password-confirm').type('Password1!');
            cy.get('[type=submit]').click();

            cy.contains('The email has already been taken.');
        });

        it('display password validation errors', () => {
            cy.visit('/register');

            cy.get('#name').type('validname');
            cy.get('#email').type('validemail@example.com');
            cy.get('#password').type('Password1!');
            cy.get('#password-confirm').type('Other1!');
            cy.get('[type=submit]').click();

            cy.contains('The password confirmation does not match.');
        });
    });
});
