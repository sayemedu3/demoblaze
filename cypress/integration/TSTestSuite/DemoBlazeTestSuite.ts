/// <reference types="cypress" />



describe('navigation bar items', () => {
  before(() => {
    cy.fixture('modalFields').then((modalFields) => {
      //Test Data for validating Model fields
      this.modalFields = modalFields;
      console.log('modalFields:', modalFields);
      this.loginModalFieldsArr = this.modalFields['Login'];
      this.signUpModalFieldArr = this.modalFields['SignUp'];
      this.contactUsModalFieldArr = this.modalFields['ContactUs'];
      this.aboutUsModalFieldArr = this.modalFields['AboutUs'];
    })

    cy.fixture('userInput').then((userInput) => {
      //Test Data for validating and entering user innput in the modal form
      this.userInput = userInput;
      this.loginValidUserInputArr = this.userInput['LoginValidUserInput'];
      this.loginInvalidUserInputArr = this.userInput['LoginInvalidUserInput'];
      this.signUpExistingUserInputArr = this.userInput['SignUpExistingUserInput'];
      this.contactUsUserInputArr = this.userInput['ContactUsUserInput'];
    })

    cy.fixture('entryData').then((entryData) => {
      //Test Data for entries API
      this.entryData = entryData;
    })
  })
  beforeEach(() => {
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.addCookieConsent();
    cy.visit('https://www.demoblaze.com/')
    cy.url().should('include', 'demoblaze')


  })
  afterEach(() => {
  })
  after(() => {
  })

  it("Testing Sign up using alraedy registered user,", () => {
    //Launching and validating Signup Modal
    cy.clickNavItemAndValidateModal(this.signUpModalFieldArr)
    //Validating Form field String
    cy.verifyFormFields(this.signUpModalFieldArr);
    //Entering already existing username and password in Sign Up form 
    cy.enterFormInputs(this.signUpExistingUserInputArr);
    //Clicking the Sign up Button
    cy.get("button[onclick='register()']").click();
    //Validating the expected String on the alert box if user  already exist
    cy.validateAlertBoxMessage("This user already exist.");
  })


  it("Testing Sign up using invalid and empty string in the Sign Up form,", () => {
    //Launching and validating Signup Modal
    cy.clickNavItemAndValidateModal(this.signUpModalFieldArr)
    //Validating Form field String
    cy.verifyFormFields(this.signUpModalFieldArr)
    //Entering no Input for username and password in Sign Up form 

    //Clicking the Sign up Button
    cy.get("button[onclick='register()']").click()
    //Validating the expected String on the alert box if user  already exist
    cy.validateAlertBoxMessage("Please fill out Username and Password.");
  })

  it("Testing Sign In using already registered user", () => {
    //Launching and validating going through signin flow and sign out flow
    cy.clickNavItemAndValidateModal(this.loginModalFieldsArr)
    //Validating Username and Password Field label
    cy.verifyFormFields(this.loginModalFieldsArr)
    //Entering usernmae and passowrd
    cy.enterFormInputs(this.loginValidUserInputArr)
    //Clicking login button
    cy.get("button[onclick='logIn()']").click()
    //Verifying after login
    cy.get("#nameofuser").should("be.visible").should("have.text", "Welcome " + "testUser1994")
  })


  it("Testing Sign In using non-register/doesn't exist user", () => {
    //Launching and validating going through signin flow and sign out flow
    cy.clickNavItemAndValidateModal(this.loginModalFieldsArr)
    //Validating Username and Password Field label
    cy.verifyFormFields(this.loginModalFieldsArr)
    //Entering usernmae and passowrd
    cy.enterFormInputs(this.loginInvalidUserInputArr)
    //Clicking login button
    cy.get("button[onclick='logIn()']").click()
    //Validating the expected String on the alert box if user  already exist
    cy.validateAlertBoxMessage("User does not exist.")
  })


  it("Testing if user is successfully able to Sign Out", () => {
    //Launching and validating going through signin flow and sign out flow
    cy.clickNavItemAndValidateModal(this.loginModalFieldsArr)
    //Validating Username and Password Field label
    cy.verifyFormFields(this.loginModalFieldsArr)
    //Entering usernmae and passowrd
    cy.enterFormInputs(this.loginValidUserInputArr)
    //Clicking login button
    cy.get("button[onclick='logIn()']").click()
    //Verifying after login
    cy.get("#nameofuser").should("be.visible").should("have.text", "Welcome " + "testUser1994");
    //Verifing Log Out Button text and clicking
    cy.get("#logout2").should('be.visible').should("have.text", "Log out").click()
    //Verify Log Out by verify that Log In is visible
    cy.get("#login2").should('be.visible').should("have.text", "Log in");
    //Validating if user is able to Launch Login Modal after Sign Out
    cy.clickNavItemAndValidateModal(this.loginModalFieldsArr)
  })


  it("Testing Contact Us Form with Valid Sample Message", () => {
    //Launching and validating Contact Us Form
    cy.clickNavItemAndValidateModal(this.contactUsModalFieldArr)
    //Validating Username and Password Field label
    cy.verifyFormFields(this.contactUsModalFieldArr)
    //Entering user email, name and support message
    cy.enterFormInputs(this.contactUsUserInputArr)
    //Validating the expected String on the alert box if user  already exist
    cy.validateAlertBoxMessage("Thanks for the message!!")
  })

  it("Testing About Us and verifying video playback", () => {
    //Launching and validating About Us Modal
    cy.clickNavItemAndValidateModal(this.aboutUsModalFieldArr)
    cy.get('video')
      .should('have.prop', 'ended', false)
      .and('have.prop', 'paused', true)
      .then(($video) => {
        //$video[0].playbackRate = 4
        $video[0].play()
      })
    // once the video starts playing, check props
    cy.get('video')
      .should('have.prop', 'ended', false)
      .and('have.prop', 'paused', false)

    // wait for the video to finish playing
    // by retrying the assertion
    //cy.get('video', { timeout: 10000 }).and('have.prop', 'ended', true)  
  })


  it('Test Navigation Bar List Items', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are all items present,
    // which are the two default items.
    cy.get('#navbarExample ul li').should('have.length', 8)

    // We can go even further and check each nnavigation list items contain
    // the correct text. We use the `first` and `last` functions
    // to get just the first and last matched elements individually,
    // and then perform an assertion with `contains`.

    cy.get('#navbarExample ul li').first().contains('Home')
    cy.get('#navbarExample ul li').contains('Contact')
    cy.get('#navbarExample ul li').last().contains('Sign up')
  })



it('Call entries API and validate response and validate response object keys', () => {
  https://api.demoblaze.com/entries
  cy.request('https://api.demoblaze.com/entries')
    .should((response) => {
    expect(response.status).to.eq(200)
  // the server sometimes gets an extra comment posted from another machine
  // which gets returned as 1 extra object
  let responseBody = response.body.Items[0];
    expect(responseBody).to.include.keys('cat', 'desc', 'id', 'img', 'price', 'title')
   // let expectedKeys = ['cat', 'desc', 'id', 'img', 'price', 'title']
   // for(let i in responseBody){
   //  expect(expectedKeys).to.contains(i);
   // }
      expect(response).to.have.property('headers')
      expect(response).to.have.property('duration')
    })
})


it('Intercept Stub, Call entries API and validate UI response and validate response object keys', () => {
  https://api.demoblaze.com/entries
  cy.intercept('https://api.demoblaze.com/entries', {fixture: "entryData.json"});
  cy.request('https://api.demoblaze.com/entries')
  cy.visit('https://www.demoblaze.com/')
  cy.get('body > div:nth-child(6) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > p:nth-child(3)')
  .contains(this.entryData.Items[0]['desc']);
})

})

