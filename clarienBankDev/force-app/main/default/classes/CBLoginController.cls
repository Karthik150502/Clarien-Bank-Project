global class CBLoginController{

   @AuraEnabled()
    public static String login(String payload, String metadataName) {
        string response= new CbApiController().makeHttpRequest(payload, metadataName);
        if(response!=null){
        CBLoginResponseWrapper responseWrapper =(CBLoginResponseWrapper)JSON.deserialize(response, CBLoginResponseWrapper.class);
        string messageCode =responseWrapper.header.status.message[0].messageCode;
        logger.info('Login API messageCode : -->  '+messageCode);
        if(messageCode.equals('0000')){
            string customerId =responseWrapper.UserDetails.customerId;
           string username = getUsername(customerId);
            logger.info('Login username : -->  '+username);
            logger.savelog();
           if(username!=null){
               return sfLogin(username);
           }
        }else{
            string msgCode='M'+messageCode;
            string message= CB_API_Response_Code_Mapping__mdt.getinstance(msgCode).message__c;
            throw new CBCustomLoginException(message);

        }
    }
        return null;
    }


    public static String sfLogin(String username){
       try{
            String startURL = System.Label.CB_Site_Start_URL;
            ApexPages.PageReference lgn = Site.login(username, username, startURL);
            // aura.redirect(lgn);
            return lgn.getUrl();    
       }catch(exception e){
            return e.getMessage();
        }
        
    }
    public static string getUsername(string customerId){
        try{
        return [select id ,Customer_id__c , username from user where Customer_id__c =: customerId LIMIT 1 ].username;
        }catch(exception e){
            return e.getMessage();
        }
    }
    @AuraEnabled
    public static Boolean getIsUsernamePasswordEnabled() {
        Auth.AuthConfiguration authConfig = getAuthConfig();
        return authConfig.getUsernamePasswordEnabled();
    }

    @TestVisible
    private static Auth.AuthConfiguration getAuthConfig() {
        Id networkId =   Network.getNetworkId();
        Auth.AuthConfiguration   authConfig = new   Auth.AuthConfiguration(networkId, '');
        return authConfig;
    }

    global class CBCustomLoginException extends exception{
        
    }
   }