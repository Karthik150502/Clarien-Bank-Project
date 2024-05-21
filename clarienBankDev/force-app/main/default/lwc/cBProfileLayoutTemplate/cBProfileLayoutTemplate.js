/*
     Author - Prateek Deshmukh
    Created Date - 2024-03-09
    Modified Date - 2024-03-10,2024-03-15,2024-03-21
    Description - The CBProfileLayoutTemplate component serves as a reusable template 
    for rendering various sections based on provided data.It facilitates dynamic navigation 
    and content display, showcasing specific sections like security settings, profile settings etc based on configured paramet
*/

import { LightningElement, api, wire } from 'lwc';

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

import LOANS from '@salesforce/label/c.CB_Loans';
import CARDS from '@salesforce/label/c.CB_Cards';
import CHEQUEBOOK from '@salesforce/label/c.CB_Chequebook';
import ISSUE_CHEQUE_BOOK from '@salesforce/label/c.CB_IssueChequeBook';
import VIEW_ISSUED_CHEQUES from '@salesforce/label/c.CB_ViewIssuedCheques';

//added by prateek
import uploadFile from '@salesforce/apex/CBProfileUploadHandler.uploadFile'
import getProfileDocId from '@salesforce/apex/CBProfileUploadHandler.getProfileDocId'



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

    // Default user information placeholders
    UserEmail = 'sampleEmail@email.com';
    UserPhone = '9876543210';
    UserPassword = '*********';

    // API properties for profile image and metadata information
    @api profileImg;
    @api metaInfo = {
        // Metadata fields are commented out for future implementation
    };

    // Properties for file upload functionality
    uploadResult;
    fileData;



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
        VIEW_ISSUED_CHEQUES
    };

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

    // Message subscription
    subscription = null;
    UserData = '';

    /**
     * Lifecycle hook invoked when the component is inserted into the DOM
     * Loads the profile image and retrieves dark mode preference when the component is connected to the DOM.
     * @returns {void}
     */
    connectedCallback() {
        this.loadProfileImage();
        this.getDarkMode();
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

    /**
  * Method to load the profile image asynchronously
  * Fetches the profile image document ID from the server and constructs the URL for the image.
  * @returns {void}
  */
    loadProfileImage() {
        // Call server to fetch profile image
        getProfileDocId()
            .then(result => {
                if (result.startsWith('Error:')) {
                    console.error('Error occurred while fetching profile image:', result);
                } else {
                    this.profileImg = '/sfc/servlet.shepherd/version/download/' + result;
                    this.refs.profile.style.backgroundImage = `url(${this.profileImg})`;
                }
            })
            .catch(error => {
                console.error('Error occurred while fetching profile image:', error);
            });
    }

    // Method to navigate to a named page
    // @param {string} pageName - The name of the page to navigate to
    navigateToPage(pageName) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageName
            }
        });
    }

    // Navigation method to navigate to previous page
    navigateToPreviousPage() {
        this.navigateToPage(this.metaInfo.previousPageUrl);
    }

    // Navigation method to navigate to profile settings page
    navigateToProfileSettings() {
        this.navigateToPage('CBProfileSettings__c');
    }

    // Navigation method to navigate to security settings page
    navigateToSecuritySettings() {
        this.navigateToPage('CBSecuritySettings__c');
    }

    // Navigation method to navigate to my profile page
    navigateToMyProfile() {
        this.navigateToPage('CBMyProfile__c');
    }

    // Navigation method to navigate to profile change password page
    navigateToProfileChangePassword() {
        this.navigateToPage('CBChangePassword__c');
    }

    // Navigation method to navigate to update phone page
    navigateToUpdatePhone() {
        this.navigateToPage('CBUpdatePhone__c');
    }

    // Navigation method to navigate to update email page
    navigateToUpdateEmail() {
        this.navigateToPage('CBUpdateEmail__c');
    }

    navigateToFavAccounts() {
        this.navigateToPage('CBFavoriteAccounts__c');
    }

    navigateToApplyNow() {
        this.navigateToPage('CBApplyNow__c');
    }

    navigateToFeedbackRateUs() {
        this.navigateToPage('CBFeedbackRateUs__c');
    }

    navigateToApplyLoans() {
        this.navigateToPage('CBApplyNowLoans__c');
    }

    navigateToApplyCards() {
        this.navigateToPage('CBApplyNowCards__c');
    }

    navigateToApplyCheque() {
        this.navigateToPage('CBApplyNowChequebook__c')
    }

    navigateToIssueChequebook() {
        this.navigateToPage('CBApplyNowIssueChequebook__c');
    }


    navigateToViewStopChecquebooks() {
        this.navigateToPage('CBViewStopIssuedCheques__c')
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
        const maxSizeInBytes = 500 * 1024; // 500KB
        if (file.size > maxSizeInBytes) {
            console.error("File size exceeds the limit of 500KB.");
            this.toast("File size exceeds the limit of 500KB.", Error);
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
                    } else {
                        console.error("Please upload an image with a 1:1 aspect ratio.");
                        this.toast("Please upload an image with a 1:1 aspect ratio.", Error);
                        return;
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
        const { base64, filename } = this.fileData;
        uploadFile({ base64, filename }).then(result => {
            this.fileData = null;
            let title = `${filename} uploaded successfully!!`;
            console.log('Title', title);
            this.toast(title, 'success');
        }).catch(error => {
            let title = `${filename} failed to upload!!`;
            console.log('Error:', error.message);
            this.toast(title, 'Error');
        });
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


    //variable to store darkmode value
    darkMode = false;
    /**
   * Handler method for toggling dark mode
   * Toggles the darkMode property and stores the preference in local storage.
   * @returns {void}
   */
    darkModeHandler() {
        console.log('dark mode stored');
        this.darkMode = !this.darkMode;
        this.storeDarkMode();
    }

    /**
    * Method to retrieve dark mode preference from local storage
    * Retrieves the dark mode preference from local storage if available.
    * @returns {void}
    */

    getDarkMode() {
        if (localStorage.ClarienBankDarkModeAvailable) {
            this.darkMode = localStorage.getItem('ClarienBankDarkMode');
        }
        console.log(JSON.stringify(localStorage));
    }
    /**
     * Method to store dark mode preference in local storage
     * Stores the dark mode preference in local storage.
     * @returns {void}
     */
    storeDarkMode() {
        if (this.darkMode) {
            localStorage.setItem('ClarienBankDarkMode', this.darkMode);
            localStorage.setItem('ClarienBankDarkModeAvailable', true);
        } else {
            localStorage.removeItem('ClarienBankDarkMode');
            localStorage.removeItem('ClarienBankDarkModeAvailable');
        }
    }

}