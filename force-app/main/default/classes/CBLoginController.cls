/**
* @description       : 
* @author            : Prateek Deshmukh
* @group             : Prateek Deshmukh,Aditya S,Mahalakshmi 
* @last modified on  : 06-14-2024
* @last modified by  : Prateek Deshmukh
**/
public class CBLoginController{
    
    /**
* @description This method facilitates user login by making an HTTP request to a third-party API and processing the response. 
It handles the authentication process, retrieves necessary user information, and logs the user into the system if the login is successful.
* @author Prateek Deshmukh | 04-22-2024
* @param payload The payload containing login credentials and additional data required for authentication.
* @param metadataName The metadata name associated with the request.
* @return String The result of the login process, which could include a session token or an error message.
**/
    @AuraEnabled()
    public static map<string,Object> login(CBHttpRequestWrapper wrapper,String startURL) {
        map<string,Object> result= new map<string,Object>();
        
        // Make HTTP request to third-party API
        String errorMsgCode='';
        String message='';
        String response = new CbApiController().makeHttpRequest(wrapper);

        if (string.isNotBlank(response)){
            Map<Boolean, String> CheckError=CBErrorHandler.checkApiResponseForError(response);
            if(CheckError.containsKey(true)){
                // Deserialize response into custom wrapper class
                CBLoginResponseWrapper responseWrapper = (CBLoginResponseWrapper) JSON.deserialize(response, CBLoginResponseWrapper.class);
                // Extract message code from response
                String messageCode='';
                if(!String.isBlank(responseWrapper?.header?.status?.message[0]?.messagecode)){
                    messageCode = responseWrapper?.header?.status?.message[0]?.messagecode;
                    // Log message code
                    logger.info('Login API messageCode: --> ' + messageCode);
                    logger.savelog();
                    String userId = responseWrapper?.userDetails?.userId;
                    // Retrieve username associated with the customerId
                    String sfusername = CBUtilityController.getUsername(userId);                                
                    // Log username
                    logger.info('Login username: --> ' + sfusername);
                    logger.savelog();
                    // Perform Salesforce login using retrieved username
                    String landingPageUrl = sfLogin(sfusername,startUrl); 
                    result.put('customerName', responseWrapper?.UserCustomerIdDetails?.UserCustomerIDDetails_REC[0]?.customerName);
                    result.put('lastLogin', responseWrapper?.UserDetails?.lastLoginTime);
                    result.put('customerId', responseWrapper?.UserDetails?.customerId);
                    result.put('loginUrl',landingPageUrl);
                    result.put('session',responseWrapper?.header?.session);
                    result.put('forcePwdChangeFlag',responseWrapper?.ForcePwdChangeSettings?.forcePwdChangeFlag);
                    if(responseWrapper?.UserDetails?.segmentName != 'RETS'){
                        result.put('segmentRets', true);
                    }else{
                        result.put('segmentRets', false);
                    }
                    return result;   
                }                
            }else{
                string messageCode=CheckError.get(false);
                String errorMsg = CBErrorHandler.getErrorMessage(messageCode, wrapper.metadataName);
                logger.error(errorMsg);
                logger.savelog();
                throw new CBErrorHandler.CBCustomLoginException(errorMsg);
            }
        }else{
            String errorMsg = CBErrorHandler.getErrorMessage('Default', wrapper.metadataName);
            logger.error(errorMsg);
            logger.savelog();
            throw new CBErrorHandler.CBCustomLoginException(errorMsg); 
        }
        
        return result;
        
    }
    
    
    /**
* @description This method performs a login action in Salesforce using the provided username. 
It constructs a login URL and logs the user into the system.
* @author Prateek Deshmukh | 04-22-2024 
* @param username The username of the user to be logged in.
* @return String The URL of the page after successful login or an error message if the login fails.
**/
    public static String sfLogin(String username, String startURL){

        // Perform login action
        ApexPages.PageReference lgn = Site.login(username, username, startURL);
        // Return login URL
        return lgn?.getUrl();    
        
    }
    
//     * @description This method performs a login action in Salesforce using the provided username. 
// It constructs a login URL and logs the user into the system.
// * @author Prateek Deshmukh | 04-22-2024 
// * @param username The username of the user to be logged in.
// * @return String The URL of the page after successful login or an error message if the login fails.
// **/
//     public static String sfLogin(String username, String startURL,String password){
//         // Perform login action
//         ApexPages.PageReference lgn = Site.login(username, password, startURL);
//         // Return login URL
//         return lgn?.getUrl();    
        
//     }


/*Created by SFDC Support to test the Biometric Scenario*/

@AuraEnabled
public static String doLoginStd(String un, String pwd, String startUrl){

    ApexPages.PageReference lgn = Site.login(un, pwd, startUrl);
    
    return lgn?.getUrl();    

}
    
    
    
}