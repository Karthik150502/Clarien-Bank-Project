import { LightningElement } from 'lwc';
import getMFAResponse  from "@salesforce/apex/CBMFAController.getMFAResponse";
import sendAdHocMFARequest  from "@salesforce/apex/CBMFAController.sendMFARequest";

import { getJsonData, dateToTimestamp } from 'c/cBUtilities';

export default class CBMFAController extends LightningElement {

    timeoutId;
    sendAdHocMFAReqPayload = ''
    sendSignInMFAReqPayload=''
    sendAdHocMFAReqMdtApiName = 'CB_MFA_Adhoc_Post_Request';
    sendSignInMFAReqMdtApiName = 'CB_MFA_Signin_Post_Request';

    sendAdHocMFAReqJsonPaths = []
    sendSignInMFAReqJsonPaths = []

    MFARequestId=''
    MFARequestUUId=''

    getAdHocMFAResMdtApiName = 'CB_MFA_Adhoc_Get_Response'
    getSignInMFAResMdtApiName = 'CB_MFA_SignIn_Get_Response'

    username = 'sflood20'
    requestUUID = ''
    MFARequestId = ''

    connectedCallback(){
            this.getMFAJsonBody()
            this.getSignInMFAJsonBody()
    }
    //Should be called in connectedCallback()
    getMFAJsonBody() {
        //this.username = getMobileSessionStorage("CBUsername");
        this.requestUUID = dateToTimestamp()

        getJsonData(this.sendAdHocMFAReqMdtApiName)
            .then((result) => {
                this.sendAdHocMFAReqPayload = JSON.parse(result[0])
                this.sendAdHocMFAReqJsonPaths = result[1]
                this.sendAdHocMFAReqPayload = this.mapTheData(this.sendAdHocMFAReqPayload, this.sendAdHocMFAReqJsonPaths);
            }).catch((error) => {
                console.log("Could not get the Json/ Path Data;\n")
                console.error(error);
            })
    }

    getSignInMFAJsonBody() {
        //this.username = getMobileSessionStorage("CBUsername");
        this.requestUUID = dateToTimestamp()

        getJsonData(this.sendSignInMFAReqMdtApiName)
            .then((result) => {
                this.sendSignInMFAReqPayload = JSON.parse(result[0])
                this.sendSignInMFAReqJsonPaths = result[1]
                this.sendSignInMFAReqPayload = this.mapTheData(this.sendSignInMFAReqPayload, this.sendSignInMFAReqJsonPaths);
            }).catch((error) => {
                console.log("Could not get the Json/ Path Data;\n")
                console.error(error);
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
        console.log(jsonReq)
        console.log(JsonPath)
        JsonPath.forEach((record) => {
            // Dynamically set values in JSON request object
            eval(`jsonReq${record.JSON_Path__c}=this.${record.Field_Name__c};`);
        });
        console.log('jsonReq : ', JSON.stringify(jsonReq));
        return jsonReq;
    }

    initiateAdHocMFA() {
        let reqWrapper = {
            payload: JSON.stringify(this.sendAdHocMFAReqPayload), // Ensure payload is a string
            metadataName: this.sendAdHocMFAReqMdtApiName,
            headers: ''  // Provide metadata name
        };
        sendAdHocMFARequest({ reqWrapper: reqWrapper })
            .then((result) => {
                console.log('MFARes response:', result);
                let reqWrapper = {
                    payload: null, // Ensure payload is a string
                    metadataName: this.getAdHocMFAResMdtApiName,
                    headers: ''  // Provide metadata name
                };
                let mfaRequest = {
                    requestUUID:  JSON.parse(result)?.requestUUID,
                    MFARequestId:JSON.parse(result)?.id,
                    headers: ''
                };

                return this.pollForMFAResponse(reqWrapper,mfaRequest);
            })
            .catch(error => {
                console.error(error);
            });
    }

    initiateSignInMFA () {
        let reqWrapper = {
            payload: JSON.stringify(this.sendSignInMFAReqPayload), // Ensure payload is a string
            metadataName: this.sendSignInMFAReqMdtApiName,
            headers: ''  // Provide metadata name
        };
        sendAdHocMFARequest({ reqWrapper: reqWrapper })
            .then((result) => {
                console.log('sendAdHocMFARequest response:', result);
                let reqWrapper = {
                    payload: null, // Ensure payload is a string
                    metadataName: this.getSignInMFAResMdtApiName,
                    headers: ''  // Provide metadata name
                };
                let mfaRequest = {
                    requestUUID:  JSON.parse(result)?.requestUUID,
                    MFARequestId:JSON.parse(result)?.id,
                    headers: ''
                };
                return this.pollForMFAResponse(reqWrapper,mfaRequest);
            })
            .catch(error => {
                console.error(error);
            });
    }


    pollForMFAResponse(reqWrapper,mfaRequest) {
        getMFAResponse({ reqWrapper: reqWrapper, mfaRequest: mfaRequest })
            .then(response => {
                if (response === 'Waiting') {
                    this.timeoutId = setTimeout(() => {
                        console.log('MFA response:', response);
                        this.pollForMFAResponse(reqWrapper,mfaRequest);
                    }, 2000); // call again after 3 seconds
                } else {
                    // handle non-Waiting response
                    console.log('MFA response:', response);
                    return response;
                }
            })
            .catch(error => {
                console.error(error);
            });

        // stop polling after 60 seconds
        setTimeout(() => {
            clearTimeout(this.timeoutId);
            return 'TimeOut'
        }, 30000);
    }
    
 
}