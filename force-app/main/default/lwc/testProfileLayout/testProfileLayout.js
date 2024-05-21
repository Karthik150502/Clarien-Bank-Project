import { LightningElement, api, wire } from 'lwc';

import LOGIN_FLOW_IMAGES from '@salesforce/resourceUrl/LoginFlowImages'

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
//added by prateek
import uploadFile from '@salesforce/apex/CBProfileUploadHandler.uploadFile'
import getProfileDocId from '@salesforce/apex/CBProfileUploadHandler.getProfileDocId'

// for lightning message service retrive message
import { subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';
import PROFILE_MSG_CHANNEL from '@salesforce/messageChannel/cBProfileMsgChannel__c';

//testing Svg 
import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBProfileLayoutTemplate extends NavigationMixin(LightningElement) {
    profileDefualtImage = LOGIN_FLOW_IMAGES + '/Images/defualtProfile.png'
    sitePrefixPath = basePath;
    hideInput = false;


    //test SVG
    cbBackIcon = `${CBSVG}/cbSVG/CBBackIcon.svg#CBBackIcon`
    CBCameraIcon = `${CBSVG}/cbSVG/CBCameraIcon.svg#CBCameraIcon`
    CBProfileSettings = `${CBSVG}/cbSVG/CBProfileSettings.svg#CBProfileSettings`
    CBEmailIcon = `${CBSVG}/cbSVG/CBEmailIcon.svg#CBEmailIcon`
    CBPhoneIcon = `${CBSVG}/cbSVG/CBPhoneIcon.svg#CBPhoneIcon`
    CBFavoriteAccounts = `${CBSVG}/cbSVG/CBFavoriteAccounts.svg#CBFavoriteAccounts`

    UserEmail = 'sampleEmail@email.com';
    UserPhone = '9876543210';
    UserPassword = '*********';

    @api profileImg
    @api metaInfo = {
        previousPageUrl: '',
        heading: '',
        profileInfo: true,
        profileSettings: {
            exposed: true
        },
        profile: {
            exposed: false
        },
        serviceRequest: {
            exposed: false
        },
        securitySettings: {
            exposed: false
        }
    }

    modalOpen = false
    modal = {
        title: 'log out',
        message: 'Are you sure you want to log out'
    }

    yesHandler() {
        console.log('yes');
        this.modalOpen = false
    }
    noHandler() {
        console.log('no');
        this.modalOpen = false
    }

    //added by prateek
    uploadResult;
    fileData;

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
        PASSWORD
    }

    @wire(MessageContext)
    messageContext;

    subscription = null;
    UserData = '';


    modalOpenHandler() {
        console.log("Modal opened!!")
        this.modalOpen = true;
    }


    subscribeToMessageChannel() {
        console.log("Subscription Started..!")
        this.subscription = subscribe(
            this.messageContext,
            PROFILE_MSG_CHANNEL,
            (message) => {
                console.log('message: ', message);
                this.handleMessage(message)

            }, { scope: APPLICATION_SCOPE }
        );

        console.log('subscribe method called', this.subscription);
    }

    handleMessage(message) {
        console.log('handle message method called');
        this.UserData = message.userData;
        console.log(this.UserData);
    }

    connectedCallback() {
        this.subscribeToMessageChannel();
        this.loadProfileImage();

    }

    loadProfileImage() {
        getProfileDocId()
            .then(result => {
                if (result.startsWith('Error:')) {
                    console.error('Error occurred while fetching profile image:', result);
                } else {
                    this.profileImg = '/sfc/servlet.shepherd/version/download/' + result;
                }
            })
            .catch(error => {
                console.error('Error occurred while fetching profile image:', error);
            });
    }
    navigateToPreviousPage() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: this.metaInfo.previousPageUrl
            }
        })
    }
    navigateToProfileSettings() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'CBProfileSettings__c'
            }
        })
    }
    navigateToSecuritySettings() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'CBSecuritySettings__c'
            }
        })
    }
    navigateToMyProfile() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'CBMyProfile__c'
            }
        })
    }
    navigateToProfileChangePassword() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'CBChangePassword__c'
            }
        })
    }
    navigateToUpdatePhone() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'CBUpdatePhone__c'
            }
        })
    }
    navigateToUpdateEmail() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'CBUpdateEmail__c'
            }
        })
    }


    logoutUser() {
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

    get profileDefault() {
        return `background-image: url(${this.profileImg})`;
    }

    //added by prateek

    uploadProfileImage() {
        const input = this.template.querySelector('input[type="file"]');
    }

    openfileUpload(event) {
        const file = event.target.files[0];
        if (!file) {
            console.error("No file selected.");
            return;
        }

        var reader = new FileReader();
        reader.onload = () => {
            try {
                var base64 = reader.result.split(',')[1];
                this.fileData = {
                    'filename': file.name,
                    'base64': base64,
                };
                console.log('This is file Data', this.fileData);
                // Move this inside onload callback
                this.handleClick();
            } catch (error) {
                console.log("Error occurred while processing the file:", error);
            }
        };
        reader.readAsDataURL(file);
    }


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

    toast(title, variant) {
        const toastEvent = new ShowToastEvent({
            title: title,
            variant: variant
        });
        this.dispatchEvent(toastEvent);
    }

}