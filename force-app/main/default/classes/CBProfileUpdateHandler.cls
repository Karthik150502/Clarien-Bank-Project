public class CBProfileUpdateHandler {
    public static string handleProfileUpdate(String response, CBHttpRequestWrapper wrapper){
        if (string.isNotBlank(response)){
            Map<Boolean, String> ChecError=CBErrorHandler.checkApiResponseForError(response);
                if(ChecError.containsKey(true)){
                    CBProfileUpdateResponseWrapper responseWrapper = CBProfileUpdateResponseWrapper.parse(response);
                    CBProfileUpdateResponseWrapper.Message messageDetails = responseWrapper?.header?.status?.message[0];
                    if (messageDetails != null) {
                         return(string)System.JSON.serialize(messageDetails);
                    } else {
                        // Handle empty userDetails
                        throw new CBErrorHandler.CBCustomProfileUpdateException('Message details not found');
                    }
                }else{
                    string messageCode=ChecError.get(false);
                    String errorMsg = CBErrorHandler.getErrorMessage(messageCode, wrapper.metadataName);
                    logger.error(errorMsg);
                    logger.savelog();
                    throw new CBErrorHandler.CBCustomProfileUpdateException(errorMsg);
                }
        }else{
            String errorMsg = CBErrorHandler.getErrorMessage('Default', wrapper.metadataName);
            logger.error(errorMsg);
            logger.savelog();
            throw new CBErrorHandler.CBCustomProfileUpdateException(errorMsg); 
        }
    }
}