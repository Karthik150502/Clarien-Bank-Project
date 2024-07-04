public class CBForgotPasswordHandler {
    public static String handleForgotPassword(String response, CBHttpRequestWrapper wrapper){
		map<string,Object> result= new map<string,Object>();
        if (string.isNotBlank(response)){
            Map<Boolean, String> ChecError=CBErrorHandler.checkApiResponseForError(response);
                if(ChecError.containsKey(true)){
                    CBForgotPasswordResponseWrapper responseWrapper = CBForgotPasswordResponseWrapper.parse(response);
                    if (!String.isBlank(responseWrapper?.header?.status?.message[0]?.messageCode)) {
                        String sessionId = responseWrapper?.header?.session?.sessionId;
                        result.put('SessionId', 'jsessionid=' + sessionId.substring(0,sessionId.indexOf('.')));
                        result.put('formId', responseWrapper?.header?.session?.fromId);
                        result.put('isSuccess', true);
                        String messageCode = responseWrapper?.header?.status?.message[0]?.messageCode;
                        String message = CBUtilityController.getMessage(messageCode, wrapper.metadataName);
                        result.put('message', message);
                        return (string)System.JSON.serialize(result);
                    }
                }else{
                    CBForgotPasswordResponseWrapper responseWrapper = CBForgotPasswordResponseWrapper.parse(response);
                    if(!String.isBlank(responseWrapper?.header?.session?.sessionId)) {
                        String sessionId = responseWrapper?.header?.session?.sessionId;
                        result.put('SessionId', 'jsessionid=' + sessionId.substring(0,sessionId.indexOf('.')));
                        result.put('formId', responseWrapper?.header?.session?.fromId);
                        result.put('isSuccess', false);
                    }
                    

                    string messageCode=ChecError.get(false);
                    String errorMsg = CBErrorHandler.getErrorMessage(messageCode, wrapper.metadataName);
                    logger.error(errorMsg);
                    logger.savelog();
                    result.put('message', errorMsg);
                    return (string)System.JSON.serialize(result); 
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