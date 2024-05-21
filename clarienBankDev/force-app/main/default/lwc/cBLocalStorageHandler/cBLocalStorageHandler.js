import fetchRequestBody from "@salesforce/apex/CBFetchMetaData.fetchRequestBody";
import fetchPaths from "@salesforce/apex/CBFetchMetaData.fetchPaths";




const setLocalStorage = (param, value) => {
    localStorage.setItem(param, value)
    return value
}

const getLocalStorage = (param) => {
    return localStorage.getItem(param)
}


const removeLocalStorage = (...param) => {
    param.forEach((prm) => {
        localStorage.removeItem(prm);
    })
}



const clearLocalStorage = () => {
    localStorage.clear()
}


const setSessionStorage = (param, value) => {
    session.setItem(param, value)
    return value
}


const getSessionStorage = (param) => {
    return sessionStorage.getItem(param)
}


const removeSessionStorage = (...param) => {
    param.forEach((prm) => {
        sessionStorage.removeItem(prm);
    })
}



const clearSessionStorage = () => {
    sessionStorage.clear();
}



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
            console.log("Some error occured: " + error)
            return [];
        });
}






export {
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage,
    clearLocalStorage,
    setSessionStorage,
    getSessionStorage,
    removeSessionStorage,
    clearSessionStorage,
    getJsonData
};

