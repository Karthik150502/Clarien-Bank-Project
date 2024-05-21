@isTest
public class CBLoginResponseWrapperTest {
   @IsTest
    public static void testLoginResponseWrapper(){
        String response = '{"requestUUID":"1709981883917","header":{"status":{"message":[{"messageCode":"0000","messageDescription":"SUCCESS","messageType":"SU"}]},"session":{"sessionId":"jjFBBQRCqU4nnwSYM63rwZO5qGE-f7L4F5aHKCmX.awcanclrnfndv01","fromId":"492"},"pagination":[{"numRecReturned":"0","hasMoreRecords":"N"}]},"userDetails":{"bankId":"040","userId":"VUSER","corporateId":"040","individualId":"6","languageId":"001","channelId":"I","userType":"4","userFirstName":"VUser","userLastName":"V","userPreferredDateFormat":"dd/MM/yyyy","userLocaleCountryCode":"US","userLocaleLanguageCode":"en","userMenuProfileId":"RRMGR","userSignOnstatus":"S","lastLoginTime":"04/03/2024 07:21:49 AM","pwdEnabledFlag":"Y","txnPwdEnabledFlag":"Y","totalNumberOfLogin":"0","recordUserId":"040.VUSER","lastUnsuccessfulLoginChannel":"I","lastUnsuccessfulLoginTime":"04/03/2024 07:18:03 AM"},"forceChangePwd":{},"realtionshipDetails":{},"userCustomerIdDetails":{},"footer":{"codedescription":[{"codeSet":[{"code":[{"value":"","description":""}]}]}]}}';
        CBLoginResponseWrapper responseWrapper = CBLoginResponseWrapper.parse(response);
        System.assertNotEquals(null, responseWrapper, 'The Response Wrapper value does not match.');
    }
}