import fetchRequestBody from "@salesforce/apex/CBFetchMetaData.fetchRequestBody";
import fetchPaths from "@salesforce/apex/CBFetchMetaData.fetchPaths";
import getAcctProducts from "@salesforce/apex/CBFetchMetaData.getAccountProducts";
import putData from "@salesforce/apex/CBUtilityController.put";
import getData from "@salesforce/apex/CBUtilityController.get";
import getSessionData from "@salesforce/apex/CBUtilityController.getSessionData";
import setSessionData from "@salesforce/apex/CBUtilityController.setSessionData";
import signOut from "@salesforce/apex/CBApiController.signOut";
import getListValues from "@salesforce/apex/CBFetchMetaData.getListValues";



// Sets value to localStorage
const setLocalStorage = (param, value) => {
    localStorage.setItem(param, value)
    return value
}


// Gets value to localStorage
const getLocalStorage = (param) => {
    return localStorage.getItem(param)
}


// Checks if a key present in the localStorage
const checkLocalkey = (key) => {
    let localKeys = new Set(Array.from(Object.keys(localStorage)))
    return localKeys.has(key)
}


// Checks if a key present in the sessionStorage
const checkSessionkey = (key) => {
    let localKeys = new Set(Array.from(Object.keys(sessionStorage)))
    return localKeys.has(key)
}



// Sets a value to the sessionStorage
const setMobileSessionStorage = (param, value) => {
    sessionStorage.setItem(param, value);
    return value;
}


// Gets value based on key from the sessionStorage
const getMobileSessionStorage = (param) => {
    return sessionStorage.getItem(param);
}

// Sets a bunch of data to the sessionStorage at once 
const setAllMobileSessionStorage = (data) => {
    let keys = Object.keys(data)
    keys.forEach((key) => {
        sessionStorage.setItem(key, data[key])
    })
}


// Gets a bunch of data based on keys from the sessionStorage at once 
const getAllMobileSessionStorage = (...param) => {
    let result = {}
    param.forEach((prm) => {
        result[prm] = sessionStorage.getItem(prm)
    })
    return result
}


// Clears all the data from the sessionStorage
const clearAllMobileSessionStorage = () => {
    sessionStorage.clear()
}

// Remove particular sessionStorage key 
const removeMobileSessionStorage = (...param) => {
    param.forEach((prm) => {
        sessionStorage.removeItem(prm);
    })
}



// Removes particular value from the locaStorage
const removeLocalStorage = (...param) => {
    param.forEach((prm) => {
        localStorage.removeItem(prm);
    })
}


// Clears all items from local storage
const clearLocalStorage = () => {
    localStorage.clear()
}


// Sets session data using a apex method and returns the value
const setSessData = (param, value) => {
    return putData({ key: param, value: value })
}


// Retrieves session data using a apex method
const getSessData = (param) => {
    return getData({ key: param })
}

// Sets session data using a apex method and returns the value
const setAllSessData = (data) => {
    return setSessionData({ sessionData: data })
}


// Retrieves multiple session data items using a apex method
const getAllSessData = (...params) => {
    return getSessionData({ keys: params })
}


// Removes specific session data items
const remSessData = (...param) => {
    param.forEach((prm) => {
        sessionStorage.removeItem(prm);
    })
}

// Clears all session data
const clearSessData = () => {
    sessionStorage.clear();
}


// Retrieves user credentials from session data
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


// Updates the page path in local storage and returns the previous page
const setPagePath = (currentPage) => {

    if (getLocalStorage('pagePath')) {
        let path = getLocalStorage('pagePath')
        console.log('path', path);
        let previousPage = 'Home'
        if (path.indexOf(currentPage) !== -1) {
            setLocalStorage('pagePath', path.substring(0, path.indexOf(currentPage) + (currentPage).length))
            path = getLocalStorage('pagePath')
            // console.log('inbox path -1',getLocalStorage('pagePath'))
            previousPage = path.split('.')[path.split('.').length - 2]
            console.log('if', previousPage);
            console.log('update path', getLocalStorage('pagePath'));
        }
        else {
            previousPage = path.split('.')[path.split('.').length - 1]
            setLocalStorage('pagePath', `${path}.${currentPage}`)
            // console.log('inbox path',getLocalStorage('pagePath'))
            console.log('else', previousPage);
            console.log('update path', getLocalStorage('pagePath'));
        }
        return previousPage
    }
    else {
        // console.log('default');
        setLocalStorage('pagePath', 'Home')
    }
}


// Retrieves account products based on the account type
const getAccountProducts = (acct_type) => {
    return getAcctProducts({ accountType: acct_type });
}


const getPicklistValues = (componentName) => {
    return getListValues({ componentName })
}


// Formats a date string from yyyy-mm-dd to dd/mm/yyyy
const formatDate = (yyyyMmDd) => {
    let res = yyyyMmDd.split("-");
    return `${res[2]}/${res[1]}/${res[0]}`;
}

// Formats a date string from mm/dd/yyyy to dd/mm/yyyy
const formatLocalDateStringDate = (date) => {
    let res = date.split("/")
    let dd = Number(res[1]) < 10 ? `0${res[1]}` : res[1] // Add 0 to single digit dates
    let mm = Number(res[0]) < 10 ? `0${res[0]}` : res[0] // Add 0 to single digit months
    return `${dd}/${mm}/${res[2]}`
}
// Gets Today's date in dd/mm/yyyy format
const getCurrentDate = () => {
    let date = new Date().toLocaleDateString().split("T")[0]
    let res = date.split("/")
    let dd = Number(res[1]) < 10 ? `0${res[1]}` : res[1] // Add 0 to single digit dates
    let mm = Number(res[0]) < 10 ? `0${res[0]}` : res[0] // Add 0 to single digit months
    return `${dd}/${mm}/${res[2]}`
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
    setAllMobileSessionStorage,
    getAllMobileSessionStorage,
    clearAllMobileSessionStorage,
    getUserCreds,
    logout,
    setPagePath,
    checkSessionkey,
    checkLocalkey,
    getAccountProducts,
    formatDate,
    getPicklistValues,
    formatLocalDateStringDate,
    getCurrentDate
};