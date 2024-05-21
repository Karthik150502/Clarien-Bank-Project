/**
 * @description       : 
 * @author            : Prateek Deshmukh
 * @group             : 
 * @last modified on  : 05-06-2024
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
    
    @AuraEnabled(cacheable=true)
    public static Map<String,String>  getUsernamePassword(){
            Map<String,String> result = new Map<String,String>();
			Id userId =UserInfo.getUserId();            
    		// Query Salesforce User object to retrieve username and password based on current user
            User u =[SELECT Id, Customer_id__c,Clarien_Username__c ,Clarien_password__c,Username FROM User WHERE id = :userId LIMIT 1];
            result.put('Clarien_Username__c',u.Clarien_Username__c);
            result.put('Clarien_password__c',u.Clarien_password__c);
        	system.debug('Clarien_Username__c'+u.Clarien_Username__c);
            return result;
    }
    
    @AuraEnabled
    public static user getUsernamePasswordByUserId(String userId){
        try{
    		// Query Salesforce User object to retrieve username and password based on current user
            return [SELECT Id, Customer_id__c,Clarien_Username__c ,Clarien_password__c,Username FROM User WHERE Clarien_Username__c = :userId OR Username = :userId OR Id = :userId WITH SECURITY_ENFORCED LIMIT 1];
        } catch(Exception e){
            string errorMsgCode='CB_User_doesnot_Exist_error';
            string message=CBErrorHandler.getErrorMessage(errorMsgCode);
            throw new CBErrorHandler.CBCustomLoginException(message);
        }
    }
}