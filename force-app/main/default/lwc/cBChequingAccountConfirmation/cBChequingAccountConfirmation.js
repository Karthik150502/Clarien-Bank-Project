import { LightningElement, track, wire } from 'lwc';

// Importing NavigationMixin for navigation functionality
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';

// Importing labels for easy manipulation of the data in labels
import ACCOUNT_NAME from '@salesforce/label/c.CB_AccountName';
import PRODUCT from '@salesforce/label/c.CB_Product';
import CB_Confirmation from '@salesforce/label/c.CB_Confirmation';
import CB_Page_ChequingAccOpening from '@salesforce/label/c.CB_Page_ChequingAccOpening';
import CB_Ok from '@salesforce/label/c.CB_Ok';
import CB_Page_Servicerequest from '@salesforce/label/c.CB_Page_Servicerequest';
import YOUR_ACCOUNT_OPEN_SUCCESS from '@salesforce/label/c.CB_YourAccOpenSuccess';
import CB_AccountType from '@salesforce/label/c.CB_AccountType';
import CB_Product from '@salesforce/label/c.CB_Product';
import CBCurrency from '@salesforce/label/c.CBCurrency';
import CB_Submit from '@salesforce/label/c.CB_Submit';
import PROCESSING_KINDLY_WAIT from '@salesforce/label/c.CB_ProcessinsKindlyWait';

import CB_AUTHENTICATION_FAILED from '@salesforce/resourceUrl/CBAutenticationFailed';

import { getJsonData, dateToTimestamp, getLocalStorage } from 'c/cBUtilities';
import createCheckingAccount from '@salesforce/apex/CBApiController.createCheckingAccount';

export default class CBChequingAccountConfirmation extends NavigationMixin(LightningElement) {

    // Label object for UI text
    label = {
        ACCOUNT_NAME,
        PRODUCT,
        CB_AccountType,
        CB_Product,
        CBCurrency,
        CB_Submit
    }

    // Configuration object for the component
    configuration = {
        previousPageUrl: CB_Page_ChequingAccOpening,
        heading: CB_Confirmation,
        iconsExposed: false,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    // Wired method to get current page reference
    @wire(CurrentPageReference) pageRef;

    // Getter for selected account type from page state
    get selectedAccountType() {
        return this.pageRef?.state?.accountType ? this.pageRef?.state?.accountType : 'N/A';
    }

    // Getter for selected product from page state
    get selectedProduct() {
        this.schmCode = this.pageRef?.state?.product;
        return this.pageRef?.state?.productName ? this.pageRef?.state?.productName : 'N/A';
    }

    // Getter for selected currency from page state
    get selectedCurrency() {
        this.currency = this.pageRef?.state?.currency;
        return this.pageRef?.state?.currency ? this.pageRef?.state?.currency : 'N/A';
    }

    // Boolean flag to control the visibility of the success modal
    showModal = false;

    /**
     * Modal configuration for transaction completion message.
     * Initializes with loading state and defines action for OK button.
     */
    @track modalConf = {
        title: '',
        message: '',
        loadingStatusMsg: PROCESSING_KINDLY_WAIT,
        isLoading: true,
        yesButton: {
            exposed: true,
            label: CB_Ok,
            implementation: () => {
                this.showModal = false
                this.navigateBack()
            }
        },
        notOkButton: {
            exposed: false,
        }
    }

    successModalOpen = false
    /**
     * Configuration object for the success modal.
     * @type {Object}
     */
    successModalconfig = {
        title: YOUR_ACCOUNT_OPEN_SUCCESS,
        message: '',
        okButton: {
            exposed: true,
            label: CB_Ok,
            function: () => {
                this.navigateBack()
            }
        },
        noButton: {
            exposed: false,
        },
        alertMsg: ''
    }

    // Authentication Status Modal initial configuration
    @track authenticationPopup = {
        // Initial Authentication Status message
        authenticationStatus: '',
        // Authentication Status GIF
        authenticationSpinnergif: CB_AUTHENTICATION_FAILED,
        // Authentication Status open or close status
        openModal: false,
        // Authentication loading animation visibility
        showLoadingAnimation: false
    }

    // Method to handle form submission
    submitForm() {
        this.apiCallOut();
    }

    // Method to navigate back to previous page
    navigateBack() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: CB_Page_Servicerequest
            }
        });
    }

    /**
     * Fetch JSON data required for the component
     * Load prerequisites needed for initialization 
     */
    connectedCallback() {
        console.log(JSON.stringify(this.pageRef.state));
        this.fetchJsonData();
        this.loadPrerequisites()
        console.log(this.custId);
    }

    /**
     * Initializes necessary prerequisites for the component.
     * Generates a request UUID and retrieves customer ID from session storage.
     */
    loadPrerequisites() {
        this.requestUUID = dateToTimestamp();
        this.custId = getLocalStorage('CustomerId');
        this.customerName = getLocalStorage('CustomerName');
    }


    // variable to store api data
    apiName = 'CB_CAAccAdd'
    reqBody = '';
    jsonPathData = ''
    // field to map in api
    requestUUID = ''
    custId = ''
    currency = ''
    schmCode = ''
    branchId = '100'
    customerName = ''

    apiCallOut() {
        this.apiCalloutInProgress();
        this.reqBody = this.mapTheData(this.reqBody, this.jsonPathData);
        let wrapper = {
            payload: JSON.stringify(this.reqBody),
            metadataName: this.apiName,
            headers: null,
        }
        createCheckingAccount({ reqWrapper: wrapper })
            .then((result) => {
                console.log(result)
                this.apiCalloutSuccess(`Your Account (#${result}) Has Been Successfully Created.`)
            })
            .catch((error) => {
                console.error(error);
                if (error.body.message === '500') {
                    this.apiCalloutFailed('Technical Issue, Please Try Again Later')
                } else {
                    this.apiCalloutFailed(error.body.message)
                }
            })
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
        this.showModal = false
        // this.successModalconfig.isError = true
        // this.successModalconfig.errorTitle = this.toInitCap(errormsg)
        // this.successModalOpen = true
        
        this.authenticationPopup.authenticationStatus = this.toInitCap(errormsg)
        this.authenticationPopup.openModal = true;
        setTimeout(() => {
            // Removing the Authentication status modal 
            this.authenticationPopup.openModal = false;
            this.navigateBack();
        }, 3000)
    }
}