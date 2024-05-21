@isTest
private class CB_ApiController_Test {
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
        
        // test for failure
        String errorResponse = '{"error": {"status": "Failure","identifier": "APIKIT:BAD_REQUEST","errorMessage": "Required query parameter requestUUID not specified","message": "Required query parameter requestUUID not specified"}}';
        CB_MockHttpResponseGenerator mock2 = new CB_MockHttpResponseGenerator(500, 'Failure', errorResponse, null);
        Test.setMock(HttpCalloutMock.class, mock2);
        try {
            String responseBody2 = CBApiController.fetchExchangeRate(reqWrapper);
        } catch(Exception e) {
            System.assertEquals(e.getMessage(), '500', 'Failed Assertion, mismatched errorResponses.');
        }
        
    }
    
    
    
    @isTest
    public static void test_ProfileUpdateApi() {
        reqWrapper.payload = '{"requestUUID":"REQ_1709981883916","header":{"channelId":"I","loginFlag":"3","serviceId":"MCUIDI","stateMode":"Y","userId":"INFOSYS.ANBA","userPrincipal":"040.BULKVU","corpPrincipal":"040","accessCode":"a","formId":"67900"},"userMaintenanceMUser":{"bayUserId":"INFOSYS","corpUserType":"NORMAL","userType":2,"corpUser":"ANBA","cEmailId":"ramesh@gmail.com","cMPhoneNo":"5555667989"}}';
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'Profile_Update';
        
        String responseBody = '{"requestUUID":"REQ_1709981883916","ErrorResponse":{"header":{"STATUS":{"MESSAGE":{"MESSAGE_CODE":"0000","MESSAGE_DESC":"Session expired  please login again","MESSAGE_TYPE":"FATAL_EXCEPTION"}}}}}';
        CB_MockHttpResponseGenerator mock = new CB_MockHttpResponseGenerator(200, 'SessionExpired', responseBody, null);  
        Test.setMock(HttpCalloutMock.class, mock);
        try{
            String response = CBApiController.profileUpdate(reqWrapper);
        }catch(Exception e) {
            System.assertEquals(e.getMessage(), 'Technical issues, Please try again later', 'Failed Assertion, mismatched Responses.'); 
        }
        
        String responseBody2 = '{"requestUUID":"REQ_1709981883916","header":{"status":{"message":[{"messageCode":"0000","MESSAGE_DESC":"Session expired please login again","MESSAGE_TYPE":"FATAL_EXCEPTION"}]}}}';
        CB_MockHttpResponseGenerator mock2 = new CB_MockHttpResponseGenerator(200, 'SessionExpired', responseBody2, null);  
        Test.setMock(HttpCalloutMock.class, mock2);
        String response2 = CBApiController.profileUpdate(reqWrapper);
        System.assertEquals(response2, responseBody2, 'Failed Assertion, mismatched Responses.'); 
        
        String responseBody3 = '{"requestUUID":"REQ_1709981883916","header":{"status":{"message":[{"messageCode":"1111","MESSAGE_DESC":"Session expired please login again","MESSAGE_TYPE":"FATAL_EXCEPTION"}]}}}';
        CB_MockHttpResponseGenerator mock3 = new CB_MockHttpResponseGenerator(200, 'SessionExpired', responseBody3, null);  
        Test.setMock(HttpCalloutMock.class, mock3);
        String response3 = CBApiController.profileUpdate(reqWrapper);
        System.assertEquals(response3, responseBody3, 'Failed Assertion, mismatched Responses.'); 
        
        
        CB_MockHttpResponseGenerator mock4 = new CB_MockHttpResponseGenerator(200, 'SessionExpired', '', null);  
        Test.setMock(HttpCalloutMock.class, mock4);
        try{
            String response4 = CBApiController.profileUpdate(reqWrapper);
        }catch(Exception e) {
            System.assertEquals(e.getMessage(), 'Technical issues, Please try again later', 'Failed Assertion, mismatched Responses.'); 
        }
    }
    
    @isTest
    public static void test_profileSearchApi() {
        reqWrapper.payload = '{"requestUUID":"REQ_1709981883916","header":{"channelId":"G","loginFlag":"1","serviceId":"USRDET","stateMode":"Y","userPrincipal":"RETUSER1","corpPrincipal":"RETUSER1","accessCode":"infy@123","formId":"8293"}}';
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'Profile_Search';
        
        CB_MockHttpResponseGenerator mock = new CB_MockHttpResponseGenerator(200, 'SessionExpired', null, null);  
        Test.setMock(HttpCalloutMock.class, mock);
        try{
            String response = CBApiController.searchProfile(reqWrapper);
        }catch(Exception e) {
            System.assertEquals(e.getMessage(), 'Technical issues, Please try again later', 'Failed Assertion, mismatched Responses.'); 
        }
        
        
        String responseBody ='{"requestUUID":"REQ_1709981883916","header":{"status":{"message":[{"messageCode":"0000","messageDescription":"SUCCESS","messageType":"SU"}]},"session":{"sessionId":"WgqEv-MQJIcQ32WGoClbm4YDafPMOCgFnWa8Gvf4.awcanclrnfndv01","fromId":"986"}},"userDetails":{"bayUserId":"RETUSER1","cLName":"ROY","corpUser":"RETUSER1","corpUserType":"RM","cMPhoneNo":"1234567890","cEmailId":"aaa@gmail.com"}}';
        CB_MockHttpResponseGenerator mock2 = new CB_MockHttpResponseGenerator(200, 'SessionExpired', responseBody, null);  
        Test.setMock(HttpCalloutMock.class, mock2);
        try{
            String response2 = CBApiController.searchProfile(reqWrapper);
        }catch(Exception e2) {
            System.assertEquals(e2.getMessage(), 'Technical issues, Please try again later', 'Failed Assertion, mismatched Responses.'); 
        }
        
        try{
            String responseBody2 = '{"requestUUID":"REQ_1709981883916","header":{"status":{"message":[{"messageCode":"2400","MESSAGE_DESC":"Session expired please login again","MESSAGE_TYPE":"FATAL_EXCEPTION"}]}}}';
            CB_MockHttpResponseGenerator mock3 = new CB_MockHttpResponseGenerator(200, 'SessionExpired', responseBody2, null);  
            Test.setMock(HttpCalloutMock.class, mock3);
            String response3 = CBApiController.searchProfile(reqWrapper);
            System.assertEquals(response3, responseBody2, 'Failed Assertion, mismatched Responses.');
        }catch(exception e){
            System.assertEquals(e.getMessage(), 'Technical issues, Please try again later', 'Failed Assertion, mismatched Responses.');
        }
        try{
            String responseBody3 = '{"requestUUID":"1709981883916","ErrorResponse":{"header":{"STATUS":{"MESSAGE":{"MESSAGE_CODE":"101219","MESSAGE_DESC":"Invalid BANK_ID in caps is passed in the URL","MESSAGE_TYPE":"FATAL_EXCEPTION"}}}}}';
            CB_MockHttpResponseGenerator mock4 = new CB_MockHttpResponseGenerator(200, 'SessionExpired', responseBody3, null);  
            Test.setMock(HttpCalloutMock.class, mock4);
            String response4 = CBApiController.searchProfile(reqWrapper);
            System.assertEquals(response4, responseBody3, 'Failed Assertion, mismatched Responses.');
        }
        catch(exception e){
            System.assertEquals(e.getMessage(), 'Technical issues, Please try again later', 'Failed Assertion, mismatched Responses.');
        }
         try{
            String responseBody4 = '"requestUUID":"1709981883916","ErrorResponse":{"header":{"STATUS":{"MESSAGE":{"MESSAGE_CODE":"101219","MESSAGE_DESC":"Invalid BANK_ID in caps is passed in the URL","MESSAGE_TYPE":"FATAL_EXCEPTION"}}}}}';
            CB_MockHttpResponseGenerator mock5 = new CB_MockHttpResponseGenerator(200, 'SessionExpired', responseBody4, null);  
            Test.setMock(HttpCalloutMock.class, mock5);
            String response5 = CBApiController.searchProfile(reqWrapper);
            System.assertEquals(response5, responseBody4, 'Failed Assertion, mismatched Responses.');
        }
        catch(exception e){
            System.assertEquals(e.getMessage(), 'Technical issues, Please try again later', 'Failed Assertion, mismatched Responses.');
        }
         try{
        String responseBody5 ='{"requestUUID":"REQ_1709981883916","header":{"status":{"message":[{"messageCode":"0000","messageDescription":"SUCCESS","messageType":"SU"}]},"session":{"sessionId":"WgqEv-MQJIcQ32WGoClbm4YDafPMOCgFnWa8Gvf4.awcanclrnfndv01","fromId":"986"}},"userDetails":""}';
            CB_MockHttpResponseGenerator mock6 = new CB_MockHttpResponseGenerator(200, 'SessionExpired', responseBody5, null);  
            Test.setMock(HttpCalloutMock.class, mock6);
            String response6 = CBApiController.searchProfile(reqWrapper);
            System.assertEquals(response6, responseBody5, 'Failed Assertion, mismatched Responses.');
        }
        catch(exception e){
            System.assertEquals(e.getMessage(), 'Technical issues, Please try again later', 'Failed Assertion, mismatched Responses.');
        }
    }
    @isTest
    public static void test_changePasswordApi(){
        reqWrapper.payload = '{"requestUUID":"1709981883916","header":{"bankId":"040","languageId":"001","channelId":"G","loginFlag":"1","stateMode":"N","serviceId":"PWDCHG","opfmt":"XML","ipfmt":"XML","userPrincipal":"RETUSER5","corpPrincipal":"RETUSER5","formId":"8282","accessCode":"rusr@9889"},"pwdChangeRequest":{"signOnFlag":"Y","transactionFlag":"N","signOnPwd":"rusr@9889","signOnNewPwd":"test@7878","reTypeSignOnPwd":"test@7878","reTypeTransPwd":"","transactionPwd":"","transactionNewPwd":"","callMode":""}}';
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'CB_POST_Change_Password';
        
        String response ='{"requestUUID":"REQ_1709981883916","header":{"status":{"message":[{"messageCode":"0000","messageDescription":"SUCCESS","messageType":"SU"}]},"session":{"sessionId":"WgqEv-MQJIcQ32WGoClbm4YDafPMOCgFnWa8Gvf4.awcanclrnfndv01","fromId":"986"}},"userDetails":""}';
        CB_MockHttpResponseGenerator mock = new CB_MockHttpResponseGenerator(200, 'SessionExpired', response, null);
        Test.setMock(HttpCalloutMock.class, mock);
        String requestResponse = CBApiController.changePassword(reqWrapper);
        System.assertEquals(response, requestResponse, 'Failed Assertion, mismatched Responses.');
        
        String response2 ='{"requestUUID":"REQ_1709981883916","header":{"status":{"message":[{"messageCode":"0001","messageDescription":"SUCCESS","messageType":"SU"}]},"session":{"sessionId":"WgqEv-MQJIcQ32WGoClbm4YDafPMOCgFnWa8Gvf4.awcanclrnfndv01","fromId":"986"}},"userDetails":""}';
        CB_MockHttpResponseGenerator mock2 = new CB_MockHttpResponseGenerator(200, 'SessionExpired', response2, null);
        Test.setMock(HttpCalloutMock.class, mock2);
        String requestResponse2 = CBApiController.changePassword(reqWrapper);
        System.assertEquals(response2, requestResponse2, 'Failed Assertion, mismatched Responses.');
    }
@isTest
    public static void testLogoutApi() {
        reqWrapper.payload = '{"requestUUID":"1709981883916","header":{"bankId":"040","languageId":"001","channelId":"G","loginFlag":"1","stateMode":"N","serviceId":"PWDCHG","opfmt":"XML","ipfmt":"XML","userPrincipal":"RETUSER5","corpPrincipal":"RETUSER5","formId":"8282","accessCode":"rusr@9889"},"pwdChangeRequest":{"signOnFlag":"Y","transactionFlag":"N","signOnPwd":"rusr@9889","signOnNewPwd":"test@7878","reTypeSignOnPwd":"test@7878","reTypeTransPwd":"","transactionPwd":"","transactionNewPwd":"","callMode":""}}';
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'CB_Logout_API';
        reqWrapper.payload = '{"requestUUID":"1709981883917","header":{"channelId":"I","loginFlag":"1","serviceId":"LOGOUT","stateMode":"N","formId":"2378","userId":"User1234","userPrincipal":"RET1","corpPrincipal":"RET1","accessCode":"infy@123"},"logout":{"userId":"RET1"},"version":"1.0"}';
        // Prepare the expected response
        String expectedResponse = '{"requestUUID":"1709981883917","header":{"status":{"message":[{"messageCode":"0000","messageDescription":"SUCCESS","messageType":"SU"}]},"session":{"sessionId":null,"fromId":null},"pagination":null}}';
        CB_MockHttpResponseGenerator mock = new CB_MockHttpResponseGenerator(200, 'OK', expectedResponse, null);
        Test.setMock(HttpCalloutMock.class, mock);
        String actualResponse = CBApiController.signOut(reqWrapper);

         String expectedResponse2 = '{"requestUUID":"1709981883917","header":{"status":{"message":[{"messageCode":"0003","messageDescription":"SUCCESS","messageType":"SU"}]},"session":{"sessionId":null,"fromId":null},"pagination":null}}';
        CB_MockHttpResponseGenerator mock2 = new CB_MockHttpResponseGenerator(200, 'OK', expectedResponse2, null);
        Test.setMock(HttpCalloutMock.class, mock2);
        try{
        String actualResponse2 = CBApiController.signOut(reqWrapper);
        }catch(exception e){
            System.assertEquals(e.getMessage(), 'Technical issues, Please try again later', 'Failed Assertion, mismatched Responses.');
        }
    }
    
}