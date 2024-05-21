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
    public static void testGetUsernameScenario1() {
        Test.startTest();
        String username = CBUtilityController.getUsername('RET2');
        System.assertNotEquals(null, username);
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
    public static void testGetUsernamePasswordScenario() {
        Test.startTest();
		User u = [Select Id from User where FirstName = 'John'and LastName = 'Wilson' limit 1];
        System.runAs(u){
        	Map<String,String> usernamePassword = CBUtilityController.getUsernamePassword();
        	System.assertNotEquals(null, usernamePassword);
			System.assertEquals(false, usernamePassword.isEmpty());
        }
        Test.stopTest();
    }
    
    @isTest
    public static void testGetUsernamePasswordByUserIdScenario1() {
        Test.startTest();
        Id userId =UserInfo.getUserId(); 
        User userDetail = CBUtilityController.getUsernamePasswordByUserId(userId);
        System.assertEquals(userId, userDetail.Id);
        Test.stopTest();
    }
	
   @isTest
    public static void testGetUsernamePasswordByUserIdScenario2() {
        Test.startTest();
		
       try {
            CBUtilityController.getUsernamePasswordByUserId('null');
            System.assert(false, 'Expected exception was not thrown');
        } catch (Exception e) {
            System.assertEquals('Invalid Username or Password', e.getMessage());
        }
        
        Test.stopTest();
    }
}