import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

// import CBSVG from "@salesforce/resourceUrl/profileLayoutTemplateSVG";
import CBSVG from "@salesforce/resourceUrl/CBSVG";

export default class CBServiceRequestModal extends NavigationMixin(LightningElement) {

    CBBackIcon = `${CBSVG}/CBSVGs/CBBackIcon.svg#CBBackIcon`;
    CBSecuritySettings = `${CBSVG}/CBSVGs/CBSecuritySettings.svg#CBSecuritySettings`;

    closeNavigate(){
        if(this.modifyDebitCardLimit){
            this.openModifyDebitCardLimit();
        }
        else{
            this.navigateBack('CBServiceRequest__c')
        }
    }

    modifyDebitCardLimit = false;

    openModifyDebitCardLimit() {
        this.modifyDebitCardLimit = !this.modifyDebitCardLimit
    }

    debitCardLimit = [
        {
            limit: 'BMD 1000.00'
        },
        {
            limit: 'BMD 2000.00'
        },
        {
            limit: 'BMD 3000.00'
        },
        {
            limit: 'BMD 4000.00'
        },
        {
            limit: 'BMD 5000.00'
        },
        {
            limit: 'BMD 6000.00'
        }
    ]

    cardLimit = this.debitCardLimit[0].limit

    cardLimitHandler(event){
        this.cardLimit = event.target.value;
        console.log(this.cardLimit)
    }

    submitForm(event){
        event.preventDefault();
        console.log(this.cardLimit);
        this.closeNavigate()
    }

    navigateToTravelNotification() {
        this.navigateBack('CBTravelNotification__c')
    }

    navigateBack(pageName) {
        console.log('navigate called');
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: pageName
            }
        });
    }

}