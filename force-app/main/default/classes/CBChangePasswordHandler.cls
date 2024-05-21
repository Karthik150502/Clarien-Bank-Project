public class CBChangePasswordHandler {
 public static string handleChangePassword(String response, CBHttpRequestWrapper wrapper){
        if (string.isNotBlank(response)){
            Map<Boolean, String> ChecError=CBErrorHandler.checkApiResponseForError(response);
                if(ChecError.containsKey(true)){
                    CBChangePasswordResponseWrapper responseWrapper = CBChangePasswordResponseWrapper.parse(response);
                    if (!String.isBlank(responseWrapper?.header?.status?.message[0]?.messageCode)) {
                        String messageCode = responseWrapper.header.status.message[0].messageCode;
                        // Successful response, check if userDetails is not empty
                        CBChangePasswordResponseWrapper.Message messageDetails = responseWrapper?.header?.status?.message[0];
                        if (messageDetails != null) {
                            return(string)System.JSON.serialize(messageDetails);
                        } else {
                            // Handle empty userDetails
                            throw new CBErrorHandler.CBCustomChangePasswordException('Message details not found');
                        }
                    }
                }else{
                    string messageCode=ChecError.get(false);
                    String errorMsg = CBErrorHandler.getErrorMessage(messageCode, wrapper.metadataName);
                    logger.error(errorMsg);
                    logger.savelog();
                    throw new CBErrorHandler.CBCustomChangePasswordException(errorMsg);
                }
        }else{
            String errorMsg = CBErrorHandler.getErrorMessage('Default', wrapper.metadataName);
            logger.error(errorMsg);
            logger.savelog();
            throw new CBErrorHandler.CBCustomChangePasswordException(errorMsg); 
        }
        return null;
    }
}