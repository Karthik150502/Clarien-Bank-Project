@isTest
public class CBProfileSearchHandlerTest {
	public static CBHttpRequestWrapper reqWrapper = new CBHttpRequestWrapper();
    	
    @isTest
    public static void test_profileSearchApi_Scenerio1() {
        
    	reqWrapper.payload = '{"requestUUID":"REQ_1709981883916","header":{"channelId":"G","loginFlag":"1","serviceId":"USRDET","stateMode":"Y","userPrincipal":"RETUSER1","corpPrincipal":"RETUSER1","accessCode":"infy@123","formId":"8293"}}';
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'CB_Post_Profile_Search';
        
        CB_MockHttpResponseGenerator mock = new CB_MockHttpResponseGenerator(200, 'SessionExpired', null, null);  
        Test.setMock(HttpCalloutMock.class, mock);
        try{
            String response = CBProfileSearchHandler.handleProfileSearch('', reqWrapper);
        }catch(Exception e) {
            System.assertEquals(e.getMessage(), 'Technical issues, Please try again later', 'Failed Assertion, mismatched Responses.'); 
        }
    }
        
    @isTest
    public static void test_profileSearchApi_Scenerio2() {
        reqWrapper.payload = '{"requestUUID":"REQ_1709981883916","header":{"channelId":"G","loginFlag":"1","serviceId":"USRDET","stateMode":"Y","userPrincipal":"RETUSER1","corpPrincipal":"RETUSER1","accessCode":"infy@123","formId":"8293"}}';
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'CB_Post_Profile_Search';
        
        String responseBody ='{"requestUUID":"REQ_1709981883916","header":{"status":{"message":[{"messageCode":"0000","messageDescription":"SUCCESS","messageType":"SU"}]},"session":{"sessionId":"WgqEv-MQJIcQ32WGoClbm4YDafPMOCgFnWa8Gvf4.awcanclrnfndv01","fromId":"986"}},"userDetails":{"bayUserId":"RETUSER1","cLName":"ROY","corpUser":"RETUSER1","corpUserType":"RM","cMPhoneNo":"1234567890","cEmailId":"aaa@gmail.com"}}';
        CB_MockHttpResponseGenerator mock2 = new CB_MockHttpResponseGenerator(200, 'SessionExpired', responseBody, null);  
        Test.setMock(HttpCalloutMock.class, mock2);
        try{
            String response = CBProfileSearchHandler.handleProfileSearch(responseBody, reqWrapper);
        }catch(Exception e2) {
            System.assertEquals(e2.getMessage(), 'Technical issues, Please try again later', 'Failed Assertion, mismatched Responses.'); 
        }
    }
        
    @isTest
    public static void test_profileSearchApi_Scenerio3() {
        reqWrapper.payload = '{"requestUUID":"REQ_1709981883916","header":{"channelId":"G","loginFlag":"1","serviceId":"USRDET","stateMode":"Y","userPrincipal":"RETUSER1","corpPrincipal":"RETUSER1","accessCode":"infy@123","formId":"8293"}}';
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'CB_Post_Profile_Search';
        
        String responseBody = '{"requestUUID":"REQ_1709981883916","header":{"status":{"message":[{"messageCode":"2400","MESSAGE_DESC":"Session expired please login again","MESSAGE_TYPE":"FATAL_EXCEPTION"}]}}}';
        CB_MockHttpResponseGenerator mock3 = new CB_MockHttpResponseGenerator(200, 'SessionExpired', responseBody, null);  
        Test.setMock(HttpCalloutMock.class, mock3);
        try{
            String response = CBProfileSearchHandler.handleProfileSearch(responseBody, reqWrapper);
            System.assertEquals(response, responseBody, 'Failed Assertion, mismatched Responses.');
        }catch(exception e){
            System.assertEquals(e.getMessage(), 'Technical issues, Please try again later', 'Failed Assertion, mismatched Responses.');
        }
    }
    
    @isTest
    public static void test_profileSearchApi_Scenerio4() {
        reqWrapper.payload = '{"requestUUID":"REQ_1709981883916","header":{"channelId":"G","loginFlag":"1","serviceId":"USRDET","stateMode":"Y","userPrincipal":"RETUSER1","corpPrincipal":"RETUSER1","accessCode":"infy@123","formId":"8293"}}';
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'CB_Post_Profile_Search';
        
        String responseBody = '{"requestUUID":"1709981883916","ErrorResponse":{"header":{"STATUS":{"MESSAGE":{"MESSAGE_CODE":"101219","MESSAGE_DESC":"Invalid BANK_ID in caps is passed in the URL","MESSAGE_TYPE":"FATAL_EXCEPTION"}}}}}';
        CB_MockHttpResponseGenerator mock4 = new CB_MockHttpResponseGenerator(200, 'SessionExpired', responseBody, null);  
        Test.setMock(HttpCalloutMock.class, mock4);
        try{
            String response = CBProfileSearchHandler.handleProfileSearch(responseBody, reqWrapper);
            System.assertEquals(response, responseBody, 'Failed Assertion, mismatched Responses.');
        }
        catch(exception e){
            System.assertEquals(e.getMessage(), 'Technical API error', 'Failed Assertion, mismatched Responses.');
        }
    }
    
    @isTest
    public static void test_profileSearchApi_Scenerio5() {
        reqWrapper.payload = '{"requestUUID":"REQ_1709981883916","header":{"channelId":"G","loginFlag":"1","serviceId":"USRDET","stateMode":"Y","userPrincipal":"RETUSER1","corpPrincipal":"RETUSER1","accessCode":"infy@123","formId":"8293"}}';
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'CB_Post_Profile_Search';
        
         
        String responseBody = '"requestUUID":"1709981883916","ErrorResponse":{"header":{"STATUS":{"MESSAGE":{"MESSAGE_CODE":"101219","MESSAGE_DESC":"Invalid BANK_ID in caps is passed in the URL","MESSAGE_TYPE":"FATAL_EXCEPTION"}}}}}';
        CB_MockHttpResponseGenerator mock5 = new CB_MockHttpResponseGenerator(200, 'SessionExpired', responseBody, null);  
        Test.setMock(HttpCalloutMock.class, mock5);
        try{
            String response = CBProfileSearchHandler.handleProfileSearch(responseBody, reqWrapper);
            System.assertEquals(response, responseBody, 'Failed Assertion, mismatched Responses.');
        }
        catch(exception e){
            System.assertEquals(e.getMessage(), 'Technical API error', 'Failed Assertion, mismatched Responses.');
        }
    }
    
    @isTest
    public static void test_profileSearchApi_Scenerio6() {
        reqWrapper.payload = '{"requestUUID":"REQ_1709981883916","header":{"channelId":"G","loginFlag":"1","serviceId":"USRDET","stateMode":"Y","userPrincipal":"RETUSER1","corpPrincipal":"RETUSER1","accessCode":"infy@123","formId":"8293"}}';
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'CB_Post_Profile_Search';
        
        
        String responseBody ='{"requestUUID":"REQ_1709981883916","header":{"status":{"message":[{"messageCode":"0000","messageDescription":"SUCCESS","messageType":"SU"}]},"session":{"sessionId":"WgqEv-MQJIcQ32WGoClbm4YDafPMOCgFnWa8Gvf4.awcanclrnfndv01","fromId":"986"}},"userDetails":{"name":"test","phone":"123456"}}';
        CB_MockHttpResponseGenerator mock6 = new CB_MockHttpResponseGenerator(200, 'SessionExpired', responseBody, null);  
        Test.setMock(HttpCalloutMock.class, mock6);
        try{
            String response = CBProfileSearchHandler.handleProfileSearch(responseBody, reqWrapper);
            System.assertEquals(response, '{"corpUserType":null,"corpUser":null,"cMPhoneNo":null,"cLName":null,"cEmailId":null,"bayUserId":null}', 'Failed Assertion, mismatched Responses.');
        }
        catch(exception e){
            System.assertEquals(e.getMessage(), '', 'Failed Assertion, mismatched Responses.');
        }
    }
}