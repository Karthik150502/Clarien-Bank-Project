import { LightningElement } from 'lwc';

export default class ComponentB extends LightningElement {
    firstName
    lastName

    connectedCallback() {
        let params = new URLSearchParams(window.location.search);
        this.firstName = params.get('firstname');
        this.lastName = params.get('lastname');

        // const urlString = window.location.href
        // const parsedUrl = new URL(urlString);
        
        // this.firstName = parsedUrl.firstname;   // "https:"
        // this.lastName = parsedUrl.lastname;   // "www.example.com"
    }
}