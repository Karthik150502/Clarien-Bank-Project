import { LightningElement } from 'lwc';
import fetchCacheData from '@salesforce/apex/CBCacheHandler.getCache'
import setCacheData from '@salesforce/apex/CBCacheHandler.setCache'
export default class CBTestSession extends LightningElement {
    input = ''
    cacheResult = ''

    handleChange(event){
        this.input = event.target.value
    }

    getCache(){
        fetchCacheData({param:this.input})
        .then((result)=>{
            this.cacheResult = result 
        })
        .catch((error)=>{
            console.error(error)
        })
    }

}