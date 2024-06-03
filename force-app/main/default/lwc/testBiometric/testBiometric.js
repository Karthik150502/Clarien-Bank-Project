import { LightningElement } from 'lwc';
import { getBiometricsService } from 'lightning/mobileCapabilities';

export default class TestBiometric extends LightningElement {

    status;
    status2;
    biometricsService;

    connectedCallback() {
      this.biometricsService = getBiometricsService();
      console.log(this.biometricsService);
    }

    handleVerifyClick() {
        const myBiometricsService = getBiometricsService();
        const option = {
              permissionRequestBody: "Required to confirm device ownership.",
              additionalSupportedPolicies: ['PIN_CODE']
        };
        myBiometricsService.isBiometricsReady(option)
        .then((results) => {
            console.log(results);
            this.status = results;
        })
        .catch((error) => {
            // Handle cancellation or other errors here
            this.status = error.message
            console.error('Error code: ' + error.code);
            console.error('Error message: ' + error.message);
        });

        
    }

    handleVerifyClick2() {
        const myBiometricsService = getBiometricsService();
        if (myBiometricsService.isAvailable()) {
            this.status2 = 'biometric functionality available';
        } else {
            this.status2 = 'biometric functionality not available'
        }

        const options = {
              permissionRequestBody: "Required to confirm device ownership.",
              additionalSupportedPolicies: ['PIN_CODE']
            };
            this.biometricsService.checkUserIsDeviceOwner(options)
              .then((result) => {
                // Do something with the result
                if (result === true) {
                  this.status3 = "✔ Current user is device owner."
                } else {
                  this.status3 = "𐄂 Current user is NOT device owner."
                }
                alert(this.status3);
              })
              .catch((error) => {
                // Handle errors
                this.status3 = 'Error code: ' + error.code + '\nError message: ' + error.message;
              });
    }
    //   if (this.biometricsService.isAvailable()) {
        // const options = {
        //   permissionRequestBody: "Required to confirm device ownership.",
        //   additionalSupportedPolicies: ['PIN_CODE']
        // };
        // this.biometricsService.checkUserIsDeviceOwner(options)
        //   .then((result) => {
        //     // Do something with the result
        //     if (result === true) {
        //       this.status = "✔ Current user is device owner."
        //     } else {
        //       this.status = "𐄂 Current user is NOT device owner."
        //     }
        //     alert(this.status);
        //   })
        //   .catch((error) => {
        //     // Handle errors
        //     this.status = 'Error code: ' + error.code + '\nError message: ' + error.message;
        //   });

    //     this.status = 'success found'

    //   } else {
    //     // service not available
    //     this.status = 'failure not found';
    //   }
    
}