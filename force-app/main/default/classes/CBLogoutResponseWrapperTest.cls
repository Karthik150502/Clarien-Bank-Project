@IsTest public class CBLogoutResponseWrapperTest {



    @IsTest
    public static void testLogoutResponseWrapper(){
        String response = '{"requestUUID":"1709981883917","header":{"status":{"message":[{"messageCode":"0000","messageDescription":"SUCCESS","messageType":"SU"}]},"session":{}}}';
        CBLogoutResponseWrapper responseWrapper = CBLogoutResponseWrapper.parse(response);


        System.assertEquals('SUCCESS', responseWrapper.header.status.message[0].messageDescription, 'The Response Wrapper value does not match.');
    }

}