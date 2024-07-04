import { LightningElement, track } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import html5QrcodeBundle from '@salesforce/resourceUrl/html5QrcodeBundle';

export default class ScanPayTest extends LightningElement {
    @track qrCodeMessage = '';
    isLibraryLoaded = false;
    readerElement;

    renderedCallback() {
        if (this.isLibraryLoaded) {
            return;
        }

        console.log('Loading HTML5 QR Code library from:', html5QrcodeBundle + '/bundle.js');
        // Load the bundled html5-qrcode library
        loadScript(this, html5QrcodeBundle)
            .then(() => {
                console.log('HTML5 QR Code library loaded successfully');
                this.isLibraryLoaded = true;
                // this.readerElement = this.template.querySelector('[data-id="re"]')
                this.initializeQrCodeScanner();
            })
            .catch(error => {
                console.error('Error loading html5-qrcode library:', error);
            });
    }


    initializeQrCodeScanner() {
            
            console.log('Initializing QR Code Scanner');
            this.readerElement = this.template.querySelector('c-scan-pay-test');
            if (!this.readerElement) {
                console.error('HTML Element with id=reader not found');
                return;
            }
            this.readerElement.id = "reader";
            console.log('readerElement: ', this.readerElement);
            console.log('type of readerElment', typeof this.readerElement);
            let html5QrCode;
            const config = {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                // Additional configuration options can be added here
            };
            try {
                html5QrCode = new window.Html5Qrcode(this.readerElement);
                console.log('html5Qrcode instance created');
            } catch (error) {
                console.log('error in creating Html5qrcode instance', error);
            }
    
            const qrCodeSuccessCallback = (decodedText, decodedResult) => {
                this.qrCodeMessage = decodedText;
                console.log(`QR Code detected: ${decodedText}`);
            };
    
    
            html5QrCode.start(
                { facingMode: "environment" }, // Use the rear camera
                config,
                qrCodeSuccessCallback
            ).catch(err => {
                console.error('Error starting html5-qrcode:', err);
            });
    }
    

    disconnectedCallback() {
        // Cleanup the scanner
        try {
            const html5QrCode = new Html5Qrcode("reader");
            html5QrCode.stop().then(ignore => {
                html5QrCode.clear();
            }).catch(err => {
                console.error('Error stopping html5-qrcode:', err);
            });
        } catch (error) {
            console.error('Error cleaning up QR Code Scanner:', error);
        }
    }
}