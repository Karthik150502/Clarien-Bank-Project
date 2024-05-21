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
        }catch(Exception e){
            //throw new CBErrorHandler.CBCustomAPIException(String.valueOf(response.getStatusCode())); 
            throw new CBErrorHandler.CBCustomAPIException(String.valueOf(e.getMessage())); 
        }
        return response;
    }
}