public class CBCacheHandler{
   // Name of a partition in the local namespace
   public String partitionInput = 'local.CBSessionCache';

   // Session partition object
   public Cache.SessionPartition sessionPartition;


    public static Cache.SessionPartition getPartition() {
    //    if (sessionPartition == null) {
    //         sessionPartition = Cache.Session.getPartition(partitionInput);
    //    }
       
       return Cache.Session.getPartition('local.CBSessionCache');
     }

    @AuraEnabled
    public static void setCache(String param, String value){
        getPartition().put(param, value);
    }


    @AuraEnabled
    public static String getCache(String param){
        return (String)getPartition().get(param);
    }


    @AuraEnabled
    public static void createCommunityUser(String firstname, String lastname, String email, String username, String password){
        String orgId = UserInfo.getOrganizationId();
        String dateString = String.valueof(Datetime.now()).replace(' ','').replace(':','').replace('-','');
        Integer randomInt = Integer.valueOf(Math.rint(Math.random() * 1000000));
        String uniqueName = orgId + dateString + randomInt;

        Profile testProfile = [SELECT Id, Name FROM Profile WHERE Id = '00eDy000000GFDRIA4' LIMIT 1];
        Account portalAccount = new Account(name = firstname + ' ' + lastname + ' Portal User');
        insert portalAccount;

        Contact portalContact = new Contact(
            FirstName = firstname,
            LastName = lastname,
            Email = email,
            AccountId = portalAccount.Id
        );
        insert portalContact;
    
        User tempUser = new User(
            FirstName = portalContact.FirstName,
            LastName = portalContact.LastName,
            Email = portalContact.Email,
            Username = username + '@salesforce' + orgId + '.org',
            EmailEncodingKey = 'ISO-8859-1',
            Alias = username + '_' + firstname.substring(0, 1) + lastname,
            TimeZoneSidKey = 'America/Los_Angeles',
            LocaleSidKey = 'en_US',
            LanguageLocaleKey = 'en_US',
            ProfileId = testProfile.Id,
            ContactId = portalContact.Id,
            Clarien_Username__c = username,
            Clarien_password__c = password
        );
    
        insert tempUser;
    }

}