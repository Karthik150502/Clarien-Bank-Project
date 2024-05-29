import { LightningElement } from 'lwc';

export default class CBTestSession extends LightningElement {
    input = ''
    cacheResult = ''

    handleChange(event){
        this.input = event.target.value
    }


}