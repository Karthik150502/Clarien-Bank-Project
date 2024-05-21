@isTest
public class CBErrorHandlerTest {


    @TestSetup
    public static void makeData(){
        //To Prepare required Data
    }


    @IsTest
    public static void testErrorHandler_Scenario1(){
        String msgCode = '102945';
        String metaDataName = 'CB_Post_Profile_Update';
        Test.StartTest();
        String result = CBErrorHandler.getErrorMessage(msgCode, metaDataName);
        Test.StopTest();
        System.assertEquals('The records do not exist for the user.', result, 'The Error messages does not match.');
    }

    @IsTest
    public static void testErrorHandler_Scenario2(){
        String msgCode = '123321';
        String metaDataName = 'CB_Post_Profile_Update';
        Test.StartTest();
        String result = CBErrorHandler.getErrorMessage(msgCode, metaDataName);
        Test.StopTest();
        System.assertEquals('Technical issues, Please try again later', result, 'The Error messages does not match.');
    }


    @IsTest
    public static void testErrorHandler_Scenario3(){
        String labelName = 'CB_Profile_Update_102945';
        Test.StartTest();
        String result = CBErrorHandler.getErrorMessage(labelName);
        Test.StopTest();
        System.assertEquals('The records do not exist for the user.', result, 'The Error messages does not match.');
    }



    @IsTest
    public static void testErrorHandler_Scenario4(){
        String labelName = 'This_label_does_not_exist';
        Test.StartTest();
        String result = CBErrorHandler.getErrorMessage(labelName);
        Test.StopTest();
        System.assertEquals('Internal Error', result, 'The Error messages does not match.');
    }

    @IsTest
    public static void testErrorHandler_Scenario5(){
        String jsonResponse = '{"requestUUID":"REQ_1709981883916","ErrorResponse":{"header":{"STATUS":{"MESSAGE_CODE":"101","MESSAGE_DESC":"Session expired  please login again","MESSAGE_TYPE":"FATAL_EXCEPTION"}}}}'; 
        Test.StartTest();
        try{
            Map<Boolean, String> result = CBErrorHandler.checkApiResponseForError(jsonResponse);
            System.assertEquals('101', result.get(false), 'The MESSAGE_CODE does not match.');
        }catch(Exception e){
            System.assertEquals('Technical API error', e.getMessage(), 'The Error messages does not match.');
        }
        Test.StopTest();
    }


    @IsTest
    public static void testErrorHandler_Scenario6(){
        String jsonResponse = '{"requestUUID":"REQ_1709981883916","header":{"status":{"message":[{"messageCode":"102945","messageDescription":"The records do not exist for the user.","messageType":"BE"}],"session":{"sessionId":"8jy-vrIkVrUSqvwn8Lmm8FWhrQ0x2QXu7l9I3xE8.awcanclrnfndv01","fromId":"6793"}}},"userMaintenanceMUserOutput":{},"footer":{"codedescription":[{"codeSet":[{"code":[{"value":"","description":""}]}]}]}}';
        Test.StartTest();
        try{
            Map<Boolean, String> result = CBErrorHandler.checkApiResponseForError(jsonResponse);
            System.assertEquals('102945', result.get(false), 'The MESSAGE_CODE does not match.');
        }catch(Exception e){
            System.assertEquals('Technical API error', e.getMessage(), 'The Error messages does not match.');
        }
        Test.StopTest();
    }



    @IsTest
    public static void testErrorHandler_Scenario7(){
        String jsonResponse = '{"requestUUID":"REQ_1709981883916","header":{"status":{"message":[{"messageCode":"0000","messageDescription":"The records do not exist for the user.","messageType":"BE"}],"session":{"sessionId":"8jy-vrIkVrUSqvwn8Lmm8FWhrQ0x2QXu7l9I3xE8.awcanclrnfndv01","fromId":"6793"}}},"userMaintenanceMUserOutput":{},"footer":{"codedescription":[{"codeSet":[{"code":[{"value":"","description":""}]}]}]}}';
        Test.StartTest();
        try{
            Map<Boolean, String> result = CBErrorHandler.checkApiResponseForError(jsonResponse);
            System.assertEquals(true, result.containsKey(true), 'The Result does not match does not match.');
        }catch(Exception e){
            System.assertEquals('Technical API error', e.getMessage(), 'The Error messages does not match.');
        }
        Test.StopTest();
    }



    @IsTest
    public static void testErrorHandler_Scenario8(){
        String jsonResponse = '{"requestUUID""REQ_1709981883916","header":"status":{"message":[{"messageCode":"0000","messageDescription":"The records do not exist for the user.","messageType":"BE"}],"session":{"sessionId":"8jy-vrIkVrUSqvwn8Lmm8FWhrQ0x2QXu7l9I3xE8.awcanclrnfndv01","fromId":"6793"}}},"userMaintenanceMUserOutput":{},"footer":{"codedescription":[{"codeSet":[{"code":[{"value":"","description":""}]}]}]}}';
        Test.StartTest();
        try{
            Map<Boolean, String> result = CBErrorHandler.checkApiResponseForError(jsonResponse);
        }catch(Exception e){
            System.assertEquals('Technical API error', e.getMessage(), 'The Error messages does not match.');
        }
        Test.StopTest();
    }






    


}