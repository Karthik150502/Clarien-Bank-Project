import { LightningElement,api } from 'lwc';
// import CBSVG from "@salesforce/resourceUrl/cbSVG"
// import COMPANYLOGO from "@salesforce/resourceUrl/CBCompanyLogo"

export default class CBNavigationMenu extends LightningElement {

    @api profilePic

    // CBProfileSettings = `${CBSVG}/cbSVG/CBProfileSettings.svg#CBProfileSettings`;
    // CBSecuritySettings = `${CBSVG}/cbSVG/CBSecuritySettings.svg#CBSecuritySettings`;
    // CBServiceRequest = `${CBSVG}/cbSVG/CBServiceRequest.svg#CBServiceRequest`;
    // CBApplyNow = `${CBSVG}/cbSVG/CBApplyNow.svg#CBApplyNow`;
    // CBFeedbackRateUs = `${CBSVG}/cbSVG/CBFeedbackRateUs.svg#CBFeedbackRateUs`;

    closeMainSetting(){
        this.dispatchEvent(new CustomEvent("close"))
    }

    label = {
        PROFILE_SETTINGS : 'Profile Settings',
        SECURITY_SETTINGS : 'Security Settings',
        SERVICE_REQUEST : 'Service Request',
        APPLY_NOW : 'Apply Now',
        FEEDBACK_RATE_US : 'Feedback/Rate Us',
    };
}