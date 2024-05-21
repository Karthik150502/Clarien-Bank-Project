/**
 * @description       : 
 * @author            : Prateek Deshmukh
 * @group             : 
 * @last modified on  : 04-23-2024
 * @last modified by  : Prateek Deshmukh
**/
public with sharing class CBHttpRequestWrapper {
    @AuraEnabled public String payload { get; set; }
    @AuraEnabled public String metadataName { get; set; }
    @AuraEnabled public String headers { get; set; }
}