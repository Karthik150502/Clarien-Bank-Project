@isTest
public class CBApiCalloutTest {
 @isTest
    public static void testCallout() { 
        String responseBody = '{"requestUUID":"REQ_1709981883916","ErrorResponse":{"header":{"STATUS":{"MESSAGE":{"MESSAGE_CODE":"0000","MESSAGE_DESC":"Session expired  please login again","MESSAGE_TYPE":"FATAL_EXCEPTION"}}}}}';
        CB_MockHttpResponseGenerator mock = new CB_MockHttpResponseGenerator(200, 'SessionExpired', responseBody, null);  
        Test.setMock(HttpCalloutMock.class, mock);
        HttpRequest request =new HttpRequest();
        try{
            new CBApiCallOut().makeHttpCallOut(request);
        }catch(Exception e) {
            System.assertEquals(e.getMessage(), 'Technical issues, Please try again later', 'Failed Assertion, mismatched Responses.'); 
        }
        
        String errorResponse = '{"error": {"status": "Failure","identifier": "APIKIT:BAD_REQUEST","errorMessage": "Required query parameter requestUUID not specified","message": "Required query parameter requestUUID not specified"}}';
        CB_MockHttpResponseGenerator mock2 = new CB_MockHttpResponseGenerator(500, 'Failure', errorResponse, null);  
        Test.setMock(HttpCalloutMock.class, mock2);
        HttpRequest request2 =null;
        try{
            new CBApiCallOut().makeHttpCallOut(request2);
        }catch(Exception e) {
            System.assertNotEquals(e.getMessage(),null); 
        }
    }
}