public class CBRequestBuilder {
    //stores the domain or basepath of the Api Callouts
    String basePath = 'callout:CB_Named_Cred';
    
    //builds the request and returns the request to HttpRequest
	public HttpRequest buildHttpRequest(String payload, String metadataName) {
        HttpRequest request = new HttpRequest();
        
        CB_Outbound_API_Request_Detail__mdt requestData = CB_Outbound_API_Request_Detail__mdt.getInstance(metadataName);
        if(requestData != null){
            request.setMethod(requestData.Method_Type__c);
            request.setEndPoint(basePath + requestData.Endpoint_Path__c);
            // logger.info('API Endpoint: ' + basePath + requestData.Endpoint_Path__c);
            // logger.savelog();
            request.setHeader('Content-type', 'application/json');
            request.setHeader('Accept', 'application/json');
            request.setTimeout(60000); 
            if(requestData.Headers__c != null){
                request.setHeader(requestData.Headers__c.split(',')[0],requestData.Headers__c.split(',')[1]);    
            }

            if(payload != '') {
               request.setBody(payload); 
            }
            return request;
        }else{
            return request;
        }
    }
}