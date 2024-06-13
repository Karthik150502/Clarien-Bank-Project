import { LightningElement } from 'lwc';
import { getBarcodeScanner } from 'lightning/mobileCapabilities';
export default class CBScanAndPay extends LightningElement {
    myScanner;
    scanButtonDisabled = false;
    scannedBarcode = '';

    headerConfguration = {
        previousPageUrl: 'Home',
        heading: 'Scan QR code',
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        },
    }

    // When the component is initialized, detect whether to enable the Scan button
    connectedCallback() {
        this.myScanner = getBarcodeScanner();

        // Check if BarcodeScanner is available, disable the Scan button if not
        if (this.myScanner == null || !this.myScanner.isAvailable()) {
            this.scanButtonDisabled = false;
            // this.handleBeginScanClick()
        } else {
            this.scanButtonDisabled = true;
        }
    }






    // Handler for when the Scan button is clicked
    handleBeginScanClick(event) {
        // Reset scannedBarcode to an empty string before starting a new scan
        this.scannedBarcode = '';

        // Make sure BarcodeScanner is available before trying to use it
        // Note: We also disable the Scan button if there’s no BarcodeScanner
        if (this.myScanner != null && this.myScanner.isAvailable()) {
            const scanningOptions = {
                barcodeTypes: [this.myScanner.barcodeTypes.QR]
            };

            // Begin capturing the barcode
            this.myScanner
                .beginCapture(scanningOptions)
                .then((result) => {
                    // Handle the barcode scan result
                    console.log(result);

                    // Do something with the barcode scan value:
                    // e.g., look up a record, create or update a record, parse data and put values into a form, etc.
                    // Here, we just display the scanned value in the UI
                    // this.scannedBarcode = decodeURIComponent(result.value);

                    console.log("Scanned value = " + result.value)
                })
                .catch((error) => {
                    // Handle unexpected errors here
                    console.error(error);
                })
                .finally(() => {
                    console.log('#finally');

                    // Clean up by ending capture, whether completed successfully or had an error
                    this.myScanner.endCapture();
                });
        } else {
            // BarcodeScanner is not available
            // Not running on hardware with a camera, or some other context issue
            console.log('Scan Barcode button should be disabled and unclickable.');
            console.log('Somehow it got clicked:');
            console.log(event);

            // Let the user know they need to use a mobile phone with a camera
        }
    }
}