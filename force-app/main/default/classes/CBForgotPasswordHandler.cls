public class CBForgotPasswordHandler {
    public static string handleForgotPassword(String response, CBHttpRequestWrapper wrapper){
        if (string.isNotBlank(response)){
            Map<Boolean, String> ChecError=CBErrorHandler.checkApiResponseForError(response);
                if(ChecError.containsKey(true)){
                    CBForgotPasswordResponseWrapper responseWrapper = CBForgotPasswordResponseWrapper.parse(response);
                    if (!String.isBlank(responseWrapper?.header?.status?.message[0]?.messageCode)) {
                        String messageCode = responseWrapper.header.status.message[0].messageCode;
                        // Successful response, check if userDetails is not empty
                        CBForgotPasswordResponseWrapper.Message messageDetails = responseWrapper.header.status.message[0];
                        if (messageDetails != null) {
                            return(string)System.JSON.serialize(messageDetails);
                        } else {
                            // Handle empty userDetails
                            throw new CBErrorHandler.CBCustomForgotPasswordException('Message details not found');
                        }
                    }
                }else{
                    string messageCode=ChecError.get(false);
                    String errorMsg = CBErrorHandler.getErrorMessage(messageCode, wrapper.metadataName);
                    logger.error(errorMsg);
                    logger.savelog();
                    throw new CBErrorHandler.CBCustomForgotPasswordException(errorMsg);
                }
        }else{
            String errorMsg = CBErrorHandler.getErrorMessage('Default', wrapper.metadataName);
            logger.error(errorMsg);
            logger.savelog();
            throw new CBErrorHandler.CBCustomForgotPasswordException(errorMsg); 
        }
        return null;
    }
}