import { LightningElement } from 'lwc';

export default class EnterOtp extends LightningElement {

    Inputlabelnumber = ['ip1','ip2','ip3','ip4','ip5'];

    handleInputChange(event){
      console.log(event.target.value);
      //this.template.querySelector(`[id="${inputid}"]`).focus();

    }

    next(event,next,prev, index) {
         console.log('Entered into next method')
        if(index == 6) {
          console.log("submit")
        }
    
        if(event.target.value.length < 1 && prev){
          prev.setFocus()
        }
        else if(next && event.target.value.length>0){
          next.setFocus();
        }
        else {
         return 0;
        } 
      }

}