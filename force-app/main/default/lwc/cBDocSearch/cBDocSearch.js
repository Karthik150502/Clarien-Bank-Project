// import docSearch from '@salesforce/apex/CBApiController.docSearch';
import fetchRequestBody from "@salesforce/apex/CBFetchMetaData.fetchRequestBody";
import fetchPaths from "@salesforce/apex/CBFetchMetaData.fetchPaths";

const docSearchh = (startData, endDate, accountNum, apiName) => {
    console.log('doc search in js called');
    getJsonData(apiName)
        .then((result) => {
            const docSearchReqBody = mapData(JSON.parse(result[0]), result[1], startData, endDate, accountNum);
            let reqWrapper = {
                payload: docSearchReqBody,
                metadataName: apiName
            }
            console.log(reqWrapper);
            // return docSearch({ reqWrapper: reqWrapper });
        })

}

const mapData = (xmlBody, xmlPath, startData, endDate, accountNumber) => {
    console.log('mapping data');
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlBody, "text/xml");
    xmlPath.forEach((record) => {
        if (!record.Is_Active__c) {
            return
        } else {
            console.log(xmlDoc.querySelector(record.XML_Path__c).textContent = [record.Field_Name__c]);
            xmlDoc.querySelector(record.XML_Path__c).textContent = [record.Field_Name__c]
        }
    });
    console.log(XMLSerializer().serializeToString(xmlDoc));
    return new XMLSerializer().serializeToString(xmlDoc);
}

const getJsonData = (mdtName) => {
    console.log(mdtName);
    let resultArray = []
    const fetchBodyPromise = fetchRequestBody({ developerName: mdtName })
    const fetchMetadataPromise = fetchPaths({ developerName: mdtName })

    return Promise.all([fetchBodyPromise, fetchMetadataPromise])
        .then((result) => {
            resultArray.push(result[0].JSON_Body__c)
            resultArray.push(result[1])
            console.log('body',resultArray[0]);
            console.log('path',resultArray[1]);
            return resultArray
        }).catch(error => {
            console.log("Some error occured: " + error)
            return [];
        });
}


export {
    docSearchh
}