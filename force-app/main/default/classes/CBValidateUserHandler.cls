public class CBValidateUserHandler {
    public static string handleValidateUser(String response, CBHttpRequestWrapper wrapper){
        if (string.isNotBlank(response)){
            Map<Boolean, String> ChecError=CBErrorHandler.checkApiResponseForError(response);
                if(ChecError.containsKey(true)){
                    CBValidateUserResponseWrapper responseWrapper = CBValidateUserResponseWrapper.parse(response);
                    if (!String.isBlank(responseWrapper?.header?.status?.message[0]?.messageCode)) {
                        String messageCode = responseWrapper.header.status.message[0].messageCode;
                        // Successful response, check if userDetails is not empty
                        CBValidateUserResponseWrapper.Session session = responseWrapper.header.session;
                        if (session != null) {
                            return(string)System.JSON.serialize(session);
                        } else {
                            // Handle empty userDetails
                            throw new CBErrorHandler.CBCustomValidateUserException('Session details not found');
                        }
                    }
                }else{
                    string messageCode=ChecError.get(false);
                    String errorMsg = CBErrorHandler.getErrorMessage(messageCode, wrapper.metadataName);
                    logger.error(errorMsg);
                    logger.savelog();
                    throw new CBErrorHandler.CBCustomValidateUserException(errorMsg);
                }
        }else{
             String errorMsg = CBErrorHandler.getErrorMessage('Default', wrapper.metadataName);
            logger.error(errorMsg);
            logger.savelog();
            throw new CBErrorHandler.CBCustomValidateUserException(errorMsg); 
        }
        return null;
    }
    
}