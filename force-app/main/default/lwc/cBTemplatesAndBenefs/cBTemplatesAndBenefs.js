import { LightningElement, wire, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

import CB_ChooseTemplateBenef from '@salesforce/label/c.CB_ChooseTemplateBenef'
import CB_Page_DomesticTransfers from '@salesforce/label/c.CB_Page_DomesticTransfers'
import CB_Page_OwnAcctTransfers from '@salesforce/label/c.CB_Page_OwnAcctTransfers'
import CB_Page_IntrabankTransfers from '@salesforce/label/c.CB_Page_IntrabankTransfers'
import CB_Page_InternationalTransfers from '@salesforce/label/c.CB_Page_InternationalTransfers'
import CB_Templates from '@salesforce/label/c.CB_Templates'
import CB_Beneficiaries from '@salesforce/label/c.CB_Beneficiaries'

export default class CBTemplatesAndBenefs extends LightningElement {


    transfersTypePage = ''
    showTemplates = true

    label = {
        CB_Templates,
        CB_Beneficiaries
    }

    @track headerConfguration = {
        previousPageUrl: '',
        heading: CB_ChooseTemplateBenef,
        iconsExposed: true,
        logout: {
            exposed: false
        },
        search: {
            exposed: false
        }
    }

    connectedCallback() {
        this.headerConfguration.previousPageUrl = this.transfersTypePage
    }



    // Handler for the current page reference.
    // Initializes component properties based on the state object.
    @wire(CurrentPageReference)
    pageRefHandler({ state }) {
        if (state) {
            this.transfersTypePage = state.transfersTypePage ? state.transfersTypePage : ''
        }
    }

    get tempClass() {
        return this.showTemplates ? 'btn active' : 'btn'
    }

    get benefClass() {
        return !this.showTemplates ? 'btn active' : 'btn'
    }

    openBeneficiaries() {
        this.showTemplates = false
    }

    openTemplates() {
        this.showTemplates = true
    }


    get templates() {
        switch (this.transfersTypePage) {
            case CB_Page_DomesticTransfers:
                return this.data["domestic"].templates
            case CB_Page_OwnAcctTransfers:
                return this.data["ownAccount"].templates
            case CB_Page_IntrabankTransfers:
                return this.data["intrabank"].templates
            case CB_Page_InternationalTransfers:
                return this.data["international"].templates
        }
    }

    get templateType() {
        switch (this.transfersTypePage) {
            case CB_Page_DomesticTransfers:
                return 'Domestic Transfer'
            case CB_Page_OwnAcctTransfers:
                return 'Own Account Transfer'
            case CB_Page_IntrabankTransfers:
                return 'Intrabank Transfer'
            case CB_Page_InternationalTransfers:
                return 'International Transfer'
        }
    }


    data = {
        "domestic": {
            templates: [
                {
                    "fromAccount": "12345678901",
                    "toAccount": "10987654321"
                },
                {
                    "fromAccount": "23456789012",
                    "toAccount": "21098765432"
                },
                {
                    "fromAccount": "34567890123",
                    "toAccount": "32109876543"
                },
                {
                    "fromAccount": "45678901234",
                    "toAccount": "43210987654"
                },
                {
                    "fromAccount": "56789012345",
                    "toAccount": "54321098765"
                },
                {
                    "fromAccount": "67890123456",
                    "toAccount": "65432109876"
                },
                {
                    "fromAccount": "78901234567",
                    "toAccount": "76543210987"
                },
                {
                    "fromAccount": "89012345678",
                    "toAccount": "87654321098"
                },
                {
                    "fromAccount": "90123456789",
                    "toAccount": "98765432109"
                },
                {
                    "fromAccount": "01234567890",
                    "toAccount": "09876543210"
                }
            ],
            beneficiaries: [

            ]
        },
        "ownAccount": {
            templates: [
                {
                    "fromAccount": "12345678901",
                    "toAccount": "10987654321"
                },
                {
                    "fromAccount": "23456789012",
                    "toAccount": "21098765432"
                },
                {
                    "fromAccount": "34567890123",
                    "toAccount": "32109876543"
                },
                {
                    "fromAccount": "45678901234",
                    "toAccount": "43210987654"
                },
                {
                    "fromAccount": "56789012345",
                    "toAccount": "54321098765"
                },
                {
                    "fromAccount": "67890123456",
                    "toAccount": "65432109876"
                },
                {
                    "fromAccount": "78901234567",
                    "toAccount": "76543210987"
                },
                {
                    "fromAccount": "89012345678",
                    "toAccount": "87654321098"
                },
                {
                    "fromAccount": "90123456789",
                    "toAccount": "98765432109"
                },
                {
                    "fromAccount": "01234567890",
                    "toAccount": "09876543210"
                }
            ],
            beneficiaries: [

            ]
        },
        "intrabank": {
            templates: [
                {
                    "fromAccount": "12345678901",
                    "toAccount": "10987654321"
                },
                {
                    "fromAccount": "23456789012",
                    "toAccount": "21098765432"
                },
                {
                    "fromAccount": "34567890123",
                    "toAccount": "32109876543"
                },
                {
                    "fromAccount": "45678901234",
                    "toAccount": "43210987654"
                },
                {
                    "fromAccount": "56789012345",
                    "toAccount": "54321098765"
                },
                {
                    "fromAccount": "67890123456",
                    "toAccount": "65432109876"
                },
                {
                    "fromAccount": "78901234567",
                    "toAccount": "76543210987"
                },
                {
                    "fromAccount": "89012345678",
                    "toAccount": "87654321098"
                },
                {
                    "fromAccount": "90123456789",
                    "toAccount": "98765432109"
                },
                {
                    "fromAccount": "01234567890",
                    "toAccount": "09876543210"
                }
            ],
            beneficiaries: [

            ]
        },
        "international": {
            templates: [
                {
                    "fromAccount": "12345678901",
                    "toAccount": "10987654321"
                },
                {
                    "fromAccount": "23456789012",
                    "toAccount": "21098765432"
                },
                {
                    "fromAccount": "34567890123",
                    "toAccount": "32109876543"
                },
                {
                    "fromAccount": "45678901234",
                    "toAccount": "43210987654"
                },
                {
                    "fromAccount": "56789012345",
                    "toAccount": "54321098765"
                },
                {
                    "fromAccount": "67890123456",
                    "toAccount": "65432109876"
                },
                {
                    "fromAccount": "78901234567",
                    "toAccount": "76543210987"
                },
                {
                    "fromAccount": "89012345678",
                    "toAccount": "87654321098"
                },
                {
                    "fromAccount": "90123456789",
                    "toAccount": "98765432109"
                },
                {
                    "fromAccount": "01234567890",
                    "toAccount": "09876543210"
                }
            ],
            beneficiaries: [

            ]
        },
    }

}