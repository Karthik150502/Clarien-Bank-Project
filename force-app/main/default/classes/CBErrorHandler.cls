/**
* @description       : 
* @author            : Prateek Deshmukh
* @group             : 
* @last modified on  : 05-10-2024
* @last modified by  : Prateek Deshmukh
**/
public class CBErrorHandler {
    public class CBCustomLoginException extends exception{}
    public class CBCustomLogoutException extends exception{}
    public class CBCustomProfileUpdateException extends exception{}
    public class CBCustomAPIException extends exception{}
    public class CBCustomProfileSearchException extends exception{}
    public class CBCustomVirtualSignInException extends exception{}
    public class CBCustomValidateUserException extends exception{}
    public class CBCustomForgotPasswordException extends exception{}
    public class CBCustomRetCusInqException extends exception{}
    public class CBCustomChangePasswordException extends exception{}
    public class CBCustomGenAccInqException extends exception{}
    public class CBServiceRequestException extends exception{}
   	public class CBCustomLoanAccInqException extends exception{}
    public class CBSavingsAccountOpenException extends exception{}
    public class CBChequingAccountOpenException extends exception{}


    /**
* @description Retrieves an error message based on the message code and metadata name.
* @param messageCode  The code identifying the error message.
* @param metadataName The name of the metadata associated with the error message.
* @return The error message corresponding to the provided code and metadata name.
*         If no specific error message is found, a default error message associated with the metadata is returned.
* @author Prateek Deshmukh | 05-02-2024 
**/
    @AuraEnabled
    public static String getErrorMessage(String messageCode, String metadataName) {
        String message = '';
        try {
            String msgCode = metadataName +'_'+ messageCode;
            message = String.valueOf(System.Label.get('', msgCode));
            // message = String.valueOf(System.Label.get('', messageCode));
        } catch(Exception e) {
            String defaultMsgCode = metadataName + '_Default';
            message = String.valueOf(System.Label.get('', defaultMsgCode));
        }
        return message;
    }
    public static String getErrorMessage(String labelName) {
        String message = '';
        try {
            message = String.valueOf(System.Label.get('', labelName));
        } catch(Exception e) {
            message = String.valueOf(System.Label.get('', 'CB_default_Internal_error'));
        }
        return message;
    }
    
    /**
* @description Checks the API response for errors and returns a map indicating success or failure along with an error message, if applicable.
* @param jsonResponse The JSON response from the API.
* @return A map containing a boolean indicating success (true) or failure (false) and an error message, if any.
*         If the response indicates success, the boolean is true and the error message is null.
*         If the response indicates failure, the boolean is false and the error message contains the error code.
* @author Prateek Deshmukh | 05-02-2024 
* @param jsonResponse 
**/
    public static Map<Boolean, String> checkApiResponseForError(String jsonResponse) {
        final String defaultErrorMessage = System.Label.get('', 'CB_Deafult_API_Error');
        final String SUCCESS_MESSAGE_CODE_1 = '0000';
        final String SUCCESS_MESSAGE_CODE_2 = '8501';
        final String SUCCESS_MESSAGE_CODE_3 = '15520';
        
        
        Map<Boolean, String> result = new Map<Boolean, String>();
        
        try {
            Map<String, Object> parsedJson = (Map<String, Object>) JSON.deserializeUntyped(jsonResponse);
            
            String messageCode = null;
            
            if (parsedJson.containsKey('ErrorResponse')) {
                Map<String, Object> errorResponse = (Map<String, Object>) parsedJson.get('ErrorResponse');
                Map<String, Object> header = (Map<String, Object>) errorResponse.get('header');
                Map<String, Object> status = (Map<String, Object>) header.get('STATUS');
                messageCode = (String) status.get('MESSAGE_CODE');
            }
            
            if (messageCode == null && parsedJson.containsKey('header')) {
                Map<String, Object> header = (Map<String, Object>) parsedJson.get('header');
                Map<String, Object> status = (Map<String, Object>) header.get('status');
                List<Object> messages = (List<Object>) status.get('message');
                
                if (!messages.isEmpty()) {
                    Map<String, Object> message = (Map<String, Object>) messages[0];
                    messageCode = (String) message.get('messageCode');
                }
            }
            
            if (messageCode == null && parsedJson.containsKey('error')) {
                Map<String, Object> error = (Map<String, Object>) parsedJson.get('error');
                messageCode = (String) error.get('errorCode');
            }
            
            if (messageCode != null && !messageCode.equals(SUCCESS_MESSAGE_CODE_1)&& !messageCode.equals(SUCCESS_MESSAGE_CODE_2)&& !messageCode.equals(SUCCESS_MESSAGE_CODE_3)) {
                    result.put(false, messageCode);
                    return result;
                }
        } catch (Exception e) {
            throw new CBErrorHandler.CBCustomAPIException(defaultErrorMessage);
        }
        
        result.put(true, null);
        return result;
    }
    
}