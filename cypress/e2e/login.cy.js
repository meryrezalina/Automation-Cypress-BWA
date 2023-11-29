describe("Login Page Test Case",() =>{
    it('Visit Login Page', () => {
        cy.visit("http://localhost:3000/");
        cy.title().should("eq", "React Gallery");
        cy.contains("Hello Again");
    });

    it('Check Login Page', () => {
        //check email 
        const email = cy.get("input[name='email']")
        email.should("be.visible");
        email.should("have.attr", "type", "email");
        email.should("have.attr", "placeholder", "Email Address")

        cy.wait(2000)
        //check password
        const password = cy.get("input[name='password']")
        password.should("be.visible");
        password.should("have.attr", "type", "password");
        password.should("have.attr", "placeholder", "Password")

        cy.wait(2000)
        //check button
        const button = cy.get("button")
        button.should("be.visible");
        button.contains("Login")
        button.should("have.css", "background-color", "rgb(79, 70, 229)");
        button.should("have.css", "color", "rgb(255, 255, 255)")
        

    });

    // Login null value
    it('Login with null value', () => {
        const button = cy.get("button")
        button.click()
        cy.wait(2000)
        cy.on("window:alert", (text) =>{
            expect(text).to.contains("login failed")
        })   
    });

    // Login wrong password
    it('Login with wrong password', () => {
        const email = cy.get("input[name='email']")
        email.type("user@react.test")
        const password = cy.get("input[name='password']")
        password.type("rahasia123")
        const button = cy.get("button")
        cy.wait(2000)
        button.click()
        cy.on("window:alert", (text) =>{
            expect(text).to.contains("login failed")
        }) 
    });

    // Login passed
    it('Login passed', () => {
        const email = cy.get("input[name='email']")
        email.type("user@react.test")
        const password = cy.get("input[name='password']")
        password.type("password")
        const button = cy.get("button")
        cy.wait(2000)
        button.click()
        cy.on("window:alert", (text) =>{
            expect(text).to.contains("welcome")
        }) 
        cy.url().should('eq', 'http://localhost:3000/dashboard')
    });

})