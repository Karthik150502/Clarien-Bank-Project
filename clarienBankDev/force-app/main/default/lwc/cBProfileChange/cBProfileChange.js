/*
	Author - __
	Created Date - __/__/202_
	Modified Date - __/__/202_, __/__/202_
	Description - {***Purpose of creation or modification, Additional Comment***}
*/

import { LightningElement } from 'lwc';
import uploadFile from '@salesforce/apex/CBProfileUploadHandler.uploadFile'

export default class CBProfileChange extends LightningElement {
    result;
    fileData
    openfileUpload(event) {
        const file = event.target.files[0]
        var reader = new FileReader()
        reader.onload = () => {
            var base64 = reader.result.split(',')[1]
            this.fileData = {
                'filename': file.name,
                'base64': base64,
                'recordId': '001Dy000012ehKzIAI'
            }
            console.log(this.fileData)
        }
        reader.readAsDataURL(file)
    }
    
    handleClick(){
        const {base64, filename, recordId} = this.fileData
        uploadFile({ base64, filename, recordId }).then(result=>{
            this.fileData = null
            let title = `${filename} uploaded successfully!!`
            console.log('Title',title)
            this.result=title;
        }).catch(error=>{
            let title = `${filename} failed to upload!!`;
            this.result=title;
            console.log('error ',error.message);
        })
    }
}