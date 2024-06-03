import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';


// Static Resources
import LOGIN_BACKGROUND from '@salesforce/resourceUrl/LoginFlowImages'
import CBSVG from "@salesforce/resourceUrl/CBSVG"

// Apex Classes
import login from '@salesforce/apex/CBLoginController.login'
import fetchExchangeRate from "@salesforce/apex/CBApiController.fetchExchangeRate";

// JS Scripts
import { getJsonData, dateToTimestamp, setMobileSessionStorage, getMobileSessionStorage, getLocalStorage, setLocalStorage, removeLocalStorage } from 'c/cBUtilities';


// Static Resources Variables
import CB_AUTHENTICATION_SUCCESS from '@salesforce/resourceUrl/CBAutenticationSuccess';
import CB_AUTHENTICATION_FAILED from '@salesforce/resourceUrl/CBAutenticationFailed';


// Custom Labels
import USERNAME from '@salesforce/label/c.CB_Username';
import PASSWORD from '@salesforce/label/c.CB_Password';
import REM_ME from '@salesforce/label/c.CB_RememberMe';
import LOG_IN from '@salesforce/label/c.CB_LogIn';
import FORGOT_PASSWORD from '@salesforce/label/c.CB_ForgotYourPassword';
import NEW_TO_CLARIEN from '@salesforce/label/c.CB_NewtoClarien';
import SIGNUP from '@salesforce/label/c.CB_SignUp';
import REGISTERED_TOKEN from '@salesforce/label/c.CB_HaveYouRegToken';
import CLICK_HERE_TOKEN from '@salesforce/label/c.CB_ClickHereToken';
import AUTHENTICATION_SUCCESSFULL from '@salesforce/label/c.CB_AuthenticationSuccessful';
import PASSWORD_EXPIRED_MESSAGE from '@salesforce/label/c.CB_Password_Expired';
import AUTHENTICATION_FAILED_MESSAGE from '@salesforce/label/c.CB_Authentication_Failed';
import AUTHENTICATION_INPROGRESS_MESSAGE from '@salesforce/label/c.CB_Authentication_InProgress';
import AUTHENTICATION_SUCCESSFUL_MESSAGE from '@salesforce/label/c.CB_Authentication_Successful';

//page
import CHECK_PASSWORD from '@salesforce/label/c.CB_Page_Check_Password';
import SIGNUP_PAGE from '@salesforce/label/c.CB_Page_Signup';
import ERRORCOMPONENT_PAGE from '@salesforce/label/c.CB_Page_Errorcomponent';
import RESETEXPIREDPASSWORD_PAGE from '@salesforce/label/c.CB_Page_Resetexpiredpassword';

export default class TestLoginForm extends NavigationMixin(LightningElement) {

    CBLoginFormCompanyLogo = `${CBSVG}/CBSVGs/CBLoginFormCompanyLogo.svg#CBLoginFormCompanyLogo`;
    CBLoginFormCompanyName = `${CBSVG}/CBSVGs/CBLoginFormCompanyName.svg#CBLoginFormCompanyName`;
    CBHidePassword = `${CBSVG}/CBSVGs/CBHidePassword.svg#CBHidePassword`;
    CBShowPassword = `${CBSVG}/CBSVGs/CBShowPassword.svg#CBShowPassword`;
    CBFaceBiometric = `${CBSVG}/CBSVGs/CBFaceBiometric.svg#CBFaceBiometric`;

    // Custom Labels
    label = {
        USERNAME,
        PASSWORD,
        REM_ME,
        LOG_IN: LOG_IN.toUpperCase(),
        FORGOT_PASSWORD,
        NEW_TO_CLARIEN,
        SIGNUP,
        REGISTERED_TOKEN,
        CLICK_HERE_TOKEN,
        AUTHENTICATION_SUCCESSFULL,
    }


    // Static Resources
    bg = LOGIN_BACKGROUND + '/Images/loginBg1.png'
    bg2 = LOGIN_BACKGROUND + '/Images/loginBg2.png'
    bg3 = LOGIN_BACKGROUND + '/Images/loginBg3.png'
    successGif = CB_AUTHENTICATION_SUCCESS
    failureGif = CB_AUTHENTICATION_FAILED


    // Initial properties 
    username = ''
    password = ''
    rem_me = false
    showError = false
    //errorMsg = '* Please enter valid User Id & Password' //Defualt Error Messsage
    errorMsg = 'Invalid username or password. Please try again'
    passwordIcon = false
    isloaded = true;
    isapploaded = true;
    isloginloading = false;
    signInPayload = ''
    signInJsonPaths = []
    exchangeRateMdtapiName = 'CB_GET_Exchange_Rates'
    signInMdtapiName = 'CB_Login_API'
    exchangeRates = []
    exchangeRatesLoaded = false
    hasRendered = false
    isPageLoading = true;
    requestUUID = ''

    get usernameClass() {
        return this.showError ? 'username error-input-field' : 'username'
    }
    get passwordClass() {
        return this.showError ? 'password error-input-field' : 'password'
    }
    get container() {
        return this.showError ? 'container loginError' : 'container'
    }

    //flag variable to show/hide confirmation modal
    confirmModal = false
    // Authentication Status Modal initial configuration
    @track authenticationPopup = {

        // Initial Authentication Status message
        authenticationStatus: '',
        // Authentication Status GIF
        authenticationSpinnergif: null,
        // Authentication Status open or close status
        openModal: false,
        // Authentication loading animation visibility
        showLoadingAnimation: true
    }

    // Login Footer initial configuration
    @track footerItemInfo = {

        // Single Popover details 
        contactUs: {
            // Opened popover
            opened: false,
            // Popover label 
            value: "contactUs",
            // Popover Classes
            class: 'menu-item contact-us off_15_6_6'
        },
        help: {
            opened: false,
            value: "help",
            class: 'menu-item help off_15_6_6'
        },

        atmLocater: {
            opened: false,
            value: "atmLocator",
            class: 'menu-item atm-locator off_15_6_6'
        },
        exchangeRates: {
            opened: false,
            value: "exchangeRates",
            class: 'menu-item exchange-rates off_15_6_6'
        },
    }

    /**
 * Wire apex methods
 *
 * @return {void}
 * @param {String} payload - The API payload
 * @param {String} metadataName - The API name for the API metadata object
*/
    @wire(fetchExchangeRate, { reqWrapper: { metadataName: 'CB_GET_Exchange_Rates' } })
    exchangeRateHandler({ data, error }) {
        if (data) {
            this.exchangeRates = JSON.parse(data).fxRateList
            setMobileSessionStorage('CBExchangeRates', JSON.parse(data).fxRateList)
            console.log(data)
            this.exchangeRatesLoaded = true
        } else {
            console.log(error);
        }
    }



    /**
     * Lifecycle Hooks
     *
     * @return {void}
    */

    connectedCallback() {
        this.getUsername();
        this.getJsonBody();
        console.log('loginloaded', this.isloginloading);
        this.requestUUID = dateToTimestamp()
    }


    //Should be called in connectedCallback()
    getJsonBody() {
        getJsonData(this.signInMdtapiName)
            .then((result) => {
                this.signInPayload = JSON.parse(result[0])
                this.signInJsonPaths = result[1]
            }).catch((error) => {
                console.log("Could not get the Json/ Path Data;\n")
                console.error(error);
            })
    }

    renderedCallback() {
        /**
          *  for loading background style. 
          *
          **/
        if (!this.hasRendered) {
            this.hasRendered = true
            // this.refs.mainDiv.style.backgroundImage = `url(${this.bg})`;
            this.isPageLoading = false;
        }

    }

    /**
     * Getter method for loading background style.  
     *
     * @return {String} The CSS property to set the background image of a component with a URL passed as parameter.
    */
    // get loginBackground() {
    //     return `
    //     background-image: url(${this.bg});
    //     `
    // }


    /**
     * Using a single Navigate function is more efficient, accepts source type and source name as parameters
     *
     * @param {String} type - The page destination type
     * @param {String} url_name - source name as parameter
     * @return {void}
    */
    navigateTo(type, url_name) {
        const pageReference = {
            type,
            attributes: {
                name: url_name
            }
        };
        this[NavigationMixin.Navigate](pageReference);
    }

    /**
     * Navigation to "Check_password"
     *
     * @return {void}
    */
    navigateToForgotPassword() {
        this.navigateTo('comm__namedPage', CHECK_PASSWORD)
    }

    /**
     * Navigation to "CBAccessTokenForm__c"
     *
     * @return {void}
    */
    // navigateToRegisterToken() {
    //     this.navigateTo('comm__namedPage', 'CBAccessTokenForm__c')
    // }


    /**
     * Navigation to "CBSignUp__c"
     *
     * @return {void}
    */
    navigateToSignUp() {
        this.navigateTo('comm__namedPage', SIGNUP_PAGE)
    }



    /**
     * Input handler - Username
     *
     * @param {Object} event - The event received from HTML element 
     * @return {void}
    */
    usernameHandler(event) {
        this.username = event.target.value
        this.showError = false;
    }


    /**
     * Input handler - password
     *
     * @param {Object} event - The event received from HTML element 
     * @return {void}
    */
    passwordHandler(event) {
        this.password = event.target.value
        this.showError = false;

    }



    /**
     * Input handler - Remember_me
     *
     * @param {Object} event - The event received from HTML element 
     * @return {void}
    */
    handleRembme() {
        this.rem_me = !this.rem_me
    }


    /**
     * Password hide and Show
     *
     * @return {void}
    */
    passwordHideShow() {
        let passField = this.template.querySelector('.password')
        if (this.passwordIcon) {
            passField.type = 'password'
            this.passwordIcon = false
        } else {
            passField.type = 'text'
            this.passwordIcon = true
        }
    }



    /**
     * Authenticate Status Modal helper function
     *
     * @param {String} icon - The static recource url for GIF
     * @param {String} message - The Authentication status message
     * @return {void} 
    */
    authenticate(icon, message, resultUrl = null, openConfirmModal = false) {

        // Stopping Loading animation
        this.authenticationPopup.showLoadingAnimation = false

        // Showing the icon after loading animation is stopped
        this.authenticationPopup.authenticationSpinnergif = icon

        // Setting the authentication status message
        this.authenticationPopup.authenticationStatus = message;
        console.log("Outer: Closed Loading......!!!")
        setTimeout(() => {
            console.log("Inner: Closed Authentication Modal......!!!")

            // Removing the Authentication status modal 
            this.authenticationPopup.openModal = false;

            // Showing the confirmation Modal
            if (openConfirmModal) {
                this.confirmModal = true
            }
            if (resultUrl) {
                window.location.href = resultUrl;
            }
        }, 3000)
    }
    authenticationInProgress(message) {
        this.authenticationPopup.openModal = true;
        this.authenticationPopup.showLoadingAnimation = true
        this.authenticationPopup.authenticationStatus = message
    }



    /**
     * Opening Popover - Contact Us 
     *
     * @return {void}
    */
    openContactUs() {
        this.openPopOvers('contactUs')
    }

    /**
     * Closing Popover - Contact Us 
     *
     * @return {void}
    */
    closeContactUs() {
        this.footerItemInfo.contactUs.opened = false
        this.footerItemInfo.contactUs.class = 'menu-item contact-us off_15_6_6'
    }


    /**
     * Opening Popover - ATM Locater 
     *
     * @return {void}
    */
    openAtmLocater() {
        this.openPopOvers('atmLocater')
    }


    /**
     * Opening Popover - Ecahnage Rates 
     *
     * @return {void}
    */
    openExchangeRates() {
        this.openPopOvers('exchangeRates')
    }



    /**
     * Single method to open and close the popover 
     *
     * @param {String} opened - The popover to open
     * @return {void} 
    */
    openPopOvers(opened) {

        // Copying the current popover configuration
        let updatedPopover = { ...this.footerItemInfo }

        // Looping on the current popover configuration
        Object.keys(this.footerItemInfo).map((key) => {

            // Checking if the opened string passed is equal to the key
            if (key === opened) {

                // Opening the popover if not opened and closing it if is already opened
                updatedPopover[key].opened = !updatedPopover[key].opened
                // Updating the Class for managing the active and inactive styles
                updatedPopover[key].class = updatedPopover[key].class.includes("off_15_6_6") ? updatedPopover[key].class.replace("off_15_6_6", "on_15_14") : updatedPopover[key].class.replace("on_15_14", "off_15_6_6")

                // Closing the other popovers and updating the class to inactive
            } else {
                updatedPopover[key].opened = false
                updatedPopover[key].class = updatedPopover[key].class.replace("on_15_14", "off_15_6_6")
            }
        })

        // Updating the original configuration
        this.footerItemInfo = updatedPopover
    }



    /**
     * Closing the popoves when touched on other places of the screen 
     *
     * @param {Object} event - The event received from HTML element 
     * @return {void} 
    */
    closePopOvers(event) {

        // Getting the popover HTML elements to have the reference of them
        let popups = [
            this.template.querySelector('c-c-b-login-exchange-rates'),
            this.template.querySelector('c-c-b-atm-map'),
            this.template.querySelector('c-c-b-login-contact-us'),
            this.template.querySelector('c-c-b-login-footer ')
        ]


        // Checking if the HTML element pressed is one of the popovers, if yes, terminating the method.
        if (event.target === popups[0] || event.target === popups[1] || event.target === popups[2] || event.target === popups[3]) {

            return

            // If not, closing any of the popover if opened. 
        } else {


            if (this.footerItemInfo.contactUs.opened || this.footerItemInfo.exchangeRates.opened || this.footerItemInfo.atmLocater.opened) {

                // Passing null to the 'this.openPopOvers' method so that it can  check all the popovers, and close all popover.
                this.openPopOvers(null)
            }
        }
    }


    /**
     * Getting the username and remember me flag from the locaStorage
     *
     * @return {void} 
    */
    getUsername() {
        // Checking for the availability of username and the remember_me flag in the locaStorage, and if present using those values. 
        if (localStorage.CBUsernameAvailable && localStorage.CBUsername !== "") {
            this.username = getLocalStorage("CBUsername");
            this.rem_me = getLocalStorage("CBUsernameAvailable");
        }
    }


    /**
     * Updating the username and remember_me flag in localStorage, called when the user is Authenticated to log in.
     *
     * @return {void} 
    */
    isRememberMe() {
        if (this.rem_me) {
            if (this.username === '') {
                return
            }
            setLocalStorage('CBUsername', this.username)
            setLocalStorage('CBUsernameAvailable', true)
        } else {
            removeLocalStorage('CBUsername', 'CBUsernameAvailable')
        }
    }




    /**
  * Logout modal items metadata
  */
    @track modal = {
        // Title of the logout confirmation modal
        title: '',
        // Message in the logout confirmation modal (empty for now)
        message: '',
        // Metadata for the "Yes" button in the logout confirmation modal
        yesButton: {
            // Exposed property indicating visibility of the button
            exposed: true,
            // Label for the "Yes" button
            label: "",
            // Implementation of the action performed when the "Yes" button is clicked
            implementation: null
        },
        // Metadata for the "Cancel" button in the logout confirmation modal
        noButton: {
            // Exposed property indicating visibility of the button
            exposed: false,
            // Label for the "Cancel" button
            label: "",
            // Implementation of the action performed when the "Cancel" button is clicked
            implementation: null
        },
    };

    get loginButtomDisable() {
        return (this.username === '' || this.password === '' || this.username.includes(' ') || this.password.includes(' '));
    }

    //The doLogin() should be called when pressed on 'SUBMIT' button.
    doLogin(event) {
        event.preventDefault();

        this.authenticationInProgress(AUTHENTICATION_INPROGRESS_MESSAGE)

        this.signInPayload = this.mapTheData(this.signInPayload, this.signInJsonPaths);



        let requestWrapper = {
            payload: JSON.stringify(this.signInPayload), // Ensure payload is a string
            metadataName: this.signInMdtapiName,
            headers: ''  // Provide metadata name
        };

        login({ wrapper: requestWrapper })
            .then((result) => {
                this.isRememberMe();
                if (result?.customerName) {
                    setMobileSessionStorage('CustomerName', result?.customerName)
                    console.log(getMobileSessionStorage('CustomerName'));
                }

                if (result?.lastLogin) {
                    setMobileSessionStorage('LastLogin', result?.lastLogin)
                    console.log(getMobileSessionStorage('LastLogin'));
                }


                setMobileSessionStorage('CBUsername', this.username)
                console.log(getMobileSessionStorage('CBUsername'));
                setMobileSessionStorage('CBPassword', this.password)
                console.log(getMobileSessionStorage('CBPassword'));

                this.handleAuthenticationSuccess(result.loginUrl, result.forcePwdChangeFlag);
                console.log('OUTPUT : ', result);
            }).catch((error) => {
                this.requestUUID = dateToTimestamp()
                console.log('Error whil logging : ', JSON.stringify(error));
                this.handleAuthenticationFailure(error);
            })
    }

    /**
     * Method to handle successful authentication
     * 
     * @param {String} resultUrl - The URL after successful authentication
     * @returns {void}
     */
    handleAuthenticationSuccess(resultUrl, forcePwdChangeFlag, openConfirmModal = false) {
        // Show successful authentication message
        this.showError = false;
        if (forcePwdChangeFlag === 'Y') {
            let yesBtnfunc = () => {
                this.navigateTo('comm__namedPage', RESETEXPIREDPASSWORD_PAGE)
                this.confirmModal = false
            }
            this.configureConfirmModal('', PASSWORD_EXPIRED_MESSAGE, 'OK', yesBtnfunc)
        } else {
            this.authenticate(this.successGif, AUTHENTICATION_SUCCESSFUL_MESSAGE, resultUrl, openConfirmModal);
        }
    }

    /**
     * Method to handle authentication failure
     * 
     * @param {Error} error - The error encountered during authentication
     * @returns {void}
     */
    handleAuthenticationFailure(error) {
        // Show authentication failure message
        this.errorMsg = error?.body?.message ? error?.body?.message : error;
        if (Number(this.errorMsg) >= 300 || Number(this.errorMsg) < 200) {
            console.log("Error:", error?.body?.message)
            console.log(JSON.stringify(this.errorMsg))
            this.navigateTo('comm__namedPage', ERRORCOMPONENT_PAGE);
        } else {
            this.authenticate(this.failureGif, AUTHENTICATION_FAILED_MESSAGE);
            this.showError = true;
        }

    }

    /**
     * Method to map JSON data with specified paths
     * 
     * @param {Object} jsonReq - The JSON request object
     * @param {Array} JsonPath - The array of JSON paths to map
     * @returns {Object} - The mapped JSON request object
     */
    mapTheData(jsonReq, JsonPath) {
        let evalStr = ''
        JsonPath.forEach((record) => {
            // Dynamically set values in JSON request object
            evalStr += `jsonReq${record.JSON_Path__c}=this.${record.Field_Name__c};`
        });
        eval(evalStr);
        console.log('jsonReq : ', JSON.stringify(jsonReq));
        return jsonReq;
    }




    configureConfirmModal(title, message, yesBtnMsg = '', yesBtnFunc = null, notBtnMsg = '', noBtnFunc = null) {
        this.modal.title = title
        this.modal.message = message
        if (yesBtnMsg) {
            this.modal.yesButton.exposed = true
            this.modal.yesButton.label = yesBtnMsg
        }
        if (notBtnMsg) {
            this.modal.noButton.exposed = true
            this.modal.noButton.label = notBtnMsg
        }
        if (yesBtnFunc) {
            this.modal.yesButton.implementation = yesBtnFunc
        }
        if (noBtnFunc) {
            this.modal.noButton.implementation = noBtnFunc
        }
        console.log(JSON.stringify(this.modal))
    }



}