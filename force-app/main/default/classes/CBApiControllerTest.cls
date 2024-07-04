@isTest
private class CBApiControllerTest {
    public static CBHttpRequestWrapper reqWrapper = new CBHttpRequestWrapper();
    @TestSetup
    public static void makeData(){
        // Profile testProfile = [SELECT Id, Name FROM Profile WHERE Name = 'CB Customer User' LIMIT 1][0];
        // User testUser = new User(
        //     Alias = 'testuser',
        //     Email = 'testuser@example.com',
        //     EmailEncodingKey = 'UTF-8',
        //     LastName = 'Test',
        //     LanguageLocaleKey = 'en_US',
        //     LocaleSidKey = 'en_US',
        //     ProfileId = testProfile.Id,
        //     TimeZoneSidKey = 'America/Los_Angeles',
        //     UserName = 'testuser@example.com'
        // );
        // insert testUser;
        // System.runAs(testUser);
        
    }
    
    @isTest
    public static void test_ExchangeRatesApi() {
        reqWrapper.metadataName = 'CB_GET_Exchange_Rates';
        
        // test for success
        String expectedResponse = '{"fxRateList": [{"date": "2024-04-30", "counterCurrency": "BMD", "baseCurrency": "BMD", "rateCode": "TTS", "units": 1, "rate": "1.0"}, {"date": "2024-04-30", "counterCurrency": "JPY", "baseCurrency": "BMD", "rateCode": "TTB", "units": 1, "rate": "1.0"}], "requestUUID": "REQ_17099818839709990"}';    
        CB_MockHttpResponseGenerator mock = new CB_MockHttpResponseGenerator(200, 'OK', expectedResponse, null);
        Test.setMock(HttpCalloutMock.class, mock);
        String responseBody = CBApiController.fetchExchangeRate(reqWrapper);
        System.assertEquals(responseBody, expectedResponse, 'Failed Assertion, mismatched responses.');           
    }
    
	@isTest
    public static void test_ProfileUpdateApi() {
        reqWrapper.payload = '{"requestUUID":"REQ_1709981883916","header":{"channelId":"I","loginFlag":"3","serviceId":"MCUIDI","stateMode":"Y","userId":"INFOSYS.ANBA","userPrincipal":"040.BULKVU","corpPrincipal":"040","accessCode":"a","formId":"67900"},"userMaintenanceMUser":{"bayUserId":"INFOSYS","corpUserType":"NORMAL","userType":2,"corpUser":"ANBA","cEmailId":"ramesh@gmail.com","cMPhoneNo":"5555667989"}}';
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'CB_Post_Profile_Update';
        
        String responseBody = '{"requestUUID":"REQ_1709981883916","ErrorResponse":{"header":{"STATUS":{"MESSAGE":{"MESSAGE_CODE":"0000","MESSAGE_DESC":"Session expired  please login again","MESSAGE_TYPE":"FATAL_EXCEPTION"}}}}}';
        CB_MockHttpResponseGenerator mock = new CB_MockHttpResponseGenerator(200, 'SessionExpired', responseBody, null);  
        Test.setMock(HttpCalloutMock.class, mock);
        try{
            String response = CBApiController.profileUpdate(reqWrapper);
        }catch(Exception e) {
            System.assertEquals(e.getMessage(), 'Technical API error', 'Failed Assertion, mismatched Responses.'); 
        }
        
    }
    
    @isTest
    public static void test_profileSearchApi() {
        reqWrapper.payload = '{"requestUUID":"REQ_1709981883916","header":{"channelId":"G","loginFlag":"1","serviceId":"USRDET","stateMode":"Y","userPrincipal":"RETUSER1","corpPrincipal":"RETUSER1","accessCode":"infy@123","formId":"8293"}}';
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'CB_Post_Profile_Search';
        
        CB_MockHttpResponseGenerator mock = new CB_MockHttpResponseGenerator(200, 'SessionExpired', null, null);  
        Test.setMock(HttpCalloutMock.class, mock);
        try{
            String response = CBApiController.searchProfile(reqWrapper);
        }catch(Exception e) {
            System.assertEquals(e.getMessage(), 'Technical issues, Please try again later', 'Failed Assertion, mismatched Responses.'); 
        }
    }
    
    @isTest
    public static void test_changePasswordApi(){
        reqWrapper.payload = '{"requestUUID":"1709981883916","header":{"bankId":"040","languageId":"001","channelId":"G","loginFlag":"1","stateMode":"N","serviceId":"PWDCHG","opfmt":"XML","ipfmt":"XML","userPrincipal":"RETUSER5","corpPrincipal":"RETUSER5","formId":"8282","accessCode":"rusr@9889"},"pwdChangeRequest":{"signOnFlag":"Y","transactionFlag":"N","signOnPwd":"rusr@9889","signOnNewPwd":"test@7878","reTypeSignOnPwd":"test@7878","reTypeTransPwd":"","transactionPwd":"","transactionNewPwd":"","callMode":""}}';
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'CB_POST_Change_Password';
        
        String response ='{"requestUUID":"REQ_1709981883916","header":{"status":{"message":[{"messageCode":"0000","messageDescription":"SUCCESS","messageType":"SU"}]},"session":{"sessionId":"WgqEv-MQJIcQ32WGoClbm4YDafPMOCgFnWa8Gvf4.awcanclrnfndv01","fromId":"986"}},"userDetails":""}';
        CB_MockHttpResponseGenerator mock = new CB_MockHttpResponseGenerator(500, 'SessionExpired', response, null);
        Test.setMock(HttpCalloutMock.class, mock);
        try {
        	String requestResponse = CBApiController.changePassword(reqWrapper);
        }catch(Exception e) {
        	System.assertEquals(e.getMessage(), '500', 'Failed Assertion, mismatched Responses.');
    	}
    }
    
    @isTest
    public static void testLogoutApi() {
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'CB_Logout_API';
        reqWrapper.payload = '{"requestUUID":"1709981883917","header":{"channelId":"I","loginFlag":"1","serviceId":"LOGOUT","stateMode":"N","formId":"2378","userId":"User1234","userPrincipal":"RET1","corpPrincipal":"RET1","accessCode":"infy@123"},"logout":{"userId":"RET1"},"version":"1.0"}';
        // Prepare the expected response
        String expectedResponse = '{"requestUUID":"1709981883917","header":{"status":{"message":[{"messageCode":"0000","messageDescription":"SUCCESS","messageType":"SU"}]},"session":{"sessionId":null,"fromId":null},"pagination":null}}';
        CB_MockHttpResponseGenerator mock = new CB_MockHttpResponseGenerator(200, 'OK', expectedResponse, null);
        Test.setMock(HttpCalloutMock.class, mock);
        String actualResponse = CBApiController.signOut(reqWrapper);
        System.assertEquals(actualResponse, '0000', 'Failed Assertion, mismatched Responses.');
    }
    
    @isTest
    public static void testForgetPassword() {
        reqWrapper.payload = '{"requestUUID":"1709981883916","header":{"bankId":"040","languageId":"001","channelId":"G","loginFlag":"1","stateMode":"N","serviceId":"PWDCHG","opfmt":"XML","ipfmt":"XML","userPrincipal":"RETUSER5","corpPrincipal":"RETUSER5","formId":"8282","accessCode":"rusr@9889"},"pwdChangeRequest":{"signOnFlag":"Y","transactionFlag":"N","signOnPwd":"rusr@9889","signOnNewPwd":"test@7878","reTypeSignOnPwd":"test@7878","reTypeTransPwd":"","transactionPwd":"","transactionNewPwd":"","callMode":""}}';
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'CB_POST_Change_Password';
        
        String expectedResponse = '{"requestUUID":"1709981883917","header":{"status":{"message":[{"messageCode":"0000","messageDescription":"SUCCESS","messageType":"SU"}]},"session":{"sessionId":"6465zdvcadv65465SADVSVa613.jhsdjhfj","fromId":"1342"},"pagination":null}}';
        CB_MockHttpResponseGenerator mock = new CB_MockHttpResponseGenerator(200, 'OK', expectedResponse, null);
        Test.setMock(HttpCalloutMock.class, mock);
        String actualResponse = CBApiController.forgetPassword(reqWrapper);
        System.assertNotEquals(null, expectedResponse, 'Failed Assertion, mismatched Responses.');
    }
    
    @isTest
    public static void testVirtualUserSignIn() {
        reqWrapper.payload = '{"requestUUID":"1709981883916","header":{"bankId":"040","languageId":"001","channelId":"G","loginFlag":"1","stateMode":"N","serviceId":"PWDCHG","opfmt":"XML","ipfmt":"XML","userPrincipal":"RETUSER5","corpPrincipal":"RETUSER5","formId":"8282","accessCode":"rusr@9889"},"pwdChangeRequest":{"signOnFlag":"Y","transactionFlag":"N","signOnPwd":"rusr@9889","signOnNewPwd":"test@7878","reTypeSignOnPwd":"test@7878","reTypeTransPwd":"","transactionPwd":"","transactionNewPwd":"","callMode":""}}';
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'CB_POST_Change_Password';
        
        String expectedResponse = '{"requestUUID":"1709981883917","header":{"status":{"message":[{"messageCode":"0000","messageDescription":"SUCCESS","messageType":"SU"}]},"session":{"sessionId":null,"fromId":null},"pagination":null}}';
        CB_MockHttpResponseGenerator mock = new CB_MockHttpResponseGenerator(200, 'OK', expectedResponse, null);
        Test.setMock(HttpCalloutMock.class, mock);
        String actualResponse = CBApiController.virtualUserSignIn(reqWrapper);
        System.assertEquals(actualResponse, '{"sessionId":null,"fromId":null}', 'Failed Assertion, mismatched Responses.');
    }
    
    @isTest
    public static void testValidateUser() {
        reqWrapper.payload = '{"requestUUID":"1709981883916","header":{"bankId":"040","languageId":"001","channelId":"G","loginFlag":"1","stateMode":"N","serviceId":"PWDCHG","opfmt":"XML","ipfmt":"XML","userPrincipal":"RETUSER5","corpPrincipal":"RETUSER5","formId":"8282","accessCode":"rusr@9889"},"pwdChangeRequest":{"signOnFlag":"Y","transactionFlag":"N","signOnPwd":"rusr@9889","signOnNewPwd":"test@7878","reTypeSignOnPwd":"test@7878","reTypeTransPwd":"","transactionPwd":"","transactionNewPwd":"","callMode":""}}';
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'CB_ValidateUser_API';
        
        String expectedResponse = '{"requestUUID":"1709981883917","header":{"status":{"message":[{"messageCode":"0000","messageDescription":"SUCCESS","messageType":"SU"}]},"session":{"sessionId":null,"fromId":null},"pagination":null}}';
        CB_MockHttpResponseGenerator mock = new CB_MockHttpResponseGenerator(200, 'OK', expectedResponse, null);
        Test.setMock(HttpCalloutMock.class, mock);
        String actualResponse = CBApiController.validateUser(reqWrapper);
        System.assertEquals(actualResponse, '{"sessionId":null,"fromId":null}', 'Failed Assertion, mismatched Responses.');
    }
    
    @isTest
    public static void testForceChangePassword() {
        reqWrapper.payload = '{"requestUUID":"1709981883916","header":{"bankId":"040","languageId":"001","channelId":"G","loginFlag":"1","stateMode":"N","serviceId":"PWDCHG","opfmt":"XML","ipfmt":"XML","userPrincipal":"RETUSER5","corpPrincipal":"RETUSER5","formId":"8282","accessCode":"rusr@9889"},"pwdChangeRequest":{"signOnFlag":"Y","transactionFlag":"N","signOnPwd":"rusr@9889","signOnNewPwd":"test@7878","reTypeSignOnPwd":"test@7878","reTypeTransPwd":"","transactionPwd":"","transactionNewPwd":"","callMode":""}}';
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'CB_POST_Change_Password';
        
        String expectedResponse = '{"requestUUID":"1709981883917","header":{"status":{"message":[{"messageCode":"0000","messageDescription":"SUCCESS","messageType":"SU"}]},"session":{"sessionId":null,"fromId":null},"pagination":null}}';
        CB_MockHttpResponseGenerator mock = new CB_MockHttpResponseGenerator(200, 'OK', expectedResponse, null);
        Test.setMock(HttpCalloutMock.class, mock);
        String actualResponse = CBApiController.forceChangePassword(reqWrapper);
        System.assertEquals(actualResponse, expectedResponse, 'Failed Assertion, mismatched Responses.');
    }
}