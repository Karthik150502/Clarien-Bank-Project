public class CBProfileSearchHandler {
    public static string handleProfileSearch(String response, CBHttpRequestWrapper wrapper){
        if (string.isNotBlank(response)){
            Map<Boolean, String> ChecError=CBErrorHandler.checkApiResponseForError(response);
                if(ChecError.containsKey(true)){
                    CBProfileSearchResponseWrapper responseWrapper = CBProfileSearchResponseWrapper.parse(response);
                    if (!String.isBlank(responseWrapper?.header?.status?.message[0]?.messageCode)) {
                        String messageCode = responseWrapper.header.status.message[0].messageCode;
                        // Successful response, check if userDetails is not empty
                        CBProfileSearchResponseWrapper.UserDetails userDetails = responseWrapper.userDetails;
                        if (userDetails != null) {
                            return(string)System.JSON.serialize(userDetails);
                        } else {
                            // Handle empty userDetails
                            throw new CBErrorHandler.CBCustomProfileSearchException('User details not found');
                        }
                    }
                }else{
                    string messageCode=ChecError.get(false);
                    String errorMsg = CBErrorHandler.getErrorMessage(messageCode, wrapper.metadataName);
                    logger.error(errorMsg);
                    logger.savelog();
                    throw new CBErrorHandler.CBCustomProfileSearchException(errorMsg);
                }
        }else{
             String errorMsg = CBErrorHandler.getErrorMessage('Default', wrapper.metadataName);
            logger.error(errorMsg);
            logger.savelog();
            throw new CBErrorHandler.CBCustomProfileSearchException(errorMsg); 
        }
        return null;
    }
}