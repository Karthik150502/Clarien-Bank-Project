public class CBApiController {
	private CBRequestBuilder requestBuilder;
    private HttpRequest request;
    private HttpResponse response;
    
    //main function to be called whenever we need to make sync HttpRequest
    public String makeHttpRequest(String payload, String metadataName) {
    	requestBuilder = new CBRequestBuilder();
        request = requestBuilder.buildHttpRequest(payload, metadataName);
        response = new CBApiCallOut().makeHttpCallOut(request);
        // Logger.debug('Response status code: ' + response.getStatusCode());
        // Logger.debug('Response Body: ' + response.getBody());
        return String.valueOf(response.getBody());    
    }
    
    @AuraEnabled(cacheable=true)
    public static String fetchExchangeRate(String payload, String metadataName) {
        return new CBApiController().makeHttpRequest(payload, metadataName);
    }
    
    @AuraEnabled(cacheable=true)
    public static String forgetPassword(String payload, String metadataName) {
        return new CbApiController().makeHttpRequest(payload, metadataName);
    }
    
 
}