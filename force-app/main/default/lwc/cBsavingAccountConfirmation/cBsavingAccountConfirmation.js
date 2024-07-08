import { LightningElement, wire, track } from 'lwc';

// Importing NavigationMixin for navigation functionality
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';

// Importing labels for easy manipulation of the data in labels
import ACCOUNT_NAME from '@salesforce/label/c.CB_AccountName';
import PRODUCT from '@salesforce/label/c.CB_Product';
import ACCOUNT_TYPE from '@salesforce/label/c.CB_AccountType';
import SUBMIT from '@salesforce/label/c.CB_Submit';
import PAGE_SAVINGSACCOUNTOPENING from '@salesforce/label/c.CB_Page_Savingsaccountopening';
import CONFIRMATION from '@salesforce/label/c.CB_Confirmation';
import TRANSACTION_COMPLETED_MESSAGE from '@salesforce/label/c.CB_TransactionCompleted';
import PROCESSING_KINDLY_WAIT from '@salesforce/label/c.CB_ProcessinsKindlyWait';
import OK_BUTTON from '@salesforce/label/c.CB_Ok';
import PAGE_SERVICEREQUEST from '@salesforce/label/c.CB_Page_Servicerequest';

import { getJsonData, dateToTimestamp, getLocalStorage } from 'c/cBUtilities';

import createSavingsAccount from '@salesforce/apex/CBApiController.createSavingsAccount';

export default class CBsavingAccountConfirmation extends NavigationMixin(LightningElement) {

    // Labels for UI elements
    label = {
        ACCOUNT_NAME,
        PRODUCT,
        ACCOUNT_TYPE,
        SUBMIT
    }

    // configuration for secondary header
    configuration = {
        previousPageUrl: PAGE_SAVINGSACCOUNTOPENING,
        heading: CONFIRMATION,
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    // Global variables to store API call out required data 
    reqBody = {}
    jsonPathData = []
    currency = '';
    requestUUID = ''
    product = ''
    customerId = ''
    branchId = '100'
    customerName = ''
    accountType = ''
    apiName = 'CB_SBAcctAdd'
    productName = ''
    showModal = false

    /**
     * Handles the wire method to capture state from CurrentPageReference.
     * Initializes modal configuration for transaction completion message.
     */
    @wire(CurrentPageReference)
    pageRefHandler({ state }) {
        if (state) {
            this.product = state.product ? state.product : ''
            this.currency = state.currency ? state.currency : ''
            this.accountType = state.accountType ? state.accountType : ''
            this.productName = state.productName ? state.productName : ''
        }
    };

    /**
     * Modal configuration for transaction completion message.
     * Initializes with loading state and defines action for OK button.
     */
    @track modalConf = {
        title: '',
        message: TRANSACTION_COMPLETED_MESSAGE,
        loadingStatusMsg: PROCESSING_KINDLY_WAIT,
        isLoading: true,
        yesButton: {
            exposed: true,
            label: OK_BUTTON,
            implementation: () => {
                this.showModal = false
                this.navigateBack()
            }
        },
        notOkButton: {
            exposed: false,
        }
    }

    /**
     * Fetch JSON data required for the component
     * Load prerequisites needed for initialization 
     */
    connectedCallback() {
        this.fetchJsonData();
        this.loadPrerequisites()
    }

    /**
     * Initializes necessary prerequisites for the component.
     * Generates a request UUID and retrieves customer ID from session storage.
     */
    loadPrerequisites() {
        this.requestUUID = dateToTimestamp();
        this.customerId = getLocalStorage('CustomerId');
        this.customerName = getLocalStorage('CustomerName');
    }

    successModalOpen = false;
    /**
     * Configuration object for the success modal.
     * @type {Object}
     */
    successModalconfig = {
        title: '',
        errorTitle: '',
        message: '',
        isError: {
            openAccount: true,
        },
        okButton: {
            exposed: true,
            label: OK_BUTTON,
            function: () => {
                this.navigateBack()
            }
        },
        noButton: {
            exposed: false,
        },
        alertMsg: ''
    }

    /**
     * Handles form submission.
     * Initiates the API callout upon form submission.
     */
    submitForm() {
        this.apiCallout()
    }

    /**
     * Initiates an API call to create a savings account.
     * Handles the API call lifecycle: in progress, success, and failure.
     */
    apiCallout() {
        this.apiCalloutInProgress()
        this.reqBody = this.mapTheData(this.reqBody, this.jsonPathData)
        console.log('req body: ', JSON.stringify(this.reqBody));
        let wrapper = {
            payload: JSON.stringify(this.reqBody),
            metadataName: this.apiName,
            headers: null,
        }
        createSavingsAccount({ reqWrapper: wrapper }).then((result) => {
            console.log(result)
            this.apiCalloutSuccess(`Your Account (#${result}) Has Been Successfully Created.`)
        }).catch((error) => {
            console.log(error)
            if (error.body.message === '500') {
                this.apiCalloutFailed('Technical Issue, Please Try Again Later')
            } else {
                this.apiCalloutFailed(error.body.message)
            }
        })
    }

    /**
     * Sets up the UI for API call in progress.
     * Displays a loading indicator and prepares modal for display.
     */
    apiCalloutInProgress() {
        this.modalConf.isLoading = true
        this.showModal = true
    }
    /**
     * Updates the UI upon successful API call.
     * Sets loading indicator to false and updates success message.
     */
    apiCalloutSuccess(accountNumber) {
        console.log("Success");
        this.successModalconfig.title = accountNumber
        this.showModal = false
        this.successModalOpen = true
    }
    /**
     * Updates the UI upon failed API call.
     * Sets loading indicator to false and updates with the provided error message.
     * @param {String} errormsg - The error message returned from the API call.
     */
    apiCalloutFailed(errormsg) {
        console.log("Failure");
        this.showModal = false
        this.successModalconfig.isError = true
        this.successModalconfig.errorTitle = this.toInitCap(errormsg)
        this.successModalOpen = true
    }

    // navigate back to service request page
    navigateBack() {
        console.log('navigate called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: PAGE_SERVICEREQUEST
            }
        });
    }


    /**
    * This function uses a method from the cBJsonDataHandler package that calls an Apex method that returns the API's request body and JSON paths for substitution.
    * @param {String} apiName - The API details's metadata name.
    * @returns {void}
    */
    fetchJsonData() {
        getJsonData(this.apiName)
            .then(result => {
                this.reqBody = JSON.parse(result[0]);
                this.jsonPathData = result[1];
                console.log(this.reqBody)
                console.log(this.jsonPathData)
            }).catch((error) => {
                console.log('Some error occured: ' + error)
            })
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
            eval(`jsonReq${record.JSON_Path__c}=this.${record.Field_Name__c};`)
        })
        console.log('Mapped JSON request : ', JSON.stringify(jsonReq));
        return jsonReq;
    }

    toInitCap(sentence) {
        return sentence.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

}