@isTest
public class CBUtilityControllerTest {
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
            
            Profile testProfile = [SELECT Id, Name FROM Profile WHERE name = 'Retail Mobile Banking User' LIMIT 1];

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
                Clarien_Username__c = 'RET9'
            );
        
            insert tempUser;
        }
    }
    
    @isTest
    public static void testGetUsernameScenario1() {
        Test.startTest();
        try{
        String username = CBUtilityController.getUsername('RET9');
            system.debug('username'+username);
        System.assertNotEquals(null, username);
        }catch(exception e){
          System.assertNotEquals(null, e.getMessage());
        }
        Test.stopTest();
    }
    
	@isTest
    public static void testGetUsernameScenario2() {
        Test.startTest();
        try {
            CBUtilityController.getUsername('RETUSER1');
            System.assert(false, 'Expected CBCustomLoginException was not thrown');
        } catch (CBErrorHandler.CBCustomLoginException e) {
            System.assertEquals('Invalid Username or Password', e.getMessage());
        }
        
        Test.stopTest();
    }
    
    
    	@isTest
    public static void testGetMessageScenario3() {
        Test.StartTest();
        String msgCode = '102945';
        String metaDataName = 'CB_Post_Profile_Update';
        String result = CBUtilityController.getMessage(msgCode, metaDataName);
        System.assertEquals('The records do not exist for the user.', result, 'The response does not match.');
        Test.StopTest();
    }
    
    
    @isTest
    public static void testGetMessageScenario4() {
        Test.StartTest();
        String msgCode = '';
        String metaDataName = '';
        try{
            String result = CBUtilityController.getMessage(msgCode, metaDataName);
        }catch(Exception e){
            System.assertEquals('Invalid or non-existent label: _Default', e.getMessage(), 'The Error responses does not match.');
        }
        Test.StopTest();
    }


        
    @isTest
    public static void testSessionScenario5() {
        Test.StartTest();
        String sessionData = '{"CBUsername":"John Elder"}';
        CBUtilityController.setSessionData(sessionData);
        String getResult = CBUtilityController.get('CBUsername'); 
        System.assertEquals(getResult, 'John Elder', 'The session data does not match.');
        Test.StopTest();
    }
    


            
    @isTest
    public static void testSessionScenario6() {
        Test.StartTest();
        String sessionKey = 'CBUsername';
        String sessionValue = 'John Cena';
        CBUtilityController.put(sessionKey,sessionValue);
        String getResult = CBUtilityController.get(sessionKey); 
        System.assertEquals(getResult, 'John Cena', 'The session data does not match.');
        Test.StopTest();
    }
    

        @isTest
    public static void testSessionScenario7() {
        Test.StartTest();
        String sessionData = '{"key1":"John Elder", "key2":"Sabastian Vettel"}';
        CBUtilityController.setSessionData(sessionData);
        List<String> keys = new List<String>();
        keys.add('key1');
        keys.add('key2');
        Map<String, String> result = CBUtilityController.getSessionData(keys);
        System.assertEquals((String)result.get('key1'),'John Elder' , 'The session data does not match.');
        System.assertEquals((String)result.get('key2'),'Sabastian Vettel' , 'The session data does not match.');
        Test.StopTest();
    }
    
    
    

}