import { LightningElement, wire } from 'lwc';
import buildUpdatedJSON from '@salesforce/apex/JSONBuilder.buildUpdatedJSON';

export default class JsonBuilderTest extends LightningElement {
    updatedJsonString;
     originalJsonString = '{"name":"John Doe","age":30,"address":{"street":"123 Main St","city":"Anytown","postalCode":"12345"},"contacts":[{"type":"email","value":"john.doe@example.com"},{"type":"phone","value":"555-1234"}],"orders":[{"id":"001","products":[{"name":"Product A","price":10.99},{"name":"Product B","price":20.49}]},{"id":"002","products":[{"name":"Product C","price":15.99}]}]}';
   //originalJsonString = '{"name":"John Doe","age":30}';

    handleClick() {

        // Create a map with key-value pairs to update JSON
        const keyValueMap = {
            "name": "john cena",
            "age": "45"
        }
 
        // Call the Apex method and pass the map
        buildUpdatedJSON({ keyValueMap: keyValueMap,jsonTemplate: this.originalJsonString })
            .then(result => {
                this.updatedJsonString = result;
                console.log('Updated JSON String:', this.updatedJsonString);
            })
            .catch(error => {
                console.error('Error occurred:', error);
            });
    }
}