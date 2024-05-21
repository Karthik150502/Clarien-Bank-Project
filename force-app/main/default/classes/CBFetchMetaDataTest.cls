/**
 * @description       : 
 * @author            : Prateek Deshmukh
 * @group             : 
 * @last modified on  : 05-08-2024
 * @last modified by  : Prateek Deshmukh
**/
@isTest
public class CBFetchMetaDataTest {
    
	@isTest
    public static void testFetchPaths() {
     
        List<CB_Outbound_API_Request_Field_Mapping__mdt> mappings = CBFetchMetaData.fetchPaths('CB_Post_Profile_Search');
        CB_Outbound_API_Request_Field_Mapping__mdt singleMap = mappings[0];
        System.assertEquals(singleMap.Field_Name__c, 'password', 'Failed Assertion, mismatched outputs');
    }
    
    @isTest
    public static void testFetchRequestBody() {
        CB_Outbound_API_Request_Detail__mdt requestBody = CBFetchMetaData.fetchRequestBody('CB_Post_Profile_Search');
        String requestBodyString = JSON.serialize(requestBody.JSON_Body__c);
        System.assertEquals(requestBodyString, '', 'Failed Assertion, mismatched outputs');
    }
}