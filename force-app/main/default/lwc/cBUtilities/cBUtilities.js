import fetchRequestBody from "@salesforce/apex/CBFetchMetaData.fetchRequestBody";
import fetchPaths from "@salesforce/apex/CBFetchMetaData.fetchPaths";
import putData from "@salesforce/apex/CBUtilityController.put";
import getData from "@salesforce/apex/CBUtilityController.get";
import getSessionData from "@salesforce/apex/CBUtilityController.getSessionData";
import setSessionData from "@salesforce/apex/CBUtilityController.setSessionData";
import signOut from "@salesforce/apex/CBApiController.signOut";




const setLocalStorage = (param, value) => {
    localStorage.setItem(param, value)
    return value
}

const getLocalStorage = (param) => {
    return localStorage.getItem(param)
}

const setMobileSessionStorage = (param, value) => {
    sessionStorage.setItem(param, value);
    return value;
}

const getMobileSessionStorage = (param) => {
    return sessionStorage.getItem(param);
}


const removeMobileSessionStorage = (...param) => {
    param.forEach((prm) => {
        sessionStorage.removeItem(prm);
    })
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
    return putData({ key: param, value: value })
}

const getSessData = (param) => {
    return getData({ key: param })
}

const setAllSessData = (data) => {
    return setSessionData({ sessionData: data })
}
const getAllSessData = (...params) => {
    return getSessionData({ keys: params })
}

const remSessData = (...param) => {
    param.forEach((prm) => {
        sessionStorage.removeItem(prm);
    })
}

const clearSessData = () => {
    sessionStorage.clear();
}


const getUserCreds = () => {
    return getAllSessData("CBUsername", "CBPassword")
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

/**
* Method to logout the user
* Logs the end of the session and redirects to the logout page.
* @returns {void}
*/
const logout = () => {
    // your function for too long inactivity goes here
    // e.g. window.location.href = 'logout.php';
    console.log('Session ended.');
    // Get the current domain
    let domain = window.location.href;
    // Find the index of "/s"
    let index = domain.indexOf("/s");
    if (index !== -1) {
        // Remove everything till "/s"
        domain = domain.substring(0, index);
    }
    console.log('Logout link:', `${domain}/secur/logout.jsp`);
    apiLogout(domain)
}



/**
* This function uses a method from the cBJsonDataHandler package that calls an Apex method that returns the API's request body and JSON paths for substitution.
* @param {String} logoutApiName - The API details's metadata name.
* @returns {void}
*/
const apiLogout = (domain) => {
    console.log('Entered ApiLogout')
    getJsonData()
        .then(result => {
            const signOutJsonBody = this.dataMap(JSON.parse(result[0]), result[1]);
            let requestWrapper = {
                payload: JSON.stringify(signOutJsonBody),    // Ensure payload is a string
                metadataName: 'CB_logout_API',           // Provide metadata name
                headers: null                              // Provide an empty map for headers
            };
            return signOut({ reqWrapper: requestWrapper });
        })
        .then((result) => {
            console.log('Response:', result)
            window.location.href = `${domain}/secur/logout.jsp`;
        })
        .catch(error => {
            console.error('Some error occured: ', error)
            window.location.href = `${domain}/secur/logout.jsp`;
        })
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
    dateToTimestamp,
    setMobileSessionStorage,
    getMobileSessionStorage,
    removeMobileSessionStorage,
    getUserCreds,
    logout
};