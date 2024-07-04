/**
* @description       : 
* @author            : Prateek Deshmukh
* @group             : 
* @last modified on  : 05-17-2024
* @last modified by  : Prateek Deshmukh
**/
public class CBUtilityController {
    
    public static String getUsername(String userId){
        try{
            // Query Salesforce User object to retrieve username based on customer ID
            return [SELECT Id, Customer_id__c,Clarien_Username__c ,Username FROM User WHERE Clarien_Username__c = :userId WITH SECURITY_ENFORCED LIMIT 1].Username;
        } catch(Exception e){
            string errorMsgCode='CB_User_doesnot_Exist_error';
            string message=CBErrorHandler.getErrorMessage(errorMsgCode);
            throw new CBErrorHandler.CBCustomLoginException(message);
        }
    }
    

    public static String getMessage(String messageCode, String metadataName) {
        String message = '';
        try {
            String msgCode = metadataName +'_'+ messageCode;
            message = String.valueOf(System.Label.get('', msgCode));
            // message = String.valueOf(System.Label.get('', messageCode));
        } catch(Exception e) {
            String defaultMsgCode = metadataName + '_Default';
            message = String.valueOf(System.Label.get('', defaultMsgCode));
        }
        return message;
    }



        @AuraEnabled(cacheable=true)
    public static void set(Map<String, Object> sessionData){
        try{
            for (String key : sessionData.keyset()) {
                Cache.Session.put(key, String.valueOf(sessionData.get(key)));
                logger.debug('Session data setting, Key = ' + key + ', Value = ' + sessionData.get(key));
            }
            logger.info('Session stored.');
            logger.savelog();
        }catch(Exception e){
            logger.error('Cannot store session = ' + e.getMessage());
            logger.savelog();
        }
    }



    @AuraEnabled(cacheable=true)
    public static void put(String key, String value) {
        try{
            Cache.Session.put(key, value);
            logger.info('Session stored.');
            logger.savelog();
        }catch(Exception e){
            logger.error('Cannot store session = ' + e.getMessage());
            logger.savelog();
        }
    }

    @AuraEnabled(cacheable=true)
    public static String get(String key) {
        return (String)Cache.Session.get(key);
    }
    
    @AuraEnabled(cacheable=true)
    public static void setSessionData(String sessionData) {
        Map<String, Object> sessData = (Map<String, Object>) JSON.deserializeUntyped(sessionData);
        set(sessData);
    }


    @AuraEnabled(cacheable=true)
    public static Map<String, String> getSessionData(List<String> keys) {
        Map<String, String> result = new Map<String, String>();
        for (String key : keys) {
            logger.debug('Session key = ' + key);
            String value = (String)Cache.Session.get(key);
            logger.debug('Result for key = ' + value);
            result.put(key, value);
        }
        logger.savelog();
        return result;
    }
    

    @AuraEnabled(cacheable=true)
    public static Map<String, String> getAccountProducts(String accountType){
        Map<String, String> result = new Map<String, String>();
        List<CB_Account_Product_Code__mdt> picklistValues = [SELECT Id, MasterLabel, 
        Product_Name__c FROM CB_Account_Product_Code__mdt WHERE Account_Type__c =:accountType];
        for(CB_Account_Product_Code__mdt values: picklistValues){
            result.put(values.MasterLabel, values.Product_Name__c);
        }
        return result;
    }
    
       @AuraEnabled(cacheable=true)
    public static string getCustomerId(){
       string  userid =userinfo.getUserId();
       return [select id,Customer_Id__c from user where id=:userid LIMIT 1 ].Customer_Id__c;
    }
    
    

}