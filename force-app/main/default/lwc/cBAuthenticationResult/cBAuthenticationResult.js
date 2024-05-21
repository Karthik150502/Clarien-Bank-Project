/*
	Author - Prateek Deshmukh
	Created Date - 15/03/2024
	Modified Date - 21/03/2024
	Description - This is the child component, tasked with showcasing authentication-related loading, 
                  success, or failure messages, all contingent on the provided data.
*/

import { LightningElement, api } from 'lwc';

export default class CBAuthenticationResult extends LightningElement {
	//  @api - Makes that variable/property to accepts values from the parent component in LWC
    @api status = '';	// Represents the current status
    @api loadingGif;	// Holds the URL of the loading GIF
    @api isLoading = false	// Indicates whether the component is currently in a loading state.
}