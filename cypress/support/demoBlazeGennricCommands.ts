export const addCookieConsent = () => {

    cy.window().then( window => {
        window.localStorage.setItem('cookie-consent', 'true');
    })

};  

export const clickNavItemAndValidateModal = (modalFieldsArr) => {
    cy.get(modalFieldsArr.navListItemIndentifier).click();
    //cy.get(modelLocator).should('have.attr', 'aria-hidden', 'true');
    //Validates if Modal is shown
    cy.get(modalFieldsArr.modelLocator).should('have.css', 'display', 'block');
    cy.get(modalFieldsArr.modelLocator).should('have.class', 'show');
    //Validates Modal Label Title Text
    cy.get(modalFieldsArr.modalLabelIdentifier).should('have.text', modalFieldsArr.modalLabelMessage);
}

export const verifyFormFields = (modalFieldsArr) =>{
    let formFieldsArr = modalFieldsArr.formFields;
    for (var val of formFieldsArr) {
        let fieldCSSSelector = val['fieldCSSSelector'];
        let fieldText = val['fieldText']; 
        cy.get(fieldCSSSelector).should("have.text", fieldText);
      }
}

export const enterFormInputs = (inputsArr) =>{
    for (var val of inputsArr) {
        let inputCSSSelector = val['inputCSSSelector'];
        let inputText = val['inputText'];
        cy.get(inputCSSSelector).click().type(inputText, { delay: 0 })
      }
}

export const validateAlertBoxMessage = (alertMessage) => {

//to validate the alert box string
 // firing window: alert event with on() method
 cy.on('window:alert',(txt)=>{
    //Mocha assertions
    expect(txt).to.contains('Your full name cannot be blank.');
 })
} 

declare global {

    namespace Cypress{
        interface Chainable{
            addCookieConsent: typeof addCookieConsent;
            clickNavItemAndValidateModal: typeof clickNavItemAndValidateModal;
            validateAlertBoxMessage: typeof validateAlertBoxMessage;
            verifyFormFields: typeof verifyFormFields;
            enterFormInputs: typeof enterFormInputs;
        }
    }
}