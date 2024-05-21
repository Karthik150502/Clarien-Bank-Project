@isTest
public class CBATMLocationControllerTest {
  @TestSetup
    public static void makeData(){
      List<CB_ATM_Location__c> testATMLocations = new List<CB_ATM_Location__c>();
        
        // Create test records
        for(Integer i = 0; i < 5; i++) {
            CB_ATM_Location__c testATMLocation = new CB_ATM_Location__c(
                Name = 'Test ATM ' + i,
                Geolocation__Latitude__s = 37.7749, // Example latitude
                Geolocation__Longitude__s = -122.4194, // Example longitude
                Address__c = 'Test Address ' + i,
                Status__c = 'In Service' // Example status
            );
            testATMLocations.add(testATMLocation);
        }
        
        // Insert test records
        insert testATMLocations;
    }
     // Test method for getATMLocations
    @isTest
    static void testGetATMLocations() {        
        // Call the method to be tested
        List<CB_ATM_Location__c> result = CBATMLocationController.getATMLocations();
        
        // Assert the results
        System.assertNotEquals(null, result, 'Result should not be null');
        System.assertEquals(5, result.size(), 'Result should contain 5 records'); // Adjust count based on your test data
        // Add more specific assertions based on the expected behavior of the method
    }
    
    // Test method for getCurrentATMLocation
    @isTest
    static void testGetCurrentATMLocation() {
                
        // Get a test ATM location record Id
        List<CB_ATM_Location__c> testLocations = [SELECT Id FROM CB_ATM_Location__c LIMIT 1];
        Id testRecordId = testLocations.isEmpty() ? null : testLocations[0].Id;
        
        // Call the method to be tested
        List<CB_ATM_Location__c> result = CBATMLocationController.getCurrentATMLocation(testRecordId);
        
        // Assert the results
        System.assertNotEquals(null, result, 'Result should not be null');
        System.assertEquals(1, result.size(), 'Result should contain 1 record'); // We're querying only one record
        // Add more specific assertions based on the expected behavior of the method
    }
}