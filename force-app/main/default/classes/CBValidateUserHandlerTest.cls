@isTest
public class CBValidateUserHandlerTest {
    
    public static CBHttpRequestWrapper reqWrapper = new CBHttpRequestWrapper();
    
    @isTest
    public static void testHandleProfileSearch_Scenario1() {
        reqWrapper.payload = '{"requestUUID":"1709981883916","header":{"bankId":"040","languageId":"001","channelId":"G","loginFlag":"1","stateMode":"N","serviceId":"PWDCHG","opfmt":"XML","ipfmt":"XML","userPrincipal":"RETUSER5","corpPrincipal":"RETUSER5","formId":"8282","accessCode":"rusr@9889"},"pwdChangeRequest":{"signOnFlag":"Y","transactionFlag":"N","signOnPwd":"rusr@9889","signOnNewPwd":"test@7878","reTypeSignOnPwd":"test@7878","reTypeTransPwd":"","transactionPwd":"","transactionNewPwd":"","callMode":""}}';
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'CB_ValidateUser_API';
        String expectedResponse = '{"requestUUID":"1709981883917","header":{"status":{"message":[{"messageCode":"0000","messageDescription":"SUCCESS","messageType":"SU"}]},"session":{"sessionId":null,"fromId":null},"pagination":null}}';
        
        CB_MockHttpResponseGenerator mock = new CB_MockHttpResponseGenerator(200, 'OK', expectedResponse, null);
        Test.setMock(HttpCalloutMock.class, mock);
        String actualResponse = CBValidateUserHandler.handleValidateUser(expectedResponse, reqWrapper);
        System.assertEquals(actualResponse, '{"sessionId":null,"fromId":null}', 'Failed Assertion, mismatched Responses.');
    }
    
    @isTest
    public static void testHandleProfileSearch_Scenario2() {
        reqWrapper.payload = '{"requestUUID":"1709981883916","header":{"bankId":"040","languageId":"001","channelId":"G","loginFlag":"1","stateMode":"N","serviceId":"PWDCHG","opfmt":"XML","ipfmt":"XML","userPrincipal":"RETUSER5","corpPrincipal":"RETUSER5","formId":"8282","accessCode":"rusr@9889"},"pwdChangeRequest":{"signOnFlag":"Y","transactionFlag":"N","signOnPwd":"rusr@9889","signOnNewPwd":"test@7878","reTypeSignOnPwd":"test@7878","reTypeTransPwd":"","transactionPwd":"","transactionNewPwd":"","callMode":""}}';
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'CB_ValidateUser_API';
        String expectedResponse = '{"requestUUID":"1709981883917","header":{"status":{"message":[{"messageCode":"1111","messageDescription":"Failure","messageType":"SU"}]},"session":{"sessionId":null,"fromId":null},"pagination":null}}';
        
        CB_MockHttpResponseGenerator mock = new CB_MockHttpResponseGenerator(200, 'OK', expectedResponse, null);
        Test.setMock(HttpCalloutMock.class, mock);
        try{
        	String actualResponse = CBValidateUserHandler.handleValidateUser(expectedResponse, reqWrapper);
        }catch(Exception e) {
            System.assertEquals('Technical issues, please try again later', e.getMessage(), 'Failed Assertion, mismatched Responses.');
    	}
    }
    
    @isTest
    public static void testHandleProfileSearch_Scenario3() {
        reqWrapper.payload = '{"requestUUID":"1709981883916","header":{"bankId":"040","languageId":"001","channelId":"G","loginFlag":"1","stateMode":"N","serviceId":"PWDCHG","opfmt":"XML","ipfmt":"XML","userPrincipal":"RETUSER5","corpPrincipal":"RETUSER5","formId":"8282","accessCode":"rusr@9889"},"pwdChangeRequest":{"signOnFlag":"Y","transactionFlag":"N","signOnPwd":"rusr@9889","signOnNewPwd":"test@7878","reTypeSignOnPwd":"test@7878","reTypeTransPwd":"","transactionPwd":"","transactionNewPwd":"","callMode":""}}';
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'CB_ValidateUser_API';
                
        CB_MockHttpResponseGenerator mock = new CB_MockHttpResponseGenerator(200, 'OK', '', null);
        Test.setMock(HttpCalloutMock.class, mock);
        try{
        	String actualResponse = CBValidateUserHandler.handleValidateUser('', reqWrapper);
        }catch(Exception e) {
            System.assertEquals('Technical issues, please try again later', e.getMessage(), 'Failed Assertion, mismatched Responses.');
    	}
    }
}