import { LightningElement, track, api, wire } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import getLocation from "@salesforce/apex/CBATMLocationController.getCurrentATMLocation";
export default class DummyMapComponent extends LightningElement {



    @api recordId;
    mapMarkers
    markersTitle = "Clarien Bank ATMs"; // Title for the map markers
    selectedMarker
    // Configuration options for the map.
    mapOptions = {
        disableDefaultUI: true
    };
    center = {}



    // @wire(getLocation, { recordId: '$recordId' })
    // wiredATMLocation({ error, data }) {
    //     if (data) {
    //         console.log(JSON.stringify(data))
    //         this.mapMarkers = [
    //             {
    //                 location: {
    //                     Latitude: data.Geolocation__Latitude__s ? data.Geolocation__Latitude__s : '',
    //                     Longitude: data.Geolocation__Longitude__s ? data.Geolocation__Longitude__s : '',
    //                 },
    //                 value: data.Id
    //             }
    //         ]
    //         this.selectedMarker = this.mapMarkers[0]
    //         this.center = {
    //             location: {
    //                 Latitude: data.Geolocation__Latitude__s ? data.Geolocation__Latitude__s : '',
    //                 Longitude: data.Geolocation__Longitude__s ? data.Geolocation__Longitude__s : '',
    //             }
    //         }

    //     } else if (error) {
    //         console.error('Error retrieving ATM location:', JSON.stringify(error));
    //     }
    // }

    connectedCallback() {
        getLocation({ recordId: this.recordId })
            .then((data) => {
                console.log(JSON.stringify(data))
                this.mapMarkers = [
                    {
                        location: {
                            Latitude: data[0].Geolocation__Latitude__s ? data[0].Geolocation__Latitude__s : '',
                            Longitude: data[0].Geolocation__Longitude__s ? data[0].Geolocation__Longitude__s : '',
                        },
                        value: data[0].Id
                    }
                ]
                this.selectedMarker = this.mapMarkers[0]
                this.center = {
                    location: {
                        Latitude: data[0].Geolocation__Latitude__s ? data[0].Geolocation__Latitude__s : '',
                        Longitude: data[0].Geolocation__Longitude__s ? data[0].Geolocation__Longitude__s : '',
                    }
                }
            }).catch((error) => {
                console.error('Error retrieving ATM location:', JSON.stringify(error));
            })
    }

    callMarkerHandler() {

    }




}