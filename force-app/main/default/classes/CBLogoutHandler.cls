public class CBLogoutHandler {
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