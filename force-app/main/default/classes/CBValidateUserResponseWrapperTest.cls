@isTest
public class CBValidateUserResponseWrapperTest {

    @IsTest
    public static void testValidateUserResponseWrapperTest(){
		String response = '{"requestUUID":"1709981883916","header":{"status":{"message":[{"messageCode":"0000","messageDescription":"SUCCESS","messageType":"SU"}]},"session":{"sessionId":"FcRoYqCkOmmNv8Cuw7Nle0DvOgYRwwp35ZEEL59-.awcanclrnfndv01","fromId":"6635"}},"pagination":null},"fpValidateUser":{"sectionId":"LGOTP"},"footer":{"codedescription":[{"codeSet":[{"code":[{"value":"","description":""}]}]}]}}';
        CBValidateUserResponseWrapper responseWrapper = CBValidateUserResponseWrapper.parse(response);
        System.assertNotEquals(null, responseWrapper, 'The Response Wrapper value does not match.');
    }
}