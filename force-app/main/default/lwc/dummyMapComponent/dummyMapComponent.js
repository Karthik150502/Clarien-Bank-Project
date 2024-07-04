import { LightningElement } from 'lwc';
export default class DummyMapComponent extends LightningElement {

    renderedCallback() {
        setTimeout(() => {
            const cbmfaController = this.template.querySelector('c-c-b-m-f-a-controller');
            if (cbmfaController) {
                cbmfaController.initiateMFA()
                   .then((response) => {
                        console.log('MFA response:', response);
                        // handle response
                    })
                   .catch((error) => {
                        console.error(error);
                    });
            } else {
                console.error('CBMFAController component not found');
            }
        }, 0);
    }

}