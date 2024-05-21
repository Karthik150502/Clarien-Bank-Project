/*
	Author - __
	Created Date - __/__/202_
	Modified Date - __/__/202_, __/__/202_
	Description - {***Purpose of creation or modification, Additional Comment***}
*/

import { LightningElement } from 'lwc';
import uploadFile from '@salesforce/apex/CBProfileUploadHandler.uploadFile'
export default class CBCameraOpen extends LightningElement {

    // profileImage
    fileData;
    // handleFiles(event){
    //     event.preventDefault()
    //     let picFromCamera = this.template.querySelector('.click-image') 
    //     let picFromGallery = this.template.querySelector('.upload-image')
    //     this.profileImage = picFromGallery.files?picFromGallery.files[0]:picFromCamera.files[0]
    //     console.log('Pictures Clicked-->' + picFromCamera.files[0])
    //     console.log('Pictures uploaded-->' + picFromGallery.files[0])
    //     this.readFile()
    //     this.handleClick();


    // }

  openfileUpload(event) {
        const file = event.target.files[0]
        console.log('File Data ',file)

        var reader = new FileReader()
        
        reader.onload = () => {
            var base64 = reader.result.split(',')[1] 
            
            this.fileData = {
                'filename': file.name,
                'base64': base64,
                'recordId': '001Dy000012ehKzIAI'
            }
          
            console.log('File Data ',this.fileData)
        }
        reader.readAsDataURL(file)
    }
  handleClick() {
        const {
            base64,
            filename,
            recordId
        } = this.fileData 
        console.log('result',base64,filename,recordId)

        uploadFile({base64,filename,recordId}).then(result => {
          console.log('result',result)
            this.fileData = null
            console.log('result ',result);

        }).catch(error=>{
          console.log('error ',error.message);
        })
  }

}