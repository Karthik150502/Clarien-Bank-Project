@isTest
public class CBProfileUpdateHandlerTest {
    public static CBHttpRequestWrapper reqWrapper = new CBHttpRequestWrapper();
    
	@IsTest
    public static void test_ProfileUpdateApi_Scenerio1() {
        reqWrapper.payload = '{"requestUUID":"REQ_1709981883916","header":{"channelId":"I","loginFlag":"3","serviceId":"MCUIDI","stateMode":"Y","userId":"INFOSYS.ANBA","userPrincipal":"040.BULKVU","corpPrincipal":"040","accessCode":"a","formId":"67900"},"userMaintenanceMUser":{"bayUserId":"INFOSYS","corpUserType":"NORMAL","userType":2,"corpUser":"ANBA","cEmailId":"ramesh@gmail.com","cMPhoneNo":"5555667989"}}';
    	reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
    	reqWrapper.metadataName = 'CB_Post_Profile_Update';
        String responseBody = '{"requestUUID":"REQ_1709981883916","ErrorResponse":{"header":{"STATUS":{"MESSAGE":{"MESSAGE_CODE":"0000","MESSAGE_DESC":"Session expired  please login again","MESSAGE_TYPE":"FATAL_EXCEPTION"}}}}}';
        CB_MockHttpResponseGenerator mock = new CB_MockHttpResponseGenerator(200, 'SessionExpired', responseBody, null);  
        Test.setMock(HttpCalloutMock.class, mock);
        try{
            String result = CBProfileUpdateHandler.handleProfileUpdate(responseBody, reqWrapper);
        }catch(Exception e) {
            System.assertEquals(e.getMessage(), 'Technical API error', 'Failed Assertion, mismatched Responses.'); 
        }
    }
     
    @IsTest
    public static void test_ProfileUpdateApi_Scenerio2() {
        reqWrapper.payload = '{"requestUUID":"REQ_1709981883916","header":{"channelId":"I","loginFlag":"3","serviceId":"MCUIDI","stateMode":"Y","userId":"INFOSYS.ANBA","userPrincipal":"040.BULKVU","corpPrincipal":"040","accessCode":"a","formId":"67900"},"userMaintenanceMUser":{"bayUserId":"INFOSYS","corpUserType":"NORMAL","userType":2,"corpUser":"ANBA","cEmailId":"ramesh@gmail.com","cMPhoneNo":"5555667989"}}';
    	reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
    	reqWrapper.metadataName = 'CB_Post_Profile_Update';
        String responseBody2 = '{"requestUUID":"REQ_1709981883916","header":{"status":{"message":[{"messageCode":"0000","MESSAGE_DESC":"Session expired please login again","MESSAGE_TYPE":"FATAL_EXCEPTION"}]}}}';
        CB_MockHttpResponseGenerator mock2 = new CB_MockHttpResponseGenerator(200, 'SessionExpired', responseBody2, null);  
        Test.setMock(HttpCalloutMock.class, mock2);
        String response2 = CBProfileUpdateHandler.handleProfileUpdate(responseBody2, reqWrapper);
        System.assertEquals(response2, '{"messageType":null,"messageDescription":null,"messageCode":"0000"}', 'Failed Assertion, mismatched Responses.'); 
    }
    
    @IsTest
    public static void test_ProfileUpdateApi_Scenerio3() {
        reqWrapper.payload = '{"requestUUID":"REQ_1709981883916","header":{"channelId":"I","loginFlag":"3","serviceId":"MCUIDI","stateMode":"Y","userId":"INFOSYS.ANBA","userPrincipal":"040.BULKVU","corpPrincipal":"040","accessCode":"a","formId":"67900"},"userMaintenanceMUser":{"bayUserId":"INFOSYS","corpUserType":"NORMAL","userType":2,"corpUser":"ANBA","cEmailId":"ramesh@gmail.com","cMPhoneNo":"5555667989"}}';
    	reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
   		reqWrapper.metadataName = 'CB_Post_Profile_Update';
        String responseBody3 = '{"requestUUID":"REQ_1709981883916","header":{"status":{"message":[{"messageCode":"1111","MESSAGE_DESC":"Session expired please login again","MESSAGE_TYPE":"FATAL_EXCEPTION"}]}}}';
        CB_MockHttpResponseGenerator mock3 = new CB_MockHttpResponseGenerator(200, 'SessionExpired', responseBody3, null);  
        Test.setMock(HttpCalloutMock.class, mock3);
        try {
            String response3 = CBProfileUpdateHandler.handleProfileUpdate(responseBody3, reqWrapper);
        }
        catch(Exception e) {
        	System.assertEquals(e.getMessage(), 'Technical issues, Please try again later', 'Failed Assertion, mismatched Responses.'); 
    	} 
    }
     
    @IsTest
    public static void test_ProfileUpdateApi_Scenerio4() {
        reqWrapper.payload = '{"requestUUID":"REQ_1709981883916","header":{"channelId":"I","loginFlag":"3","serviceId":"MCUIDI","stateMode":"Y","userId":"INFOSYS.ANBA","userPrincipal":"040.BULKVU","corpPrincipal":"040","accessCode":"a","formId":"67900"},"userMaintenanceMUser":{"bayUserId":"INFOSYS","corpUserType":"NORMAL","userType":2,"corpUser":"ANBA","cEmailId":"ramesh@gmail.com","cMPhoneNo":"5555667989"}}';
    	reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
    	reqWrapper.metadataName = 'CB_Post_Profile_Update';
        CB_MockHttpResponseGenerator mock4 = new CB_MockHttpResponseGenerator(200, 'SessionExpired', '', null);  
        Test.setMock(HttpCalloutMock.class, mock4);
        try{
            String response4 = CBProfileUpdateHandler.handleProfileUpdate('', reqWrapper);
        }catch(Exception e) {
            System.assertEquals(e.getMessage(), 'Technical issues, Please try again later', 'Failed Assertion, mismatched Responses.'); 
        }
    }
}