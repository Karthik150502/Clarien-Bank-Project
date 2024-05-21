@IsTest
public class CB_MockHttpResponseGeneratorTest {

    @TestSetup
    public static void makeData(){
        //To Prepare required Data
    }


    
    @IsTest
    public static void testMockResponseGenerator_Scenario1(){
        //To Prepare required Data
        CBHttpRequestWrapper reqWrapper = new CBHttpRequestWrapper();
        reqWrapper.payload = '{"requestUUID":"REQ_1709981883916","header":{"channelId":"I","loginFlag":"3","serviceId":"MCUIDI","stateMode":"Y","userId":"INFOSYS.ANBA","userPrincipal":"040.BULKVU","corpPrincipal":"040","accessCode":"a","formId":"67900"},"userMaintenanceMUser":{"bayUserId":"INFOSYS","corpUserType":"NORMAL","userType":2,"corpUser":"ANBA","cEmailId":"ramesh@gmail.com","cMPhoneNo":"5555667989"}}';
        reqWrapper.metadataName = 'CB_GET_Exchange_Rates';
        try{
            String expectedResponse = '{"fxRateList": [{"date": "2024-04-30", "counterCurrency": "BMD", "baseCurrency": "BMD", "rateCode": "TTS", "units": 1, "rate": "1.0"}, {"date": "2024-04-30", "counterCurrency": "JPY", "baseCurrency": "BMD", "rateCode": "TTB", "units": 1, "rate": "1.0"}], "requestUUID": "REQ_17099818839709990"}';    
            CB_MockHttpResponseGenerator mock = new CB_MockHttpResponseGenerator(200, 'OK', expectedResponse, null);
            Test.setMock(HttpCalloutMock.class, mock);
            String responseBody = CBApiController.fetchExchangeRate(reqWrapper);
            System.assertEquals(responseBody, expectedResponse, 'Failed Assertion, mismatched responses.');
        }catch(Exception e){
            System.debug('Some Error occured: ' + e.getMessage());    
        }
    }



}