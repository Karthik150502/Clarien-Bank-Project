@isTest
public class CBChangePasswordHandlerTest {


    @TestSetup
    public static void makeData(){
        //To Prepare required Data
    }


    @IsTest
    public static void testChangePassword_Scenario1(){
        CBHttpRequestWrapper reqWrapper = new CBHttpRequestWrapper(); 
        reqWrapper.payload = '{"requestUUID":"1709981883916","header":{"bankId":"040","languageId":"001","channelId":"G","loginFlag":"1","stateMode":"N","serviceId":"PWDCHG","opfmt":"XML","ipfmt":"XML","userPrincipal":"RETUSER5","corpPrincipal":"RETUSER5","formId":"8282","accessCode":"rusr@9889"},"pwdChangeRequest":{"signOnFlag":"Y","transactionFlag":"N","signOnPwd":"rusr@9889","signOnNewPwd":"test@7878","reTypeSignOnPwd":"test@7878","reTypeTransPwd":"","transactionPwd":"","transactionNewPwd":"","callMode":""}}';
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'CB_POST_Change_Password';
        String response ='{"requestUUID":"REQ_1709981883916","header":{"status":{"message":[{"messageCode":"0000","messageDescription":"SUCCESS","messageType":"SU"}]},"session":{"sessionId":"WgqEv-MQJIcQ32WGoClbm4YDafPMOCgFnWa8Gvf4.awcanclrnfndv01","fromId":"986"}},"userDetails":""}';
        Test.StartTest();
        String result = CBChangePasswordHandler.handleChangePassword(response,reqWrapper);
        System.assertEquals('{"messageType":"SU","messageDescription":"SUCCESS","messageCode":"0000"}', result, 'The Results do not match.');
        Test.StopTest();
    }

    @IsTest
    public static void testChangePassword_Scenario2(){
        CBHttpRequestWrapper reqWrapper = new CBHttpRequestWrapper(); 
        reqWrapper.payload = '{"requestUUID":"1709981883916","header":{"bankId":"040","languageId":"001","channelId":"G","loginFlag":"1","stateMode":"N","serviceId":"PWDCHG","opfmt":"XML","ipfmt":"XML","userPrincipal":"RETUSER5","corpPrincipal":"RETUSER5","formId":"8282","accessCode":"rusr@9889"},"pwdChangeRequest":{"signOnFlag":"Y","transactionFlag":"N","signOnPwd":"rusr@9889","signOnNewPwd":"test@7878","reTypeSignOnPwd":"test@7878","reTypeTransPwd":"","transactionPwd":"","transactionNewPwd":"","callMode":""}}';
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'CB_POST_Change_Password';
        String response ='{"requestUUID":"REQ_1709981883916","header":{"status":{"message":[{"messageCode":"100489","messageDescription":"","messageType":""}]},"session":{"sessionId":"WgqEv-MQJIcQ32WGoClbm4YDafPMOCgFnWa8Gvf4.awcanclrnfndv01","fromId":"986"}},"userDetails":""}';
        try{
            Test.StartTest();
            String result = CBChangePasswordHandler.handleChangePassword(response,reqWrapper);
            Test.StopTest();
        }catch(Exception e){
            System.assertEquals('You\'ve had 1 failed attempt. Max retries for "Sign-on Password" is 5. Exceeding it disables your access.', e.getMessage(), 'The Exceptions did not match.');
        }
    }



    
    @IsTest
    public static void testChangePassword_Scenario3(){
        CBHttpRequestWrapper reqWrapper = new CBHttpRequestWrapper(); 
        reqWrapper.payload = '{"requestUUID":"1709981883916","header":{"bankId":"040","languageId":"001","channelId":"G","loginFlag":"1","stateMode":"N","serviceId":"PWDCHG","opfmt":"XML","ipfmt":"XML","userPrincipal":"RETUSER5","corpPrincipal":"RETUSER5","formId":"8282","accessCode":"rusr@9889"},"pwdChangeRequest":{"signOnFlag":"Y","transactionFlag":"N","signOnPwd":"rusr@9889","signOnNewPwd":"test@7878","reTypeSignOnPwd":"test@7878","reTypeTransPwd":"","transactionPwd":"","transactionNewPwd":"","callMode":""}}';
        reqWrapper.headers = '{"Cookie": "jsessionid=6465zdvcadv65465SADVSVa613"}';
        reqWrapper.metadataName = 'CB_POST_Change_Password';
        String response ='';
        try{
            Test.StartTest();
            String result = CBChangePasswordHandler.handleChangePassword(response,reqWrapper);
            Test.StopTest();
        }catch(Exception e){
            System.assertEquals('We have encountered some technical issue, kindly retry again after some time.', e.getMessage(), 'The Exceptions did not match.');
        }
    }

      

}