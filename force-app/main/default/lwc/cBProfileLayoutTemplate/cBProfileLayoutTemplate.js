/*
     Author - Prateek Deshmukh
    Created Date - 2024-03-09
    Modified Date - 2024-03-10,2024-03-15,2024-03-21
    Description - The CBProfileLayoutTemplate component serves as a reusable template 
    for rendering various sections based on provided data.It facilitates dynamic navigation 
    and content display, showcasing specific sections like security settings, profile settings etc based on configured paramet
*/

import { LightningElement, api, wire, track } from 'lwc';


import CB_AUTHENTICATION_SUCCESS from '@salesforce/resourceUrl/CBAutenticationSuccess';
import AUTHENTICATION_SUCCESSFUL_MESSAGE from '@salesforce/label/c.CB_Authentication_Successful';


import LOGIN_FLOW_IMAGES from '@salesforce/resourceUrl/LoginFlowImages'
// import CBSVG from "@salesforce/resourceUrl/profileLayoutTemplateSVG";
import CBSVG from "@salesforce/resourceUrl/CBSVG";

import isGuest from "@salesforce/user/isGuest";
import basePath from "@salesforce/community/basePath";
import { NavigationMixin } from 'lightning/navigation';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import PROFILE_SETTINGS from '@salesforce/label/c.CB_ProfileSettings';
import CHANGE_PASSWORD from '@salesforce/label/c.CB_ChangePassword';
import PASSWORD from '@salesforce/label/c.CB_Password';
import FAVORITE_ACCOUNTS from '@salesforce/label/c.CB_FavoriteAccounts';
import ONLINE_ACTIVITES from '@salesforce/label/c.CB_OnlineActivites';
import SECURITY_SETTINGS from '@salesforce/label/c.CB_SecuritySettings';
import SERVICE_REQUEST from '@salesforce/label/c.CB_ServiceRequest';
import APPLY_NOW from '@salesforce/label/c.CB_ApplyNow';
import FEEDBACK_RATE_US from '@salesforce/label/c.CB_FeedbackRateUs';
import TIME_DEPOSIT_ACCOUNT_OPENING from '@salesforce/label/c.CB_TimeDepositAccountOpening';
import TOP_UP_ACCOUNT_OPENING from '@salesforce/label/c.CB_Top_UpAccountOpening';
import SAVINGS_ACCOUNT_OPENING from '@salesforce/label/c.CB_SavingsAccountOpening';
import CHEQUING_ACCOUNT_OPENING from '@salesforce/label/c.CB_ChequingAccountOpening';
import STOP_PAPER_BASED_STATEMENTS from '@salesforce/label/c.CB_StopPaperBasedStatements';
import SCHEDULE_AN_RM_APPOINTMENT from '@salesforce/label/c.CB_ScheduleAnRmAppointment';
import REQUEST_A_DRAFT from '@salesforce/label/c.CB_RequestADraft';
import CARD_SERVICES from '@salesforce/label/c.CB_CardServices';
import LOGOUT from '@salesforce/label/c.CB_Logout';
import DARK_THEME from '@salesforce/label/c.CB_DarkTheme'
import BIO_METRIC from '@salesforce/label/c.CB_BioMetric'
import SOFT_TOKEN_HARD_TOKEN from '@salesforce/label/c.CB_SoftTokenHardToken'
import EMAIL from '@salesforce/label/c.CB_Email';
import PHONE from '@salesforce/label/c.CB_Phone';
import LOGOUT_CONFIRM_MESSAGE from '@salesforce/label/c.CB_Logout_Confirm_Message';
import { getBiometricsService } from 'lightning/mobileCapabilities';

import LOANS from '@salesforce/label/c.CB_Loans';
import CARDS from '@salesforce/label/c.CB_Cards';
import CHEQUEBOOK from '@salesforce/label/c.CB_Chequebook';
import ISSUE_CHEQUE_BOOK from '@salesforce/label/c.CB_IssueChequeBook';
import VIEW_ISSUED_CHEQUES from '@salesforce/label/c.CB_ViewIssuedCheques';


// import uploadFile from '@salesforce/apex/CBProfileUploadHandler.uploadFile'
// import getProfileDocId from '@salesforce/apex/CBProfileUploadHandler.getProfileDocId'
import { getJsonData, dateToTimestamp, setMobileSessionStorage, getMobileSessionStorage, setLocalStorage, getLocalStorage, removeLocalStorage } from 'c/cBUtilities';



// Community Page labels
import PROFILESETTINGS_PAGE from '@salesforce/label/c.CB_Page_Profilesettings';
import SECURITYSETTINGS_PAGE from '@salesforce/label/c.CB_Page_Securitysettings';
import SERVICEREQUEST_PAGE from '@salesforce/label/c.CB_Page_Servicerequest';
import MYPROFILE_PAGE from '@salesforce/label/c.CB_Page_Myprofile';
import CHANGEPASSWORD_PAGE from '@salesforce/label/c.CB_Page_Changepassword';
import UPDATEEMAIL_PAGE from '@salesforce/label/c.CB_Page_Updateemail';
import UPDATEPHONE_PAGE from '@salesforce/label/c.CB_Page_Updatephone';
import FAVORITEACCOUNTS_PAGE from '@salesforce/label/c.CB_Page_Favoriteaccounts';
import APPLYNOW_PAGE from '@salesforce/label/c.CB_Page_Applynow';
import FEEDBACKRATEUS_PAGE from '@salesforce/label/c.CB_Page_Feedbackrateus';
import APPLYNOWLOANS_PAGE from '@salesforce/label/c.CB_Page_CBApplynowloans';
import APPLYNOWCARDS_PAGE from '@salesforce/label/c.CB_Page_Applynowcards';
import APPLYNOWCHEQUEBOOK_PAGE from '@salesforce/label/c.CB_Page_Applynowchequebook';
import APPLYNOWISSUECHEQUEBOOK_PAGE from '@salesforce/label/c.CB_Page_Applynowissuechequebook';
import REQUESTDRAFT_PAGE from '@salesforce/label/c.CB_Page_Requestdraft';
import SCHEDULEANRMAPPOINTMENT_PAGE from '@salesforce/label/c.CB_Page_Scheduleanrmappointment';
import STOPPAPERBASEDSTATEMENTS_PAGE from '@salesforce/label/c.CB_Page_Stoppaperbasedstatements';
import TIMEDEPOSITACCOUNTOPENING_PAGE from '@salesforce/label/c.CB_Page_Timedepositaccountopening';
import TOPUPACCOUNTOPENING_PAGE from '@salesforce/label/c.CB_Page_Topupaccountopening';
import VIEWSTOPISSUEDCHEQUES_PAGE from '@salesforce/label/c.CB_Page_Viewstopissuedcheques';
import MAKE_A_REQUEST from '@salesforce/label/c.MAKE_A_REQUEST';
import OPEN_AN_Account from '@salesforce/label/c.OPEN_AN_Account';



/**
 * Lightning web component representing a profile layout template with navigation capabilities.
 */
export default class CBProfileLayoutTemplate extends NavigationMixin(LightningElement) {
    // Default profile image path
    profileDefualtImage = LOGIN_FLOW_IMAGES + '/Images/defualtProfile.png';
    // Base path for site prefix
    sitePrefixPath = basePath;
    // Flag to hide input elements
    hideInput = false;
    //flag to hide the logout modal
    modalOpen = false;

    status;
    biometricsService;
    isAvailable = false;

    // Default user information placeholders
    UserPassword = '*********';

    // API properties for profile image and metadata information
    @api profileImg;
    @api metaInfo = {
        // Metadata fields are commented out for future implementation
    };

    // Properties for file upload functionality
    uploadResult;
    fileData;
    imageSrc = false;
    init = ''

    // Labels for UI elements
    label = {
        PROFILE_SETTINGS,
        CHANGE_PASSWORD,
        FAVORITE_ACCOUNTS,
        ONLINE_ACTIVITES,
        SECURITY_SETTINGS,
        SERVICE_REQUEST,
        APPLY_NOW,
        FEEDBACK_RATE_US,
        LOGOUT,
        TIME_DEPOSIT_ACCOUNT_OPENING,
        TOP_UP_ACCOUNT_OPENING,
        SAVINGS_ACCOUNT_OPENING,
        CHEQUING_ACCOUNT_OPENING,
        STOP_PAPER_BASED_STATEMENTS,
        SCHEDULE_AN_RM_APPOINTMENT,
        REQUEST_A_DRAFT,
        CARD_SERVICES,
        DARK_THEME,
        BIO_METRIC,
        SOFT_TOKEN_HARD_TOKEN,
        PASSWORD,
        EMAIL,
        PHONE,
        LOANS,
        CARDS,
        CHEQUEBOOK,
        ISSUE_CHEQUE_BOOK,
        VIEW_ISSUED_CHEQUES,
        MAKE_A_REQUEST,
        OPEN_AN_Account
    };

    // Authentication Status Modal initial configuration
    @track authenticationPopup = {
        // Initial Authentication Status message
        authenticationStatus: AUTHENTICATION_SUCCESSFUL_MESSAGE,
        // Authentication Status GIF
        authenticationSpinnergif: this.successGif,
        // Authentication Status open or close status
        openModal: false,
        // Authentication loading animation visibility
        showLoadingAnimation: true
    }
    successGif = CB_AUTHENTICATION_SUCCESS



    //SVG's from static resource
    CBCardServices = `${CBSVG}/CBSVGs/CBCardServices.svg#CBCardServices`;
    CBCardServices = `${CBSVG}/CBSVGs/CBCardServices.svg#CBCardServices`;
    CBRequestADraft = `${CBSVG}/CBSVGs/CBRequestADraft.svg#CBRequestADraft`;
    CBScheduleAnRmAppointment = `${CBSVG}/CBSVGs/CBScheduleAnRmAppointment.svg#CBScheduleAnRmAppointment`;
    CBStopPaperBasedStatements = `${CBSVG}/CBSVGs/CBStopPaperBasedStatements.svg#CBStopPaperBasedStatements`;
    CBChequingAccountOpening = `${CBSVG}/CBSVGs/CBChequingAccountOpening.svg#CBChequingAccountOpening`;
    CBSavingsAccountOpening = `${CBSVG}/CBSVGs/CBSavingsAccountOpening.svg#CBSavingsAccountOpening`;
    CBTopUpAccountOpening = `${CBSVG}/CBSVGs/CBTopUpAccountOpening.svg#CBTopUpAccountOpening`;
    CBTimeDepositAccountOpening = `${CBSVG}/CBSVGs/CBTimeDepositAccountOpening.svg#CBTimeDepositAccountOpening`;
    CBSoftTokenHardToken = `${CBSVG}/CBSVGs/CBSoftTokenHardToken.svg#CBSoftTokenHardToken`;
    CBBioMetric = `${CBSVG}/CBSVGs/CBBioMetric.svg#CBBioMetric`;
    CBDarkTheme = `${CBSVG}/CBSVGs/CBDarkTheme.svg#CBDarkTheme`;
    CBOnlineActivites = `${CBSVG}/CBSVGs/CBOnlineActivites.svg#CBOnlineActivites`;
    CBProfileSettings = `${CBSVG}/CBSVGs/CBProfileSettings.svg#CBProfileSettings`;
    CBSecuritySettings = `${CBSVG}/CBSVGs/CBSecuritySettings.svg#CBSecuritySettings`;
    CBServiceRequest = `${CBSVG}/CBSVGs/CBServiceRequest.svg#CBServiceRequest`;
    CBApplyNow = `${CBSVG}/CBSVGs/CBApplyNow.svg#CBApplyNow`;
    CBFeedbackRateUs = `${CBSVG}/CBSVGs/CBFeedbackRateUs.svg#CBFeedbackRateUs`;
    CBLogout = `${CBSVG}/CBSVGs/CBLogout.svg#CBLogout`;
    CBEmailIcon = `${CBSVG}/CBSVGs/CBEmailIcon.svg#CBEmailIcon`;
    CBPhoneIcon = `${CBSVG}/CBSVGs/CBPhoneIcon.svg#CBPhoneIcon`;
    CBPassword = `${CBSVG}/CBSVGs/CBPassword.svg#CBPassword`;
    CBBackIcon = `${CBSVG}/CBSVGs/CBBackIcon.svg#CBBackIcon`;
    CBRightArrow = `${CBSVG}/CBSVGs/CBRightArrow.svg#CBRightArrow`;
    CBCameraIcon = `${CBSVG}/CBSVGs/CBCameraIcon.svg#CBCameraIcon`;
    CBLoans = `${CBSVG}/CBSVGs/CBLoans.svg#CBLoans`;
    CBCards = `${CBSVG}/CBSVGs/CBCards.svg#CBCards`;
    CBChequebook = `${CBSVG}/CBSVGs/CBChequebook.svg#CBChequebook`;
    CBIssueChequeBook = `${CBSVG}/CBSVGs/CBIssueChequeBook.svg#CBIssueChequeBook`;
    CBViewStopIssuedCheques = `${CBSVG}/CBSVGs/CBViewStopIssuedCheques.svg#CBViewStopIssuedCheques`;

    username = '';
    lastLoginTime = '';
    isBiometricEnabled = false

    /**
     * Lifecycle hook invoked when the component is inserted into the DOM
     * Loads the profile image and retrieves dark mode preference when the component is connected to the DOM.
     * @returns {void}
     */
    connectedCallback() {
        this.getCustomerData();
        this.loadProfileImage();
        // this.biometricsService = getBiometricsService();
        //console.log('biometricsService ---' + this.biometricsService.isAvailable());
        this.updateBiomtericStatus()
        console.log('MetaInfo----' + this.metaInfo.securitySettings.exposed);
        this.loadNameInit();
    }
    hasRendered = false
    renderedCallback() {
        if (!this.hasRendered) {
            this.hasRendered = true
        }
    }
    getCustomerData() {
        this.username = getMobileSessionStorage('CustomerName');
        this.lastLoginTime = getMobileSessionStorage('LastLogin');
    }


    // Define modal data for the popup to confirm logout action
    modal = {
        title: LOGOUT_CONFIRM_MESSAGE,
        message: '',
        yesButton: {
            exposed: true,
            label: "Yes",
            implementation: () => {

                // Get the current domain
                let domain = window.location.href;

                // Find the index of "/s"
                let index = domain.indexOf("/s");

                if (index !== -1) {
                    // Remove everything till "/s"
                    domain = domain.substring(0, index);
                }

                console.log('Logout link:', `${domain}/secur/logout.jsp`);
                window.location.href = `${domain}/secur/logout.jsp`;
            }
        },
        noButton: {
            exposed: true,
            label: "Cancel",
            implementation: () => {
                console.log('no');
                this.modalOpen = false
            }
        },
    }

    loadNameInit() {
        if(!this.username) {
            return;
        }
        let wrds = this.username.split(/\s+/);
        wrds.forEach(element => {
            this.init += element.charAt(0).toUpperCase();
        });
    }

    /**
  * Method to load the profile image asynchronously
  * Fetches the profile image document ID from the server and constructs the URL for the image.
  * @returns {void}
  */
    loadProfileImage() {
        // Call server to fetch profile image
        // getProfileDocId()
        //     .then(result => {
        //         if (result.startsWith('Error:')) {
        //             console.error('Error occurred while fetching profile image:', result);
        //         } else {
        //             this.profileImg = '/sfc/servlet.shepherd/version/download/' + result;
        //             this.refs.profile.style.backgroundImage = `url(${this.profileImg})`;
        //         }
        //     })
        //     .catch(error => {
        //         console.error('Error occurred while fetching profile image:', error);
        //     });
    }

    // Method to navigate to a named page
    // @param {string} pageName - The name of the page to navigate to
    navigateToPage(pageName, data = {}) {
        console.log('navigate called', data);
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageName
            },
            state: data
        });
    }



    // Navigation method to navigate to previous page
    navigateToPreviousPage() {
        this.navigateToPage(this.metaInfo.previousPageUrl);
    }

    // Navigation method to navigate to profile settings page
    navigateToProfileSettings() {
        this.navigateToPage(PROFILESETTINGS_PAGE);
    }

    // Navigation method to navigate to security settings page
    navigateToSecuritySettings() {
        this.navigateToPage(SECURITYSETTINGS_PAGE);
    }

    // Navigation method to navigate to Service Request page
    navigateToServiceRequest() {
        this.navigateToPage(SERVICEREQUEST_PAGE);
    }

    // Navigation method to navigate to my profile page
    navigateToMyProfile() {
        this.navigateToPage(MYPROFILE_PAGE);
    }

    // Navigation method to navigate to profile change password page
    navigateToProfileChangePassword() {
        this.navigateToPage(CHANGEPASSWORD_PAGE);
    }

    // Navigation method to navigate to update phone page
    navigateToUpdatePhone() {
        this.authenticationPopup.openModal = true
        console.log('Modal Load');
        setTimeout(() => {
            this.authenticationPopup.openModal = false;
            console.log('Modal unload');
            this.navigateToPage(UPDATEPHONE_PAGE, { 'email': this.metaInfo.email, 'phone': this.metaInfo.phone });
        }, 500)

    }

    // Navigation method to navigate to update email page
    navigateToUpdateEmail() {
        this.authenticationPopup.openModal = true
        console.log('Modal Load');
        setTimeout(() => {
            this.authenticationPopup.openModal = false;
            console.log('Modal unload');
            this.navigateToPage(UPDATEEMAIL_PAGE, { 'email': this.metaInfo.email, 'phone': this.metaInfo.phone });
        }, 500)

    }

    // Navigation method to navigate to Online Activities
    navigateToOnlineActivities() {
        this.navigateToPage('CBOnlineActivities__c');
    }

    // Navigation method to navigate to All Accounts page
    navigateToFavAccounts() {
        this.navigateToPage(FAVORITEACCOUNTS_PAGE);
    }

    // Navigation method to navigate to Apply Now page
    navigateToApplyNow() {
        this.navigateToPage(APPLYNOW_PAGE);
    }

    // Navigation method to navigate to Feedback Rate Us page
    navigateToFeedbackRateUs() {
        this.navigateToPage(FEEDBACKRATEUS_PAGE);
    }

    // Navigation method to navigate to Apply Loans page
    navigateToApplyLoans() {
        this.navigateToPage(APPLYNOWLOANS_PAGE);
    }

    // Navigation method to navigate to Apply Cards page
    navigateToApplyCards() {
        this.navigateToPage(APPLYNOWCARDS_PAGE);
    }

    // Navigation method to navigate to Apply Cheque page
    navigateToApplyCheque() {
        this.navigateToPage(APPLYNOWCHEQUEBOOK_PAGE)
    }

    // Navigation method to navigate to Issue Cheque book page
    navigateToIssueChequebook() {
        this.navigateToPage(APPLYNOWISSUECHEQUEBOOK_PAGE);
    }

    // Navigation method to navigate to View Stop Checque books page
    navigateToViewStopChecquebooks() {
        this.navigateToPage(VIEWSTOPISSUEDCHEQUES_PAGE)
    }

    // Navigation method to navigate to Time Deposit Account Opening page
    navigateToTimeDepositAccountOpening() {
        this.navigateToPage(TIMEDEPOSITACCOUNTOPENING_PAGE)
    }

    // Navigation method to navigate to TopUp Account Opening page
    navigateToTopUpAccountOpening() {
        this.navigateToPage(TOPUPACCOUNTOPENING_PAGE);
    }

    // Navigation method to navigate to Stop Paper Based Statements page
    navigateToStopPaperBasedStatements() {
        this.navigateToPage(STOPPAPERBASEDSTATEMENTS_PAGE);
    }

    // Navigation method to navigate to Schedule An RMAppointment page
    navigateToScheduleAnRMAppointment() {
        this.navigateToPage(SCHEDULEANRMAPPOINTMENT_PAGE);
    }

    // Navigation method to navigate to Request a Draft page
    navigateToRequestDraft() {
        this.navigateToPage(REQUESTDRAFT_PAGE);
    }

    /**
     * Method to Card Service - Modify Debit Card Limit, Travel Notification
     * This method sets the serviceRequestModal property to true, triggering the display of the Card Service modal.
     * @returns {void}
    */
    serviceRequestModal = false
    openServiceRequestModal() {
        this.serviceRequestModal = !this.serviceRequestModal;
    }

    /**
     * Method to confirm user logout
     * This method sets the modalOpen property to true, triggering the display of the confirmation modal.
     * @returns {void}
     */
    logoutUser() {
        this.modalOpen = true;
    }

    // Getter method for profile default background image
    get profileDefault() {
        return `background-image: url(${this.profileImg})`;
    }

    /**
    * Method to handle file upload dialog
    * @param {Event} event - The event object representing the file upload event
    * @returns {void}
    */
    openfileUpload(event) {
        const file = event.target.files[0];
        if (!file) {
            console.error("No file selected.");
            return;
        }

        var reader = new FileReader();
        reader.onload = () => {
            try {
                var img = new Image();
                img.onload = () => {
                    if (img.width === img.height) {
                        var base64 = reader.result.split(',')[1];
                        this.fileData = {
                            'filename': file.name,
                            'base64': base64,
                        };
                        console.log('This is file Data', this.fileData);
                        this.handleClick();
                    }
                };
                img.src = URL.createObjectURL(file);
            } catch (error) {
                console.log("Error occurred while processing the file:", error);
            }
        };
        reader.readAsDataURL(file);
    }


    /**
         * Method to handle file upload of profile image
         * Uploads the profile image file to the server.
         * @returns {void}
         */
    handleClick() {
        if (!this.fileData) {
            console.log("File data is not initialized.");
            return;
        }
        // const { base64, filename } = this.fileData;
        // uploadFile({ base64, filename }).then(result => {
        //     this.fileData = null;
        //     let title = `${filename} uploaded successfully!!`;
        //     console.log('Title', title);
        //     this.toast(title, 'success');
        // }).catch(error => {
        //     let title = `${filename} failed to upload!!`;
        //     console.log('Error:', error.message);
        //     this.toast(title, 'Error');
        // });
    }

    /**
 * Method to display toast message
 * @param {string} title - The title of the toast message
 * @param {string} variant - The variant of the toast message (e.g., 'success', 'error', 'warning', 'info')
 * @returns {void}
 */
    toast(title, variant) {
        const toastEvent = new ShowToastEvent({
            title: title,
            variant: variant
        });
        this.dispatchEvent(toastEvent);
    }


    isBiometricEnabled = false
    updateBiomtericStatus() {
        if (getLocalStorage('CBIsBiometricEnabled')) {
            this.isBiometricEnabled = getLocalStorage('CBIsBiometricEnabled') === 'true'
            console.log('this.isBiometricEnabled = ' + getLocalStorage('CBIsBiometricEnabled'))
        }
    }

    handleVerifyClick() {
        this.isBiometricEnabled = !this.isBiometricEnabled
        setLocalStorage('CBIsBiometricEnabled', this.isBiometricEnabled)
        console.log('this.isBiometricEnabled = ' + getLocalStorage('CBIsBiometricEnabled'))



        const biometricsService = getBiometricsService();
        console.log('biometricsService', biometricsService);
        if (biometricsService.isAvailable()) {
            console.log('inbiometric', biometricsService);
            this.status = 'withinbiometric' + biometricsService;
        }
        else {
            console.log('elsebiometric', biometricsService);
            this.status = 'elsebiometric' + biometricsService;
        }
    }


}