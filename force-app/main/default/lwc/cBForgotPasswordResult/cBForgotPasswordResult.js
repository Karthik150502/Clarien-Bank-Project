/*
	Author - Aditya
	Created Date - 06/03/2024
	Modified Date - 21/03/2024
	Description - This component imports custom labels from Salesforce, including messages for password changed, password successfully changed,
                and login. It simply shows a result indicating that the password change process was successful.
*/

// Importing the LightningElement base class from the lwc module
import { LightningElement } from 'lwc';

// Importing custom labels from Salesforce
import PASSWORD_CHANGED from '@salesforce/label/c.CB_PasswordChanged';
import PASSWORD_SUCC_CHANGED from '@salesforce/label/c.CB_PasswordSuccessfullyChanged'
import LOGIN from '@salesforce/label/c.CB_LogIn';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class ForgetPassword5 extends LightningElement {
    // Defining labels object to hold imported labels
    label = {
        PASSWORD_CHANGED,
        PASSWORD_SUCC_CHANGED,
        LOGIN
    }

    CBSuccessfull = `${CBSVG}/CBSVGs/CBSuccessfull.svg#CBSuccessfull`;
}