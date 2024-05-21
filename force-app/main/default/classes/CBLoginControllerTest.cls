@isTest
public with sharing class CBLoginControllerTest {
 @TestSetup
    public static void makeData() {

        Id profileId = [Select Id from Profile where name='System Administrator'].Id;
        Id roleId = [Select Id from UserRole where DeveloperName = 'CEO'].Id;
     
        String orgId = UserInfo.getOrganizationId();
        String dateString = String.valueof(Datetime.now()).replace(' ','').replace(':','').replace('-','');
        Integer randomInt = Integer.valueOf(Math.rint(Math.random() * 1000000));
        String uniqueName = orgId + dateString + randomInt;

        User systemUser = new User(
            FirstName = 'Admin',
            LastName = 'User',
            Email = uniqueName + '@sfdc' + orgId + '.org',
            Username = uniqueName + '@sfdc' + orgId + '.org',
            EmailEncodingKey = 'ISO-8859-1',
            Alias = uniqueName.substring(18, 23),
            TimeZoneSidKey = 'America/Los_Angeles',
            LocaleSidKey = 'en_US',
            LanguageLocaleKey = 'en_US',
            ProfileId = profileId,
            UserRoleId = roleId
        );
        insert systemUser;

        System.runAs(systemUser) {
            
            randomInt = Integer.valueOf(Math.rint(Math.random() * 1000000));
        	uniqueName = orgId + dateString + randomInt;
            
            Profile testProfile = [SELECT Id, Name FROM Profile WHERE Id = '00eDy000000GFDRIA4' LIMIT 1];

            Account portalAccount = new Account(name = 'Test User');
            insert portalAccount;

            Contact portalContact = new Contact(
                FirstName = 'John',
                LastName = 'Wilson',
                Email = 'John.Wilson@gmail.com',
                AccountId = portalAccount.Id
            );
            insert portalContact;
        
            User tempUser = new User(
                FirstName = portalContact.FirstName,
                LastName = portalContact.LastName,
                Email = uniqueName + '@sfdc' + orgId + '.org',
                Username = uniqueName + '@sfdc' + orgId + '.org',
                EmailEncodingKey = 'ISO-8859-1',
                Alias = uniqueName.substring(18, 23),
                TimeZoneSidKey = 'America/Los_Angeles',
                LocaleSidKey = 'en_US',
                LanguageLocaleKey = 'en_US',
                ProfileId = testProfile.Id,
                ContactId = portalContact.Id,
                Clarien_Username__c = 'RET2',
                Clarien_password__c = 'infy@123'
            );
        
            insert tempUser;
        }
    }
    @isTest
    public static void testLoginApi() {
        CBHttpRequestWrapper reqWrapper = createMockRequestWrapper();
        String response = '{"requestUUID":"1709981883916","header":{"status":{"message":[{"messageCode":"0000","messageDescription":"SUCCESS","messageType":"SU"}]},"session":{"sessionId":null,"fromId":null},"pagination":[{"numRecReturned":"1","hasMoreRecords":"N"}]},"userDetails":{"bankId":"CAGPBM","userId":"RET2","corporateId":"RET2","customerId":"4100000033","customerName":null,"individualId":"6","languageId":"001","channelId":"I","userType":"1","userFirstName":"RETAIL","userMiddleName":null,"userLastName":"1","mobileNumber":null,"phoneNumber":null,"userPreferredDateFormat":"dd/MM/yyyy","userPreferredAmountFormatCode":"1","userLocaleCountryCode":"US","userLocaleLanguageCode":"en","userMenuProfileId":"RETUSR","userSignOnstatus":"S","userAllowedTxnTypes":"TPF|PMT|BLK|SLF|RMT|ACH","lastLoginTime":"07/05/202401:08:41PM","currentLoginTime":"07/05/202401:26:05PM","pwdEnabledFlag":"Y","txnPwdEnabledFlag":"Y","authorizationMode":"TPWD","totalNumberOfLogin":"417","primaryAccountId":null,"mode":null,"lastLoginChannel":"I","recordUserId":"RET1.RET1","lastUnsuccessfulLoginChannel":"I","lastUnsuccessfulLoginTime":"07/05/202410:43:12AM","segmentName":"RETS","segmentDescription":"RetailUser"},"forceChangePwd":{"forcePwdChangeFlag":null,"forceTxnPwdChangeFlag":null,"forceUssdChangeFlage":null},"realtionshipDetails":{"relationshipDetails_REC":null},"userCustomerIdDetails":{"UserCustomerIDDetails_REC":[{"customerId":"4100000033","customerName":"SANJEEV"}]},"footer":{"codedescription":[{"codeSet":[{"code":[{"value":"","description":""}]}]}]}}';
        testLoginApiWithMockResponse(reqWrapper, response);
    }

    @isTest
    public static void testLoginApiNegetiveScenario1() {
        CBHttpRequestWrapper reqWrapper = createMockRequestWrapper();
        String response =  '{"requestUUID":"1709981883916","header":{"status":{"message":[{"messageCode":"106803","messageDescription":"Fail","messageType":"SU"}]},"session":{"sessionId":null,"fromId":null},"pagination":[{"numRecReturned":"1","hasMoreRecords":"N"}]},"userDetails":{"bankId":"CAGPBM","userId":"RET2","corporateId":"RET2","customerId":"4100000033","customerName":null,"individualId":"6","languageId":"001","channelId":"I","userType":"1","userFirstName":"RETAIL","userMiddleName":null,"userLastName":"1","mobileNumber":null,"phoneNumber":null,"userPreferredDateFormat":"dd/MM/yyyy","userPreferredAmountFormatCode":"1","userLocaleCountryCode":"US","userLocaleLanguageCode":"en","userMenuProfileId":"RETUSR","userSignOnstatus":"S","userAllowedTxnTypes":"TPF|PMT|BLK|SLF|RMT|ACH","lastLoginTime":"07/05/202401:08:41PM","currentLoginTime":"07/05/202401:26:05PM","pwdEnabledFlag":"Y","txnPwdEnabledFlag":"Y","authorizationMode":"TPWD","totalNumberOfLogin":"417","primaryAccountId":null,"mode":null,"lastLoginChannel":"I","recordUserId":"RET1.RET1","lastUnsuccessfulLoginChannel":"I","lastUnsuccessfulLoginTime":"07/05/202410:43:12AM","segmentName":"RETS","segmentDescription":"RetailUser"},"forceChangePwd":{"forcePwdChangeFlag":null,"forceTxnPwdChangeFlag":null,"forceUssdChangeFlage":null},"realtionshipDetails":{"relationshipDetails_REC":null},"userCustomerIdDetails":{"UserCustomerIDDetails_REC":[{"customerId":"4100000033","customerName":"SANJEEV"}]},"footer":{"codedescription":[{"codeSet":[{"code":[{"value":"","description":""}]}]}]}}';
        testLoginApiWithMockResponse(reqWrapper, response);
    }

    @isTest
    public static void testLoginApiNegetiveScenario2() {
        CBHttpRequestWrapper reqWrapper = createMockRequestWrapper();
        testLoginApiWithMockResponse(reqWrapper, null);
    }

    private static void testLoginApiWithMockResponse(CBHttpRequestWrapper reqWrapper, String response) {
        Test.startTest();
        CB_MockHttpResponseGenerator mock = new CB_MockHttpResponseGenerator(200, 'OK', response, null);
        Test.setMock(HttpCalloutMock.class, mock);

        try {
            Map<String, Object> requestResponse = CBLoginController.login(reqWrapper);
        } catch (Exception e) {
            if (response == null) {
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
        reqWrapper.metadataName = 'CB_Login_API';
        return reqWrapper;
    }

}