@IsTest public class CBProfileUpdateResponseWrapperTest {



    @IsTest
    public static void testProfileUpdateResponseWrapper(){
        String response = '{"requestUUID":"REQ_1709981883916","header":{"status":{"message":[{"messageCode":"102945","messageDescription":"The records do not exist for the user.","messageType":"BE"}]},"session":{"sessionId":"8jy-vrIkVrUSqvwn8Lmm8FWhrQ0x2QXu7l9I3xE8.awcanclrnfndv01","fromId":"6793"}},"userMaintenanceMUserOutput":{},"footer":{"codedescription":[{"codeSet":[{"code":[{"value":"","description":""}]}]}]}}';
        CBProfileUpdateResponseWrapper responseWrapper = CBProfileUpdateResponseWrapper.parse(response);
        System.assertEquals('The records do not exist for the user.', responseWrapper.header.status.message[0].messageDescription, 'The Response Wrapper value does not match.');
    }
}