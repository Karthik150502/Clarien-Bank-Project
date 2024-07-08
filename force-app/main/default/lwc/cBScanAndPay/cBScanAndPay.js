// barcodeScannerMultiScan.js
import { LightningElement, track } from "lwc";
import { NavigationMixin } from 'lightning/navigation'; // Importing NavigationMixin for navigation functionality
import { getBarcodeScanner } from "lightning/mobileCapabilities";
import { loadScript } from 'lightning/platformResourceLoader';
import I_TRANSFER from '@salesforce/label/c.CB_iTransfer';
import JSQR from '@salesforce/resourceUrl/JSQR';
import CBSVG from "@salesforce/resourceUrl/CBSVG"; // Importing SVG file from Static Resource

export default class CBScanAndPay extends NavigationMixin(LightningElement) {

	CBBackIcon = `${CBSVG}/CBSVGs/CBBackIcon.svg#CBBackIcon`;
	barcodeScanner;
	scannedBarcodes = [];
	jsqrInitialized = false;


	closeNavigate() {
        this.dispatchEvent(new CustomEvent('close'))
    }
	renderedCallback() {
		console.log('render call back called');
		if (this.jsqrInitialized) {
			return;
		}
		this.jsqrInitialized = true;

		loadScript(this, JSQR)
			.then(() => {
				console.log('jsqr loaded successfully', JSQR);
				window.jsQR = window.jsQR || jsQR;
			})
			.catch(error => {
				console.error('Error loading jsqr:', error);
			});
	}


	connectedCallback() {
		this.barcodeScanner = getBarcodeScanner();

	}


	handleQrScan() {
		let backgroundViewHTML = `
									<header>
										<meta name="viewport" content="device-width, initial-scale=1.0, 
										maximum-scale=1.0, minimum-scale=1.0">
									</header>
									<html>
									<head>
										<style>
											body {width: 90vw; height: 100vh; z-index: 10; background: black; margin: 0 auto;}
											div { width: 100%; display: flex; justify-content: center; align-items: center; position: fixed; bottom: 50}
											div > svg { fill: white; }
											button { background: white; }
										</style>
									</head>
									<body>
										<h1 align="right"><a href="nimbusbarcodescanner://dismiss">✖</a></h1>
									</body>
									<html>
									`

		// Set your configuration options, including bulk and multi-scanning if desired, in this scanningOptions object
		const scanningOptions = {
			barcodeTypes: [this.barcodeScanner.barcodeTypes.QR],
			scannerSize: "XLARGE",
			cameraFacing: "BACK",
			showSuccessCheckMark: true,
			instructionText: 'Scan a QR , UPC , EAN 13, Code 39',
            successText: 'Scanning complete.',
			backgroundViewHTML: backgroundViewHTML,
		};

		// Make sure BarcodeScanner is available before trying to use it
		if (this.barcodeScanner != null && this.barcodeScanner.isAvailable()) {
			// Reset scannedBarcodes before starting new scanning session
			this.scannedBarcodes = [];

			// Start scanning barcodes
			this.barcodeScanner
				.scan(scanningOptions)
				.then((results) => {
					this.logs = JSON.stringify(results);
					this.processScannedBarcodes(results);
				})
				.catch((error) => {
					this.processError(error);
				})
				.finally(() => {
					this.logs = 'qr scan complete'
					this.barcodeScanner.dismiss();
				});
		} else {
			console.log("BarcodeScanner unavailable. Non-mobile device?");
		}
	}

	processScannedBarcodes(barcodes) {
		console.log(JSON.stringify(barcodes));
		this.scannedBarcodes = this.scannedBarcodes.concat(barcodes);
	}

	processError(error) {
		// Check to see if user ended scanning
		if (error.code == "USER_DISMISSED") {
			console.log("User terminated scanning session.");
		} else {
			console.error(error);
		}
	}

	resultAvailable = false;
	@track resultHeading = ''
	get scannedBarcodesAsString() {
		if (this.scannedBarcodes) {
			this.resultAvailable = true;
			let qrValue = this.scannedBarcodes.map((barcode) => barcode.value).join("\n");
			this.checkQr(qrValue);
			return qrValue;
		}
		return ''
	}

	checkQr(qr) {
		console.log('qr url', qr);
		const regex = /^www\.clarienbank\.com\/account\//;
		console.log(regex.test(String(qr)));
  		if(regex.test(qr)) {
			console.log('payment url');
			this.navigateToSetPayment(qr);
		} else {
			console.log('link url');
			// this.resultHeading = 'Navigate to Link'
		}
	}

	get result() {
		if(this.resultAvailable) {
			return 'result-active'
		} else {
			return 'result-inactive'
		}
	}

	closeResult() {
		this.resultAvailable = false
	}


	callHandleImageUpload() {
		let fileInput = this.template.querySelector('.upload');
		fileInput.click();
	}

	logs = ''
	handleImageUpload(event) {
		const file = event.target.files[0];
		this.scannedBarcodes = [];
		if (file) {
			console.log('File found:', file);
			this.logs = 'File found';
			const reader = new FileReader();
			reader.onload = () => {
				console.log('File reader loaded');
				const image = new Image();
				image.onload = () => {
					console.log('Image loaded');
					const canvas = document.createElement('canvas');
					canvas.width = image.width;
					canvas.height = image.height;
					const context = canvas.getContext('2d');
					context.drawImage(image, 0, 0, canvas.width, canvas.height);
					const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
					console.log('Image data extracted:', imageData);
					const code = window.jsQR(imageData.data, imageData.width, imageData.height);
					console.log('Code:', code);
					if (code) {
						this.logs = 'URL:';
						console.log('qr code: ', JSON.stringify(code));
						this.scannedBarcodes.push({ value: code.data });
					} else {
						console.error('No QR code found.');
					}
				};
				image.src = reader.result;
			};
			reader.readAsDataURL(file);
		} else {
			console.error('No file found');
			this.logs = 'No file found';
		}
	}


	// Helper function to handle navigation to a specified page
    navigateToSetPayment(qrValue) {
        const pageReference = {
            type: 'comm__namedPage',
            attributes: {
                name: 'CBScanAndPaySetAmount__c'
            },
			state: {
				data: qrValue 
			}
        };
        this[NavigationMixin.Navigate](pageReference);
    }
}