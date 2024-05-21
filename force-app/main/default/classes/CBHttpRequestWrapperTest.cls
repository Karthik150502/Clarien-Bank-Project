@isTest
public class CBHttpRequestWrapperTest {
    @isTest
    static void testCBHttpRequestWrapper() {
	
        Test.startTest();
        
        CBHttpRequestWrapper reqWrapper = new CBHttpRequestWrapper();
        reqWrapper.payload = '{"requestUUID":"REQ_1709981883916","header":{"channelId":"I","loginFlag":"3","serviceId":"MCUIDI","stateMode":"Y","userId":"INFOSYS.ANBA","userPrincipal":"040.BULKVU","corpPrincipal":"040","accessCode":"a","formId":"67900"},"userMaintenanceMUser":{"bayUserId":"INFOSYS","corpUserType":"NORMAL","userType":2,"corpUser":"ANBA","cEmailId":"ramesh@gmail.com","cMPhoneNo":"5555667989"}}';
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'Profile_Update';
        
        System.assertEquals(reqWrapper.payload, '{"requestUUID":"REQ_1709981883916","header":{"channelId":"I","loginFlag":"3","serviceId":"MCUIDI","stateMode":"Y","userId":"INFOSYS.ANBA","userPrincipal":"040.BULKVU","corpPrincipal":"040","accessCode":"a","formId":"67900"},"userMaintenanceMUser":{"bayUserId":"INFOSYS","corpUserType":"NORMAL","userType":2,"corpUser":"ANBA","cEmailId":"ramesh@gmail.com","cMPhoneNo":"5555667989"}}');
        System.assertEquals(reqWrapper.headers , '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}');
        System.assertEquals(reqWrapper.metadataName,'Profile_Update');
        
        Test.stopTest();
    }
}