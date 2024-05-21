import fetchRequestBody from "@salesforce/apex/CBFetchMetaData.fetchRequestBody";
import fetchPaths from "@salesforce/apex/CBFetchMetaData.fetchPaths";
/**
* To get the JSON request body structure, and the JSON field paths, This should be called in the connectedCallback().
* @param {string} mdtName - Name of the parent API developerName.
* @param {function} reqBodyMethod - Function to invoke for getting the JSON request body.
* @param {function} jsonPathMethod - Function to invoke for getting the JSON field paths.
* @return {Array[Object, Array]} - Array of the Promise results, i.e., JSON request body and an Array of JSON paths.   
*/
const getJsonData = (mdtName) => {
    let resultArray = []
    const fetchBodyPromise = fetchRequestBody({ developerName: mdtName })
    const fetchMetadataPromise = fetchPaths({ developerName: mdtName })


    return Promise.all([fetchBodyPromise, fetchMetadataPromise])
        .then((result) => {
            resultArray.push(result[0].JSON_Body__c)
            resultArray.push(result[1])
            return resultArray
        }).catch(error => {
            console.log("Some error occured: " + JSON.stringify(error))
            return [];
        });
}




export default {
    getJsonData
};