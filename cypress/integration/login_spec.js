describe('Login', () => {
    before(() => {
        cy.refreshDatabase().seed();

        cy.create('App\\Models\\User', {
            name: 'JohnDoe',
            email: 'john@example.com',
            password: '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        });
    });

    beforeEach(() => {
        cy.visit('/').contains('a', 'Log in').click();
    });

    context('With valid credentials', () => {
        it('works', () => {
            cy.get('#email').type('john@example.com');
            cy.get('#password').type('password');
            cy.get('[type=submit]').click();

            cy.contains('You are in!');
        });
    });

    context('With invalid credentials', () => {
        it('requires a valid email address', () => {
            cy.get('#email').invoke('prop', 'validity')
                .should('deep.include', {
                    valueMissing: true,
                    typeMismatch: false,
                    patternMismatch: false,
                    tooLong: false,
                    tooShort: false,
                    rangeUnderflow: false,
                    rangeOverflow: false,
                    stepMismatch: false,
                    badInput: false,
                    customError: false,
                    valid: false
                });

            cy.get('#email').type('foobar{enter}').invoke('prop', 'validity')
                .should('deep.include', {
                    valueMissing: false,
                    typeMismatch: true,
                    patternMismatch: false,
                    tooLong: false,
                    tooShort: false,
                    rangeUnderflow: false,
                    rangeOverflow: false,
                    stepMismatch: false,
                    badInput: false,
                    customError: false,
                    valid: false
                });
        });

        it('requires an existing email address', () => {
            cy.get('#email').type('foobar@example.com');
            cy.get('#password').type('password');
            cy.get('[type=submit]').click();

            cy.contains('These credentials do not match our records.');
        });

        it('requires valid credentials', () => {
            cy.get('#email').type('john@example.com');
            cy.get('#password').type('invalidpassword');
            cy.get('[type=submit]').click();

            cy.contains('These credentials do not match our records.');
        });
    });
});
