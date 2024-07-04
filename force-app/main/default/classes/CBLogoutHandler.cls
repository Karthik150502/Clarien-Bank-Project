/**
 * @description       : 
 * @author            : Prateek Deshmukh
 * @group             : 
 * @last modified on  : 05-16-2024
 * @last modified by  : Prateek Deshmukh
**/
public class CBLogoutHandler {
    

     /**
     * @description : This method handles the logout operation, parsing the response body and checking for any errors.
                       If an error is detected, it logs the error message and throws a custom logout exception.
     * @author Prateek Deshmukh | 05-16-2024
     * @param responseBody The response body received from the logout API call.
     * @param wrapper The HTTP request wrapper containing metadata.
     * @return The message code extracted from the response if successful, otherwise an error message.
    **/
    public static string handleLogout(string responseBody,CBHttpRequestWrapper wrapper){
        String errorMsgCode='';
        String message='';
        if (string.isNotBlank(responseBody)){
            Map<Boolean, String> CheckError=CBErrorHandler.checkApiResponseForError(responseBody);
            if(CheckError.containsKey(true)){
                CBLogoutResponseWrapper responseWrapper =CBLogoutResponseWrapper.parse(responseBody);
                // Extract message code from response
                String messageCode = responseWrapper.header.status.message[0].messageCode;
                return messageCode;
            }else{
                string messageCode=CheckError.get(false);
                String errorMsg = CBErrorHandler.getErrorMessage(messageCode, wrapper.metadataName);
                logger.error(errorMsg);
                logger.savelog();
                throw new CBErrorHandler.CBCustomLogoutException(errorMsg);
            }
        }else{
            String errorMsg = CBErrorHandler.getErrorMessage('Default', wrapper.metadataName);
            logger.error(errorMsg);
            logger.savelog();
            throw new CBErrorHandler.CBCustomLogoutException(errorMsg); 
        }
        
    }
    
    
}