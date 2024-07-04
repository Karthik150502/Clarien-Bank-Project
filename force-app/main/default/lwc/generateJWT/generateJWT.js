import { LightningElement, track } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import JWT_LIB from '@salesforce/resourceUrl/jsonwebtoken';
import joseLib from '@salesforce/resourceUrl/jose_lib';

export default class GenerateJWT extends LightningElement {
    // @track token;

    // jwtLibLoaded = false;

    // renderedCallback() {
    //     if (this.jwtLibLoaded) {
    //         return;
    //     }
    //     loadScript(this, JWT_LIB)
    //         .then(() => {
    //             this.jwtLibLoaded = true;
    //             console.log('library loaded');
    //             // if (!window.jwt) {
    //             //     window.jwt = window.exports?.jsonwebtoken || window.module?.exports || window.exports;
    //             // }
    //             console.log('window.jwt:', window.jwt); 
    //         })
    //         .catch(error => {
    //             console.error('Error loading JWT library', error);
    //         });
    // }

    // generateToken() {
    //     if (this.jwtLibLoaded) {
    //         try {
    //             const customerName = "clarien";
    //             const issuerName = "clarien";
    //             const privateKey = `-----BEGIN EC PRIVATE KEY-----
    //             MHcCAQEEIIF4++y4kj7/1nUNGMHOgsUtc1R30BOjbCM+dj1lBU8ooAoGCCqGSM49
    //             AwEHoUQDQgAESUOHSCBQmPG8MuMp2Aupd3o1roID6F9RDmS86lqI4+HsOPJU4hTF
    //             QXEPcpb/Pcyo3qpjmT7af4MWOyxllqsPOg==
    //             -----END EC PRIVATE KEY-----`;
    //             const secondsSinceEpoch = Math.round(Date.now() / 1000);
    //             const customerJTI = customerName + '-' + secondsSinceEpoch;
    //             const payload = { 
    //                 jti: customerJTI, 
    //                 roles: ["scs:executeScenario"]
    //             };
    //             const options = { 
    //                 algorithm: 'ES256', 
    //                 issuer: customerName + "-" + issuerName, 
    //                 expiresIn: '10 minutes', 
    //                 keyid: customerName, 
    //                 subject: customerName
    //             };
    //             let jwt;
    //             try {
    //                 jwt = require('jsonwebtoken');
    //             } catch (error) {
    //                 console.log(JSON.stringify(error));
    //             }
    //             try {
    //                 this.token = jwt.sign(payload, privateKey, options);
    //             } catch (error) {
    //                 console.log('token creation error: ', JSON.stringify(error));
    //             }
                    
    //         } catch (error) {
    //             console.error('Error generating token', JSON.stringify(error));
    //         }
    //     } else {
    //         console.error('JWT library not loaded');
    //     }
    // }



    joseLibInitialized = false;
    joseLibLoading = false;

    renderedCallback() {
        if (this.joseLibInitialized || this.joseLibLoading) {
            return;
        }
        this.joseLibLoading = true;
        loadScript(this, joseLib)
            .then(() => {
                this.joseLibInitialized = true;
                this.joseLibLoading = false;
                console.log('library loaded');
            })
            .catch(error => {
                console.error('Error loading jose library', error);
                this.joseLibLoading = false;
            });
    }

    async generateJwtJose() {
        if (!this.joseLibInitialized) {
            console.error('jose library not initialized');
            return;
        }

        console.log('window.jose : ', JSON.stringify(window.jose));
        const { SignJWT } = window.jose;

        // Your EC private key in PKCS8 format
        const privateKeyPEM = `
                            -----BEGIN EC PRIVATE KEY-----
                            MHcCAQEEIIF4++y4kj7/1nUNGMHOgsUtc1R30BOjbCM+dj1lBU8ooAoGCCqGSM49
                            AwEHoUQDQgAESUOHSCBQmPG8MuMp2Aupd3o1roID6F9RDmS86lqI4+HsOPJU4hTF
                            QXEPcpb/Pcyo3qpjmT7af4MWOyxllqsPOg==
                            -----END EC PRIVATE KEY-----
                            `;
        try {
            const privateKey = {"kty":"EC","d":"gXj77LiSPv_WdQ0Ywc6CxS1zVHfQE6NsIz52PWUFTyg","crv":"P-256","x":"SUOHSCBQmPG8MuMp2Aupd3o1roID6F9RDmS86lqI4-E","y":"7DjyVOIUxUFxD3KW_z3MqN6qY5k-2n-DFjssZZarDzo"};
            // try {
            //     // Convert PEM to JWK
            //     // privateKey = this.pemToJwk(privateKeyPEM);
            // } catch (error) {
            //     console.log('error in setting private key', JSON.stringify(error));
            // }

            const customerName = "clarien";
            const issuerName = "clarien";
            const secondsSinceEpoch = Math.round(Date.now() / 1000);
            const customerJTI = customerName + '-' + secondsSinceEpoch;
            const payload = { 
                jti: customerJTI, 
                roles: ["scs:executeScenario"]
            };

            try {
                const privateKeyObject = createPrivateKey({
                    key: Buffer.from(jwk.d, 'base64'),
                    format: 'der',
                    type: 'pkcs8'
                });
                
                const jwtHeader = { alg: 'ES256' };
                const jwt = new SignJWT(payload)
                .setProtectedHeader(jwtHeader)
                .setIssuedAt()
                .setIssuer('clarien')
                .setAudience('urn:example:audience')  // Replace with actual audience
                .setExpirationTime('2h')
                .sign(privateKeyObject);
    
                console.log('Generated JWT:', jwt);
            } catch (error) {
                console.log('error in SignJWT: ', JSON.stringify(error));
            }
            // Use the private key to sign a JWT
        } catch (error) {
            console.error('Error generating JWT', error);
        }
    }

    // pemToJwk(pem) {
    //     const pemContents = pem
    //         .replace('-----BEGIN EC PRIVATE KEY-----', '')
    //         .replace('-----END EC PRIVATE KEY-----', '')
    //         .replace(/\s+/g, '');
    //     const der = Buffer.from(pemContents, 'base64');
    //     const jwk = {
    //         kty: 'EC',
    //         crv: 'P-256',
    //         d: der.toString('base64')
    //     };
    //     return jwk;
    // }

}