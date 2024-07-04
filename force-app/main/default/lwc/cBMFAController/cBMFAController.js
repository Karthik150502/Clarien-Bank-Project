import { LightningElement } from 'lwc';
import getMFAResponse  from "@salesforce/apex/CBMFAController.getMFAResponse";
import sendAdHocMFARequest  from "@salesforce/apex/CBMFAController.sendMFARequest";

import { getJsonData, dateToTimestamp } from 'c/cBUtilities';

export default class CBMFAController extends LightningElement {

    timeoutId;
    sendMFAReqPayload = ''
    sendSignInMFAReqPayload=''
    sendMFAReqMdtApiName = 'CB_MAuth_Post_Request';
    sendSignInMFAReqMdtApiName = 'CB_MSignIn_Post_Request';

    sendMFAReqJsonPaths = []
    sendSignInMFAReqJsonPaths = []

    MFARequestId=''
    MFARequestUUId=''

    getMFAResMdtApiName = 'CB_MAuth_Get_Response'
    username = 'rameshac12'
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

        getJsonData(this.sendMFAReqMdtApiName)
            .then((result) => {
                this.sendMFAReqPayload = JSON.parse(result[0])
                this.sendMFAReqJsonPaths = result[1]
                this.sendMFAReqPayload = this.mapTheData(this.sendMFAReqPayload, this.sendMFAReqJsonPaths);
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

    initiateMFA() {
        let reqWrapper = {
            payload: JSON.stringify(this.sendMFAReqPayload), // Ensure payload is a string
            metadataName: this.sendMFAReqMdtApiName,
            headers: ''  // Provide metadata name
        };
        sendAdHocMFARequest({ reqWrapper: reqWrapper })
            .then((result) => {
                console.log('sendAdHocMFARequest response:', result);
               let requestResult =JSON.parse(result);
                this.MFARequestId = requestResult.id
                this.MFARequestUUId=requestResult.requestUUID
                return this.pollForMFAResponse();
            })
            .catch(error => {
                console.error(error);
            });
    }

    initiateSignInMFA() {
        let reqWrapper = {
            payload: JSON.stringify(this.sendSignInMFAReqPayload), // Ensure payload is a string
            metadataName: this.sendSignInMFAReqMdtApiName,
            headers: ''  // Provide metadata name
        };
        sendAdHocMFARequest({ reqWrapper: reqWrapper })
            .then((result) => {
                console.log('sendAdHocMFARequest response:', result);
               let requestResult =JSON.parse(result);
                this.MFARequestId = requestResult.id
                this.MFARequestUUId=requestResult.requestUUID
                return this.pollForMFAResponse();
            })
            .catch(error => {
                console.error(error);
            });
    }

    pollForMFAResponse() {
        let result;
        let reqWrapper = {
            payload: null, // Ensure payload is a string
            metadataName: this.getMFAResMdtApiName,
            headers: ''  // Provide metadata name
        };

        let mfaRequest = {
            requestUUID: this.MFARequestUUId,
            MFARequestId: this.MFARequestId,
            headers: ''
        };

        getMFAResponse({ reqWrapper: reqWrapper, mfaRequest: mfaRequest })
            .then(response => {
                if (response === 'Waiting') {
                    this.timeoutId = setTimeout(() => {
                        console.log('MFA response:', response);
                        this.pollForMFAResponse();
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