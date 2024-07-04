/**
 * @description       : 
 * @author            : Prateek Deshmukh
 * @group             : Prateek Deshmukh,Aditya S,Mahalakshmi 
 * @last modified on  : 06-04-2024
 * @last modified by  : Prateek Deshmukh
**/
public class CBApiController {
	private CBRequestBuilder requestBuilder;
    private HttpRequest request;
    private HttpResponse response;

    

    /**
    * @description : Makes an HTTP request using the provided CBHttpRequestWrapper and returns the response body as a string.
    * This method constructs an HttpRequest using the CBHttpRequestWrapper object passed as a parameter. 
    * It then makes an HTTP callout using the constructed request and logs the response status code 
    * and body using the Logger utility. Finally, it returns the response body as a string.
    * @author Prateek Deshmukh | 04-23-2024 
    * @param wrapper 
    * @return String 
    **/
    public String makeHttpRequest(CBHttpRequestWrapper wrapper) {
    	requestBuilder = new CBRequestBuilder();
        request = requestBuilder.buildHttpRequest(wrapper);
        response = new CBApiCallOut().makeHttpCallOut(request);
        logger.savelog();
        if(response.getStatusCode()>=300 || response.getStatusCode()<200){
             throw new CBErrorHandler.CBCustomAPIException(string.valueof(response.getStatusCode()));
        }
        return response.getBody();    
    }

    /**
    * @description : API callout for fetching the Exchange Rates Details
    * @param {CBHttpRequestWrapper} wrapper  
    * @return {String} The API response, sent to LWC as a String
    **/
    @AuraEnabled(cacheable=true)
    public static String fetchExchangeRate(CBHttpRequestWrapper reqWrapper) {
        return new CBApiController().makeHttpRequest(reqWrapper);
    }
    
    
    /**
    * @description : Performing the Forgot Password API callout.
    * @param {CBHttpRequestWrapper} wrapper  
    * @return {String} The API response, sent to LWC as a String
    **/
    @AuraEnabled(cacheable=true)
    public static String forgetPassword(CBHttpRequestWrapper reqWrapper) {
         String response = new CbApiController().makeHttpRequest(reqWrapper);
        return CBForgotPasswordHandler.handleForgotPassword(response,reqWrapper);
    }
    

    
    /**
    * @description : Performing the Virtual Signin API callout.
    * @param {CBHttpRequestWrapper} wrapper  
    * @return {String} The API response, sent to LWC as a String
    **/
    @AuraEnabled(cacheable=true)
    public static String virtualUserSignIn(CBHttpRequestWrapper reqWrapper) {
        String response = new CbApiController().makeHttpRequest(reqWrapper);
        return CBVirtualSignInHandler.handleVirtualSignIn(response, reqWrapper);
    }
    
    
    
    /**
    * @description : Performing the Validate User API callout.
    * @param {CBHttpRequestWrapper} wrapper  
    * @return {String} The API response, sent to LWC as a String
    **/
   	@AuraEnabled(cacheable=true)
    public static String validateUser(CBHttpRequestWrapper reqWrapper) {
        String response = new CbApiController().makeHttpRequest(reqWrapper);
        return CBValidateUserHandler.handleValidateUser(response, reqWrapper);
    }
    
    /**
    * @description : Performing the Validate User API callout.
    * @param {CBHttpRequestWrapper} wrapper  
    * @return {String} The API response, sent to LWC as a String
    **/
    @AuraEnabled(cacheable=true)
    public static String signOut(CBHttpRequestWrapper reqWrapper) {
        string response =new CbApiController().makeHttpRequest(reqWrapper);
        return CBLogoutHandler.handleLogout(response,reqWrapper);
    }
    
    /**
    * @description : Performing the Validate User API callout.
    * @param {CBHttpRequestWrapper} wrapper  
    * @return {String} The API response, sent to LWC as a String
    **/
    @AuraEnabled(cacheable=true)
    public static String forceChangePassword(CBHttpRequestWrapper reqWrapper) {
        return new CbApiController().makeHttpRequest(reqWrapper);
    }
    
    
    /**
    * @description : Performing the ProfileUpdate API callout.
    * @param {CBHttpRequestWrapper} wrapper  
    * @return {String} The API response, sent to LWC as a String
    **/
    @AuraEnabled(cacheable=true)
    public static String profileUpdate(CBHttpRequestWrapper reqWrapper) {
        String response = new CbApiController().makeHttpRequest(reqWrapper);
		return CBProfileUpdateHandler.handleProfileUpdate(response, reqWrapper);
    }
    
    /**
    * @description : Performing the ChangePassword API callout.
    * @param {CBHttpRequestWrapper} wrapper  
    * @return {String} The API response, sent to LWC as a String
    **/
    @AuraEnabled(cacheable=true)
    public static String changePassword(CBHttpRequestWrapper reqWrapper) {
        String response = new CbApiController().makeHttpRequest(reqWrapper);
        return CBChangePasswordHandler.handleChangePassword(response,reqWrapper);
    }
    
    /**
    * @description : Performing the SearchProfile API callout.
    * @param {CBHttpRequestWrapper} wrapper  
    * @return {String} The API response, sent to LWC as a String
    **/
    @AuraEnabled(cacheable=true)
    public static String searchProfile(CBHttpRequestWrapper reqWrapper) {
        string response= new CbApiController().makeHttpRequest(reqWrapper);
        return CBProfileSearchHandler.handleProfileSearch(response, reqWrapper);
    }
    
    /**
    * @description : Performing the Document Search API callout.
    * @param {CBHttpRequestWrapper} wrapper  
    * @return {String} The API response, sent to LWC as a String
    **/
    @AuraEnabled(cacheable=true)
    public static String docSearch(CBHttpRequestWrapper reqWrapper) {
        return new CbApiController().makeHttpRequest(reqWrapper);
    }

    /**
    * @description : Performing the Document Download API callout.
    * @param {CBHttpRequestWrapper} wrapper  
    * @return {String} The API response, sent to LWC as a String
    **/
    @AuraEnabled(cacheable=true)
    public static String docDownload(CBHttpRequestWrapper reqWrapper) {
        return new CbApiController().makeHttpRequest(reqWrapper);
    }




    /**
    * @description : API for creating TOP-Up Account.
    * @param {CBHttpRequestWrapper} reqWrapper  
    * @return {String} The API response, sent to LWC as a String
    **/
    @AuraEnabled(cacheable=true)
    public static String createTopUpAccount(CBHttpRequestWrapper reqWrapper) {
        string response= new CbApiController().makeHttpRequest(reqWrapper);
        return response;
    }
	
    /**
    * @description : API for creating Time Deposit Account.
    * @param {CBHttpRequestWrapper} reqWrapper  
    * @return {String} The API response, sent to LWC as a String
    **/
    @AuraEnabled(cacheable=true)
    public static String createTimeDepositAccount(CBHttpRequestWrapper reqWrapper) {
        string response= new CbApiController().makeHttpRequest(reqWrapper);
        return response;
    }


    
    /**
    * @description : API for creating Savings Account.
    * @param {CBHttpRequestWrapper} reqWrapper  
    * @return {String} The API response, sent to LWC as a String
    **/
    @AuraEnabled(cacheable=true)
    public static String createSavingsAccount(CBHttpRequestWrapper reqWrapper) {
        string response= new CbApiController().makeHttpRequest(reqWrapper);
        return response;
    }
    
    /**
    * @description : API for creating Checking Account.
    * @param {CBHttpRequestWrapper} reqWrapper  
    * @return {String} The API response, sent to LWC as a String
    **/
    @AuraEnabled(cacheable=true)
    public static String createCheckingAccount(CBHttpRequestWrapper reqWrapper) {
        string response= new CbApiController().makeHttpRequest(reqWrapper);
        return response;
    }

}