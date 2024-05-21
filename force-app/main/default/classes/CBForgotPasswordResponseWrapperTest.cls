@isTest
public class CBForgotPasswordResponseWrapperTest {
    @isTest
    public static void testParse(){
        String response = '{"requestUUID":"1709981883916","header":{"status":{"message":[{"messageCode":"11131","messageDescription":"The new and retyped sign-on passwords do not match.","messageType":"BE"}]},"session":{"sessionId":"jjFBBQRCqU4nnwSYM63rwZO5qGE-f7L4F5aHKCmX.awcanclrnfndv01","fromId":"501"}},"footer":{"codedescription":[{"codeSet":[{"code":[{"value":"","description":""}]}]}]}}';
        
        CBForgotPasswordResponseWrapper responseWrapper = CBForgotPasswordResponseWrapper.parse(response);
        
        System.debug('ResponseWrapper: ' + responseWrapper);
        System.assertNotEquals(null, responseWrapper);

    }
}