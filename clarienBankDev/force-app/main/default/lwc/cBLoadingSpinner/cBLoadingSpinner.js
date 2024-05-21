import { LightningElement, api } from 'lwc';

export default class CBLoadingSpinner extends LightningElement {
    //  @api - Makes that variable/property to accepts values from the parent component in LWC
    @api isLoading = false	// Indicates whether the component is currently in a loading state.
}