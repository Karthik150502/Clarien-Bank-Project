import fetchRequestBody from "@salesforce/apex/CBFetchMetaData.fetchRequestBody";
import fetchPaths from "@salesforce/apex/CBFetchMetaData.fetchPaths";
import put from "@salesforce/apex/SessionStorageUtility.put";
import get from "@salesforce/apex/SessionStorageUtility.get";
import getSessionData from "@salesforce/apex/SessionStorageUtility.getSessionData";
import setSessionData from "@salesforce/apex/SessionStorageUtility.setSessionData";




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


const setSessData = (param, value) => {
    return put({ key: param, value: value })
}

const getSessData = (param) => {
    return get({ key: param })
}
const setAllSessData = (data) => {
    return getSessionData({ sessionData: data })
}
const getAllSessData = (...params) => {
    return setSessionData({ keys: params })
}

const remSessData = (...param) => {
    param.forEach((prm) => {
        sessionStorage.removeItem(prm);
    })
}

const clearSessData = () => {
    sessionStorage.clear();
}


const getTime = () => {
    return new Date().getTime();
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

/**
* To convert the current date into unique time stamp
* @param {date} inputDate - current date.
* @return {String} - Returns the timestamp in string.  
*/
const dateToTimestamp = () => {
    const inputDate = new Date();
    const dateTime = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
    const timestamp = dateTime.getTime();
    return timestamp.toString();
}



export {
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage,
    clearLocalStorage,
    setSessData,
    getSessData,
    setAllSessData,
    getAllSessData,
    remSessData,
    clearSessData,
    getJsonData,
    getTime,
    dateToTimestamp
};




// Example usages

setSessData('Username', "abc@example.com")
    .then(() => {

    }).catch((error) => {
        console.log("Error while getting data: " + JSON.stringify(error))
    })

getSessData('Username')
    .then((result) => {
        this.username = result
    }).catch((error) => {
        console.log("Error while getting data: " + JSON.stringify(error))
    })


getAllSessData('Username', 'password', "sessionId", "formId")
    .then((result) => {
        this.username = result[0]
        this.password = result[1]
        this.sessionId = result[2]
        this.formId = result[3]
    }).catch((error) => {
        console.log("Error while getting data: " + JSON.stringify(error))
    })