public class CBVirtualSignInHandler {
    public static string handleVirtualSignIn(String response, CBHttpRequestWrapper wrapper){
        if (string.isNotBlank(response)){
            Map<Boolean, String> ChecError=CBErrorHandler.checkApiResponseForError(response);
                if(ChecError.containsKey(true)){
                    CBVirtualSignInResponseWrapper responseWrapper = CBVirtualSignInResponseWrapper.parse(response);
                    if (!String.isBlank(responseWrapper?.header?.status?.message[0]?.messageCode)) {
                        String messageCode = responseWrapper.header.status.message[0].messageCode;
                        // Successful response, check if userDetails is not empty
                        CBVirtualSignInResponseWrapper.Session sessionDetails = responseWrapper.header.session;
                        if (sessionDetails != null) {
                            return(string)System.JSON.serialize(sessionDetails);
                        } else {
                            // Handle empty userDetails
                            throw new CBErrorHandler.CBCustomVirtualSignInException('Session details not found');
                        }
                    }
                }else{
                    string messageCode=ChecError.get(false);
                    String errorMsg = CBErrorHandler.getErrorMessage(messageCode, wrapper.metadataName);
                    logger.error(errorMsg);
                    logger.savelog();
                    throw new CBErrorHandler.CBCustomVirtualSignInException(errorMsg);
                }
        }else{
            String errorMsg = CBErrorHandler.getErrorMessage('Default', wrapper.metadataName);
            logger.error(errorMsg);
            logger.savelog();
            throw new CBErrorHandler.CBCustomVirtualSignInException(errorMsg); 
        }
        return null;
    }
}