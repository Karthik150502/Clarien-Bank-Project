/*
	Author - Prateek Deshmukh
	Created Date - 08/03/2024
	Modified Date - 21/03/2024
	Description - Enhanced Error Display, Utilizing Reusable component with Custom Messages Passed from Parent Components
*/

import { LightningElement } from 'lwc';

import CBSVG from "@salesforce/resourceUrl/CBSVG"

export default class CBFieldError extends LightningElement {

	CBError = `${CBSVG}/CBSVGs/CBError.svg#CBError`;

}