import { LightningElement } from 'lwc';
export default class CBCreateCommunityUser extends LightningElement {
            // FirstName = portalContact.FirstName,
            // LastName = portalContact.LastName,
            // Email = portalContact.Email,
            // Username = uniqueName + '@sfdc' + orgId + '.org',
            // EmailEncodingKey = 'ISO-8859-1',
            // Alias = uniqueName.substring(18, 23),
            // TimeZoneSidKey = 'America/Los_Angeles',
            // LocaleSidKey = 'en_US',
            // LanguageLocaleKey = 'en_US',
            // ProfileId = testProfile.Id,
            // ContactId = portalContact.Id,
            // Clarien_Username__c = 'RET2',
            // Clarien_password__c = 'infy@123'

    

    fName = ''
    lName = ''
    email = ''
    username = ''
    password = ''

    handleFirstname(event){
        this.fName = event.target.value
    }
    
    handleLastname(event){
        this.lName = event.target.value
    }
    
    handleEmail(event){
        this.email = event.target.value
    }
    
    handleUsername(event){
        this.username = event.target.value
    }
    
    handlePassword(event){
        this.password = event.target.value
    }
}