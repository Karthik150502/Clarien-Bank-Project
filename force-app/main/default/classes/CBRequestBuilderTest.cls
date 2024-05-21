@isTest
public class CBRequestBuilderTest {
    
	public static CBHttpRequestWrapper reqWrapper = new CBHttpRequestWrapper();
    
    @isTest 
    public static void test_RequestBuilderScenario1() {
        
        reqWrapper.payload = '{"requestUUID":"REQ_1709981883916","header":{"channelId":"I","loginFlag":"3","serviceId":"MCUIDI","stateMode":"Y","userId":"INFOSYS.ANBA","userPrincipal":"040.BULKVU","corpPrincipal":"040","accessCode":"a","formId":"67900"},"userMaintenanceMUser":{"bayUserId":"INFOSYS","corpUserType":"NORMAL","userType":2,"corpUser":"ANBA","cEmailId":"ramesh@gmail.com","cMPhoneNo":"5555667989"}}';
    	reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
    	reqWrapper.metadataName = 'CB_Post_Profile_Update';
        
        Test.startTest();
        CBRequestBuilder requestBuilder = new CBRequestBuilder();
        HttpRequest request = requestBuilder.buildHttpRequest(reqWrapper);

        System.assertNotEquals(null, request);
        System.assertEquals('POST', request.getMethod());
        System.assertEquals('callout:Clarien_Named_Credential/api/profile/update', request.getEndpoint());            
        
        Test.stopTest();
    }
    
    @isTest 
    public static void test_RequestBuilderScenario2() {
        
        reqWrapper.payload = '{"requestUUID":"REQ_1709981883916","header":{"channelId":"I","loginFlag":"3","serviceId":"MCUIDI","stateMode":"Y","userId":"INFOSYS.ANBA","userPrincipal":"040.BULKVU","corpPrincipal":"040","accessCode":"a","formId":"67900"},"userMaintenanceMUser":{"bayUserId":"INFOSYS","corpUserType":"NORMAL","userType":2,"corpUser":"ANBA","cEmailId":"ramesh@gmail.com","cMPhoneNo":"5555667989"}}';
    	reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
    	reqWrapper.metadataName = 'Profile_Update';
        
        Test.startTest();
        CBRequestBuilder requestBuilder = new CBRequestBuilder();
        HttpRequest request = requestBuilder.buildHttpRequest(reqWrapper);
        
        System.assertNotEquals(null, request);
        System.assertEquals(null, request.getMethod());
        
        Test.stopTest();
    }
    
    @isTest 
    public static void test_RequestBuilderScenario3() {
        
        Test.startTest();
        CBRequestBuilder requestBuilder = new CBRequestBuilder();
        HttpRequest request = requestBuilder.buildHttpRequest(null);
        
        System.assertNotEquals(null, request);
        System.assertEquals(null, request.getMethod());
        
        Test.stopTest();
    }
}