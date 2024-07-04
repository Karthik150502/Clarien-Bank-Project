/**
 * @description       : 
 * @author            : Prateek Deshmukh
 * @group             : 
 * @last modified on  : 05-02-2024
 * @last modified by  : Prateek Deshmukh
**/
public class CBFetchMetaData {
    
    /**
    * @description 
    * @author Prateek Deshmukh | 05-02-2024 
    * @param developerName 
    * @return List<CB_Outbound_API_Request_Field_Mapping__mdt> 
    **/
    @AuraEnabled(cacheable=true)
    public static List<CB_Outbound_API_Request_Field_Mapping__mdt> fetchPaths(String developerName){
        String parentApiId = CB_Outbound_API_Request_Detail__mdt.getInstance(developerName).id;
        return [SELECT Id, Outbound_API_Request__c, Field_Name__c, Is_Active__c, Is_Constant__c, XML_Path__c, JSON_Path__c, Value__c FROM CB_Outbound_API_Request_Field_Mapping__mdt WHERE Outbound_API_Request__c=:parentApiId and Is_Active__c = true];
    }
    
    /**
    * @description 
    * @author Prateek Deshmukh | 05-02-2024 
    * @param developerName 
    * @return CB_Outbound_API_Request_Detail__mdt 
    **/
    @AuraEnabled(cacheable=true)
    public static CB_Outbound_API_Request_Detail__mdt fetchRequestBody(String developerName){
        return [SELECT Id, JSON_Body__c FROM CB_Outbound_API_Request_Detail__mdt WHERE DeveloperName =: developerName LIMIT 1];
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
    
}