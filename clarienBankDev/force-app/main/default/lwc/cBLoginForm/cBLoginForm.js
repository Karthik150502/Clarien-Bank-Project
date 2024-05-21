/*
    Author - Mahalakshmi,Prateek
    Created Date - 06/03/2024
    Modified Date - 21/03/2024, 20/03/2024, 19/03/2024, 18/03/2024 
    Description - "Login Form Logic and Methods, Username - Password Authentication, Remember Me flag record, Biometric Authentication, Register Link, Reset Password Links, Account Activate Link, Footer and Popovers handling."
*/

// Ṣalesforce Plugins and variables
import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import networkId from '@salesforce/community/Id';
import basePath from '@salesforce/community/basePath';


// Static Resources
import LOGIN_BACKGROUND from '@salesforce/resourceUrl/LoginFlowImages'
import CBSVG from "@salesforce/resourceUrl/CBSVG"

// Apex Classes
import login from '@salesforce/apex/CBLoginController.login'

// Session Storage Test
import setCacheData from '@salesforce/apex/CBCacheHandler.setCache'

import fetchExchangeRate from "@salesforce/apex/CBApiController.fetchExchangeRate";
import getErrorMessage from "@salesforce/apex/CBErrorHandler.getErrorMessage";

// JS Scripts
import { getJsonData, setSessData, setAllSessData, } from 'c/cBUtilities';

// Static Resources Variables
import CB_LOADING_GIF from '@salesforce/resourceUrl/CBLoadingSpinner';
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
import SPALSH_SCREEN from '@salesforce/resourceUrl/splashscreen';


// Global variables
const before_ = `${basePath}`.substring(0, `${basePath}`.indexOf('/s') + 1);
const commBaseUrl = `https://${location.host}${before_}`;


export default class CBLoginForm extends NavigationMixin(LightningElement) {

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
    splashbg = LOGIN_BACKGROUND + '/Images/splashScreen.png'
    bg = LOGIN_BACKGROUND + '/Images/loginBg1.png'
    bg2 = LOGIN_BACKGROUND + '/Images/loginBg2.png'
    bg3 = LOGIN_BACKGROUND + '/Images/loginBg3.png'
    successGif = CB_AUTHENTICATION_SUCCESS
    failureGif = CB_AUTHENTICATION_FAILED
    splashscreen = `${SPALSH_SCREEN}/SplashIMG.svg#splashscreen`;


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
    startingUrl = commBaseUrl + '/clarienlogin'
    loginErrorMessageCode = 'M106803'
    signInPayload = ''
    signInJsonPaths = []
    exchangeRateMdtapiName = 'CB_GET_Exchange_Rates'
    signInMdtapiName = 'Login_API'
    exchangeRates = []
    hasRendered = false
    passwordExpired = false
    isPageLoading = true;

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
        authenticationStatus: 'Processing the request, kindly wait!',
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
            setLocalStorage('CBExchangeRates', JSON.parse(data).fxRateList)
            console.log(data)
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
        this.getUsernamePassword();
        this.getJsonBody();
        console.log('loginloaded', this.isloginloading);
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
            this.refs.splashDiv.style.backgroundImage = `url(${this.splashbg})`;

            setTimeout(() => {
                console.log('Entered in timeout');
                this.refs.mainDiv.style.backgroundImage = `url(${this.bg})`;
                this.isapploaded = false;
                console.log('isloginloading', this.isloginloading);
                this.isloginloading = true;
                console.log('isloginloading', this.isloginloading);
            }, 5000)
            this.isPageLoading = false;
        }

    }

    /**
     * Getter method for loading background style.  
     *
     * @return {String} The CSS property to set the background image of a component with a URL passed as parameter.
    */
    get loginBackground() {
        return `
        background-image: url(${this.bg});
        `
    }


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
        this.navigateTo('comm__namedPage', 'Check_Password')
    }

    /**
     * Navigation to "CBAccessTokenForm__c"
     *
     * @return {void}
    */
    navigateToRegisterToken() {
        this.navigateTo('comm__namedPage', 'CBAccessTokenForm__c')
    }


    /**
     * Navigation to "CBSignUp__c"
     *
     * @return {void}
    */
    navigateToSignUp() {
        this.navigateTo('comm__namedPage', 'CBSignUp__c')
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

    checkUsername(username) {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(username)) {
            return username + "@developer.site.com";
        } else {
            return '';
        }
    }


    /**
     * Authenticate Status Modal helper function
     *
     * @param {String} icon - The static recource url for GIF
     * @param {String} message - The Authentication status message
     * @return {void} 
    */
    authenticate(icon, message, openConfirmModal = false) {
        // Open the Authentication Status Model
        this.authenticationPopup.openModal = true;

        // Setting timout for loading animation to stop.
        setTimeout(() => {
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
            }, 3000)
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
    getUsernamePassword() {
        // Checking for the availability of username and the remember_me flag in the locaStorage, and if present using those values. 
        if (localStorage.ClarienBankUserPasswordAvailable && localStorage.ClarienBankUsername !== "") {
            this.username = localStorage.getItem("ClarienBankUsername");
            this.rem_me = localStorage.getItem("ClarienBankUserPasswordAvailable");
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
            localStorage.setItem('ClarienBankUsername', this.username)
            localStorage.setItem('ClarienBankUserPasswordAvailable', true)
        } else {
            localStorage.removeItem('ClarienBankUsername')
            localStorage.removeItem('ClarienBankUserPasswordAvailable')
        }
    }


    /**
  * Logout modal items metadata
  */
    @track modal = {
        // Title of the logout confirmation modal
        title: '',
        // Message in the logout confirmation modal (empty for now)
        message: 'Try Again',
        // Metadata for the "Yes" button in the logout confirmation modal
        yesButton: {
            // Exposed property indicating visibility of the button
            exposed: true,
            // Label for the "Yes" button
            label: "OK",
            // Implementation of the action performed when the "Yes" button is clicked
            implementation: () => {
                this.confirmModal = false
            }
        },
        // Metadata for the "Cancel" button in the logout confirmation modal
        noButton: {
            // Exposed property indicating visibility of the button
            exposed: false,
            // Label for the "Cancel" button
            label: "",
            // Implementation of the action performed when the "Cancel" button is clicked
            implementation: () => {
                // Close the modal by setting modalOpen property to false
                this.confirmModal = false;
            }
        },
    };

    get loginButtomDisable() {
        return this.username === '' || this.password === '';
    }

    //The doLogin() should be called when pressed on 'SUBMIT' button.
    doLogin(event) {
        event.preventDefault();

        this.authenticationInProgress('Processing the request, kindly wait!')

        this.signInPayload = this.mapTheData(this.signInPayload, this.signInJsonPaths);

        if (this.password === '0000') {
            let yesBtnfunc = () => {
                this.navigateTo('comm__namedPage', 'Reset_Expired_Password__c')
                this.confirmModal = false
            }
            this.configureConfirmModal('', "The password has been expired, kindly reset again!", 'OK', yesBtnfunc)
            this.passwordExpired = true
        }

        let requestWrapper = {
            payload: JSON.stringify(this.signInPayload), // Ensure payload is a string
            metadataName: this.signInMdtapiName,
            headers: ''  // Provide metadata name
        };

        login({ wrapper: requestWrapper })
            .then((result) => {
                let sessionData = {
                    "CBUsername": this.username,
                    "CBPassword": this.password,
                    "CBSessionId": JSON.parse(result[0])?.header?.session?.sessionId,
                    "CBFormId": JSON.parse(result[0])?.header?.session?.fromId
                }


                setAllSessData({ sessionData: JSON.stringify(sessionData)})
                    .then((result) => {
                        console.log("Done session storage")
                        this.handleAuthenticationSuccess(result[1]);
                    }).catch((error) => {
                        console.log("Some error occured while storing in the session: " + JSON.stringify(error))
                })

                // try {
                //     let LSUserName = setSessionStorage('CBUserName', this.username);
                //     let LSPassword = setSessionStorage('CBPassword', this.password);
                //     console.log('Session Id = ' + setSessionStorage('CBSessionId', JSON.parse(result[0])?.header?.session?.sessionId))
                //     console.log("Form Id = " + setSessionStorage('CBFormId', JSON.parse(result[0])?.header?.session?.fromId))
                //     console.log('UserName:', LSUserName);
                //     console.log('Password:', LSPassword);
                // } catch (error) {
                //     console.log("Could not store the data in local Storage;\n")
                //     console.error(error);
                // }
                this.handleAuthenticationSuccess(result[1]);
            }).catch((error) => {
                console.log("Error while logging in;\n")
                console.error(error)
                console.log('error whil lg : ', JSON.stringify(error));
                this.handleAuthenticationFailure(error, this.passwordExpired);
            })
    }

    /**
     * Method to handle successful authentication
     * 
     * @param {String} resultUrl - The URL after successful authentication
     * @returns {void}
     */
    handleAuthenticationSuccess(resultUrl, openConfirmModal = false) {
        // Show successful authentication message
        this.authenticate(this.successGif, AUTHENTICATION_SUCCESSFUL_MESSAGE, openConfirmModal);
        this.showError = false;
        console.log("Setting the Session Cache");

        // Redirect to result URL after a delay
        setTimeout(() => {
            window.location.href = resultUrl;
        }, 200);
    }

    /**
     * Method to handle authentication failure
     * 
     * @param {Error} error - The error encountered during authentication
     * @returns {void}
     */
    handleAuthenticationFailure(error, openConfirmModal = false) {
        // Show authentication failure message
        this.authenticate(this.failureGif, AUTHENTICATION_FAILED_MESSAGE, openConfirmModal);
        console.log("Error:", error?.body?.message)
        this.errorMsg = error?.body?.message ? error?.body?.message : error;
        console.log(JSON.stringify(this.errorMsg))
        this.showError = true;
    }

    /**
     * Method to map JSON data with specified paths
     * 
     * @param {Object} jsonReq - The JSON request object
     * @param {Array} JsonPath - The array of JSON paths to map
     * @returns {Object} - The mapped JSON request object
     */
    mapTheData(jsonReq, JsonPath) {
        JsonPath.forEach((record) => {
            // Dynamically set values in JSON request object
            eval(`jsonReq${record.JSON_Path__c}=this.${record.Field_Name__c}`);
        });
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