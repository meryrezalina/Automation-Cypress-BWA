describe("Dashboard Page",() =>{
    it('Login', () => {
        cy.visit("http://localhost:3000/");
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

    //No data post
    it('No Post here', () => {
        cy.contains("Found 0 photos");
    });

    //Check dashboard page
    it('Check dashboard page', () => {
        //check image
        const img = cy.get("input[name='image']")
        img.should("be.visible")
        img.should("have.attr", "type", "url")
        img.should("have.attr", "required", "required")
        img.should("have.attr", "placeholder", "Image URL")
 
        //check description
        const desc = cy.get("input[name='desc']")
        desc.should("be.visible")
        desc.should("have.attr", "type", "text")
        desc.should("have.attr", "required", "required")
        desc.should("have.attr", "placeholder", "What's on your mind?")

        //check publish button'
        const button = cy.get("button")
        button.should("be.visible")
        button.contains("Publish")
        button.should("have.css", "background-color", "rgb(79, 70, 229)")
        button.should("have.css", "color", "rgb(255, 255, 255)")

    });

    // Upload some Photos
    it('Upload Postingan', () => {
        // Data for postingan
        const photos =[
            {
                imageValue: "https://images.unsplash.com/photo-1574273509043-f94f45e5b164?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BvbmdlYm9ifGVufDB8fDB8fHww",
                descValue : "Spongebob",
            },
            {
                imageValue : "https://images.unsplash.com/photo-1627796795540-18e2db6d3908?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3BvbmdlYm9ifGVufDB8fDB8fHww",
                descValue : "Patrick",
            },
        ];

        //Perulangan input data postingan 
        photos.forEach(({ imageValue, descValue }) => {
            const img = cy.get("input[name='image']")
            img.type(imageValue)

            const desc = cy.get("input[name='desc']")
            desc.type(descValue)

            const button = cy.get("button")
            button.click()

            //check upload image is exist
            cy.get("img").should("have.attr", "src", imageValue)
            cy.contains(descValue)
            
            
            
        })
    });
})