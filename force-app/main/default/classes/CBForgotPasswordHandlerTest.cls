@isTest
public class CBForgotPasswordHandlerTest {


    @TestSetup
    public static void makeData(){
        //To Prepare required Data
    }


    @IsTest
    public static void testForgotPasswordHandler_Scenario1(){
        CBHttpRequestWrapper reqWrapper = new CBHttpRequestWrapper(); 
        reqWrapper.payload = '{"requestUUID":"1709981883916","header":{"bankId":"040","languageId":"001","channelId":"G","loginFlag":"1","stateMode":"N","serviceId":"PWDCHG","opfmt":"XML","ipfmt":"XML","userPrincipal":"RETUSER5","corpPrincipal":"RETUSER5","fromId":"8282","accessCode":"rusr@9889"},"pwdChangeRequest":{"signOnFlag":"Y","transactionFlag":"N","signOnPwd":"rusr@9889","signOnNewPwd":"test@7878","reTypeSignOnPwd":"test@7878","reTypeTransPwd":"","transactionPwd":"","transactionNewPwd":"","callMode":""}}';
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'CB_POST_Forgot_Password';
        String response ='{"requestUUID":"1715797800000","header":{"status":{"message":[{"messageCode":"15520","messageDescription":"The password is changed successfully.","messageType":"BC"}]},"session":{"sessionId":"nT3LI7_JaQ6GDwm0np_1UY1ke2w4gHKrV3dHyXI3.awcanclrnfndv01","fromId":"258"},"pagination":null},"footer":{"codedescription":[{"codeSet":[{"code":[{"value":"","description":""}]}]}]}}';
        Test.StartTest();
         try{
            String result = CBForgotPasswordHandler.handleForgotPassword(response,reqWrapper);
        }catch(Exception e){
            System.assertNotEquals(null, e.getMessage(), 'The error responses do not match!');
        }
        Test.StopTest();
    }


    @IsTest
    public static void testForgotPasswordHandler_Scenario2(){
        CBHttpRequestWrapper reqWrapper = new CBHttpRequestWrapper(); 
        reqWrapper.payload = '{"requestUUID":"1709981883916","header":{"bankId":"040","languageId":"001","channelId":"G","loginFlag":"1","stateMode":"N","serviceId":"PWDCHG","opfmt":"XML","ipfmt":"XML","userPrincipal":"RETUSER5","corpPrincipal":"RETUSER5","formId":"8282","accessCode":"rusr@9889"},"pwdChangeRequest":{"signOnFlag":"Y","transactionFlag":"N","signOnPwd":"rusr@9889","signOnNewPwd":"test@7878","reTypeSignOnPwd":"test@7878","reTypeTransPwd":"","transactionPwd":"","transactionNewPwd":"","callMode":""}}';
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'CB_POST_Forgot_Password';
        String response ='{"requestUUID":"1715797800000","header":{"status":{"message":[{"messageCode":"1111","messageDescription":"The password is changed successfully.","messageType":"BC"}]},"session":{"sessionId":"nT3LI7_JaQ6GDwm0np_1UY1ke2w4gHKrV3dHyXI3.awcanclrnfndv01","fromId":"258"},"pagination":null},"footer":{"codedescription":[{"codeSet":[{"code":[{"value":"","description":""}]}]}]}}';
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