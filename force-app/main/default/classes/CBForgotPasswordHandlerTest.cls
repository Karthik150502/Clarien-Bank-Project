@isTest
public class CBForgotPasswordHandlerTest {


    @TestSetup
    public static void makeData(){
        //To Prepare required Data
    }


    @IsTest
    public static void testForgotPasswordHandler_Scenario1(){
        CBHttpRequestWrapper reqWrapper = new CBHttpRequestWrapper(); 
        reqWrapper.payload = '{"requestUUID":"1709981883916","header":{"bankId":"040","languageId":"001","channelId":"G","loginFlag":"1","stateMode":"N","serviceId":"PWDCHG","opfmt":"XML","ipfmt":"XML","userPrincipal":"RETUSER5","corpPrincipal":"RETUSER5","formId":"8282","accessCode":"rusr@9889"},"pwdChangeRequest":{"signOnFlag":"Y","transactionFlag":"N","signOnPwd":"rusr@9889","signOnNewPwd":"test@7878","reTypeSignOnPwd":"test@7878","reTypeTransPwd":"","transactionPwd":"","transactionNewPwd":"","callMode":""}}';
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'CB_POST_Forgot_Password';
        String response ='{"requestUUID":"1709981883916","header":{"status":{"message":[{"messageCode":"0000","messageDescription":"The new and retyped sign on passwords do not match.","messageType":"BE"}],"session":{"sessionId":"jjFBBQRCqU4nnwSYM63rwZO5qGE-f7L4F5aHKCmX.awcanclrnfndv01","fromId":"501"}}},"footer":{"codedescription":[{"codeSet":[{"code":[{"value":"","description":""}]}]}]}}';
        Test.StartTest();
        String result = CBForgotPasswordHandler.handleForgotPassword(response,reqWrapper);
        System.assertEquals('{"messageType":"BE","messageDescription":"The new and retyped sign on passwords do not match.","messageCode":"0000"}', result, 'The Results do not match.');
        Test.StopTest();
    }


    @IsTest
    public static void testForgotPasswordHandler_Scenario2(){
        CBHttpRequestWrapper reqWrapper = new CBHttpRequestWrapper(); 
        reqWrapper.payload = '{"requestUUID":"1709981883916","header":{"bankId":"040","languageId":"001","channelId":"G","loginFlag":"1","stateMode":"N","serviceId":"PWDCHG","opfmt":"XML","ipfmt":"XML","userPrincipal":"RETUSER5","corpPrincipal":"RETUSER5","formId":"8282","accessCode":"rusr@9889"},"pwdChangeRequest":{"signOnFlag":"Y","transactionFlag":"N","signOnPwd":"rusr@9889","signOnNewPwd":"test@7878","reTypeSignOnPwd":"test@7878","reTypeTransPwd":"","transactionPwd":"","transactionNewPwd":"","callMode":""}}';
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'CB_POST_Forgot_Password';
        String response ='{"requestUUID":"1709981883916","header":{"status":{"message":[{"messageCode":"11131","messageDescription":"The new and retyped sign on passwords do not match.","messageType":"BE"}],"session":{"sessionId":"jjFBBQRCqU4nnwSYM63rwZO5qGE-f7L4F5aHKCmX.awcanclrnfndv01","fromId":"501"}}},"footer":{"codedescription":[{"codeSet":[{"code":[{"value":"","description":""}]}]}]}}';
        Test.StartTest();
        try{
            String result = CBForgotPasswordHandler.handleForgotPassword(response,reqWrapper);
        }catch(Exception e){
            System.assertEquals('The new and retyped sign on passwords do not match.', e.getMessage(), 'The error responses do not match!');
        }
        Test.StopTest();
    }



    @IsTest
    public static void testForgotPasswordHandler_Scenario3(){
        CBHttpRequestWrapper reqWrapper = new CBHttpRequestWrapper(); 
        reqWrapper.payload = '{"requestUUID":"1709981883916","header":{"bankId":"040","languageId":"001","channelId":"G","loginFlag":"1","stateMode":"N","serviceId":"PWDCHG","opfmt":"XML","ipfmt":"XML","userPrincipal":"RETUSER5","corpPrincipal":"RETUSER5","formId":"8282","accessCode":"rusr@9889"},"pwdChangeRequest":{"signOnFlag":"Y","transactionFlag":"N","signOnPwd":"rusr@9889","signOnNewPwd":"test@7878","reTypeSignOnPwd":"test@7878","reTypeTransPwd":"","transactionPwd":"","transactionNewPwd":"","callMode":""}}';
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'CB_POST_Forgot_Password';
        String response ='';
        Test.StartTest();
        try{
            String result = CBForgotPasswordHandler.handleForgotPassword(response,reqWrapper);
        }catch(Exception e){
            System.assertEquals('We have encountered some technical issue, kindly retry again after some time.', e.getMessage(), 'The error responses do not match!');
        }
        Test.StopTest();
    }


}