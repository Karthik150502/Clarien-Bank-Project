public class CBApiCallOut {

    /**
    * @description : Performs the API callout for us
    * @param {HttpRequest} request  
    * @return {HttpResponse} The API response, sent to CBApiController
    **/
    public HttpResponse makeHttpCallOut(HttpRequest request){
        HttpResponse response;
        try{
            response = new Http().send(request);
            Logger.debug('Response status code: ' + response.getStatusCode());
        	Logger.debug('Response Body: ' + response.getBody());
            logger.saveLog();
        }catch(Exception e){
            //throw new CBErrorHandler.CBCustomAPIException(String.valueOf(response.getStatusCode())); 
             Logger.error('Error at callout: ' + e.getMessage());
            logger.saveLog();
            throw new CBErrorHandler.CBCustomAPIException(String.valueOf(e.getMessage())); 
        }
        return response;
    }
}