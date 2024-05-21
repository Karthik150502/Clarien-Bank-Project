@isTest
public class CBVirtualSignInHandlerTest {

    @TestSetup
    public static void makeData(){
        //To Prepare required Data
    }

    @IsTest
    private static void testVirtualSignInHandler_Scenario1(){
        CBHttpRequestWrapper reqWrapper = createMockRequestWrapper();
        String response ='{"requestUUID":"1709981883917","header":{"status":{"message":[{"messageCode":"0000","messageDescription":"SUCCESS","messageType":"SU"}]},"session":{"sessionId":"jjFBBQRCqU4nnwSYM63rwZO5qGE-f7L4F5aHKCmX.awcanclrnfndv01","fromId":"492"},"pagination":[{"numRecReturned":"0","hasMoreRecords":"N"}]},"userDetails":{"bankId":"040","userId":"VUSER","corporateId":"040","individualId":"6","languageId":"001","channelId":"I","userType":"4","userFirstName":"VUser","userLastName":"V","userPreferredDateFormat":"dd/MM/yyyy","userLocaleCountryCode":"US","userLocaleLanguageCode":"en","userMenuProfileId":"RRMGR","userSignOnstatus":"S","lastLoginTime":"04/03/202407:21:49AM","pwdEnabledFlag":"Y","txnPwdEnabledFlag":"Y","totalNumberOfLogin":"0","recordUserId":"040.VUSER","lastUnsuccessfulLoginChannel":"I","lastUnsuccessfulLoginTime":"04/03/202407:18:03AM"},"forceChangePwd":{},"realtionshipDetails":{},"userCustomerIdDetails":{},"footer":{"codedescription":[{"codeSet":[{"code":[{"value":"","description":""}]}]}]}}';
        testVirtualSiginApiWithMockResponse(reqWrapper, response);
    }

    @IsTest
    private static void testVirtualSignInHandler_Scenario2() {
        CBHttpRequestWrapper reqWrapper = createMockRequestWrapper();
        String response = '{"requestUUID":"1709981883916","header":{"status":{"message":[{"messageCode":"106803","messageDescription":"Fail","messageType":"SU"}]},"session":{"sessionId":null,"fromId":null},"pagination":[{"numRecReturned":"1","hasMoreRecords":"N"}]},"userDetails":{"bankId":"CAGPBM","userId":"RET2","corporateId":"RET2","customerId":"4100000033","customerName":null,"individualId":"6","languageId":"001","channelId":"I","userType":"1","userFirstName":"RETAIL","userMiddleName":null,"userLastName":"1","mobileNumber":null,"phoneNumber":null,"userPreferredDateFormat":"dd/MM/yyyy","userPreferredAmountFormatCode":"1","userLocaleCountryCode":"US","userLocaleLanguageCode":"en","userMenuProfileId":"RETUSR","userSignOnstatus":"S","userAllowedTxnTypes":"TPF|PMT|BLK|SLF|RMT|ACH","lastLoginTime":"07/05/202401:08:41PM","currentLoginTime":"07/05/202401:26:05PM","pwdEnabledFlag":"Y","txnPwdEnabledFlag":"Y","authorizationMode":"TPWD","totalNumberOfLogin":"417","primaryAccountId":null,"mode":null,"lastLoginChannel":"I","recordUserId":"RET1.RET1","lastUnsuccessfulLoginChannel":"I","lastUnsuccessfulLoginTime":"07/05/202410:43:12AM","segmentName":"RETS","segmentDescription":"RetailUser"},"forceChangePwd":{"forcePwdChangeFlag":null,"forceTxnPwdChangeFlag":null,"forceUssdChangeFlage":null},"realtionshipDetails":{"relationshipDetails_REC":null},"userCustomerIdDetails":{"UserCustomerIDDetails_REC":[{"customerId":"4100000033","customerName":"SANJEEV"}]},"footer":{"codedescription":[{"codeSet":[{"code":[{"value":"","description":""}]}]}]}}';
        testVirtualSiginApiWithMockResponse(reqWrapper, response);
    }
    
    @IsTest
    private static void testVirtualSignInHandler_Scenario3() {
        CBHttpRequestWrapper reqWrapper = createMockRequestWrapper();
        testVirtualSiginApiWithMockResponse(reqWrapper, null);
    }

    private static void testVirtualSiginApiWithMockResponse(CBHttpRequestWrapper reqWrapper, String response) {
        Test.startTest();
        CB_MockHttpResponseGenerator mock = new CB_MockHttpResponseGenerator(200, 'OK', response, null);
        Test.setMock(HttpCalloutMock.class, mock);

        try {
            String requestResponse = CBVirtualSignInHandler.handleVirtualSignIn(response,reqWrapper);
            system.assertNotEquals(null,requestResponse,'Asertion failed while vistual sign in getting session');

        } catch (Exception e) {
            if (response == null) {
                system.debug('Error '+e.getMessage());
                System.assertEquals('Technical issues, Please try again', e.getMessage(), 'Error Response does not match.');
            } else {
                System.assertEquals('Unable to login. Try again', e.getMessage(), 'Error Response does not match.');
            }
        }

        Test.stopTest();
    }

    private static CBHttpRequestWrapper createMockRequestWrapper() {
        CBHttpRequestWrapper reqWrapper = new CBHttpRequestWrapper();
        reqWrapper.payload = '{"requestUUID":"1709981883916","header":{"channelId":"I","loginFlag":"1","serviceId":"SIGN","stateMode":"N","userPrincipal":"RET1","corpPrincipal":"RET1","accessCode":"infy@123"}}';
        reqWrapper.metadataName = 'CB_POST_Virtual_Sign';
        return reqWrapper;
    }

}