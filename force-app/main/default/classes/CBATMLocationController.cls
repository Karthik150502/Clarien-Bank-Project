/**
 * @description       : 
 * @author            : Prateek Deshmukh
 * @group             : 
 * @last modified on  : 05-02-2024
 * @last modified by  : Prateek Deshmukh
**/
global with sharing class CBATMLocationController {
    /**
 * Apex method to retrieve ATM locations
 * Retrieves a list of ATM locations including name, geolocation, address, status, and map URL.
 * @return List<CB_ATM_Location__c> - List of ATM locations
 */
    @AuraEnabled(cacheable=true)
    global static List<CB_ATM_Location__c> getATMLocations() {
        return [SELECT Name,Geolocation__Latitude__s, Geolocation__Longitude__s,Address__c, Status__c, Map_URL__c FROM CB_ATM_Location__c];
    }

    /**
    * @description 
    * @author Prateek Deshmukh | 05-02-2024 
    * @param recordId 
    * @return List<CB_ATM_Location__c> 
    **/
     @AuraEnabled(cacheable=true)
    global static List<CB_ATM_Location__c> getCurrentATMLocation(String recordId) {
        return [SELECT Id,Name,Geolocation__Latitude__s, Geolocation__Longitude__s FROM CB_ATM_Location__c where id=:recordId LIMIT 1];
    }
}