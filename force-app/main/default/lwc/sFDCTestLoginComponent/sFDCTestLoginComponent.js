import { LightningElement,wire } from 'lwc';
import siteLogin from '@salesforce/apex/CBLoginController.doLoginStd';
import { CurrentPageReference } from 'lightning/navigation';


export default class SFDCTestLoginComponent extends LightningElement {

    username='';
    password='';
    connected = false;
    pageReferenc = null;
    startUrl = null;

    @wire(CurrentPageReference) getPageRef (pagRef){
        
         if(pagRef!= null){
        console.log('pagRef : ',pagRef);
           this.startUrl = pagRef["state"]["startURL"]; 
           console.log('startr url : ',this.startUrl );
            
         }
    
        

        }

        connectedCallback() {
            
        }

    login(){

        console.log('UN : ',this.username);
        console.log('PWD : ',this.password);
        console.log('STARTURL : ',this.startUrl);

        siteLogin({'un':this.username, 'pwd':this.password, 'startUrl':this.startUrl}).then(url=>{
            console.log('url : ', url);
            window.location.href =url;
        }).error(err=>{
            console.log('err : ', err);
        });
        

    }
    usernameHandler(event){
        this.username = event.target.value
    }

     passwordHandler(event) {
        this.password = event.target.value

    }

    

}