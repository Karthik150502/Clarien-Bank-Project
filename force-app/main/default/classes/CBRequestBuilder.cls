/**
 * @description       : 
 * @author            : Prateek Deshmukh
 * @group             : 
 * @last modified on  : 04-24-2024
 * @last modified by  : Prateek Deshmukh
**/
public class CBRequestBuilder {
    // stores the domain or basepath of the Api Callouts
   String basePath = 'callout:MuleSoft_Integration_NC';
    /**
    * @description : Building the structure of the API request.
    * @param {CBHttpRequestWrapper} wrapper  
    * @return {HttpRequest} The API request sent to CBApiController
    **/
	public HttpRequest buildHttpRequest(CBHttpRequestWrapper reqWrapper) {
        HttpRequest request = new HttpRequest();

        try{
            // Fetching the API details Meta Data from the Org
            logger.info('Metadata wrapper name : ' + reqWrapper?.metadataName);
            logger.savelog();

            CB_Outbound_API_Request_Detail__mdt requestData = CB_Outbound_API_Request_Detail__mdt.getInstance(reqWrapper.metadataName);
            
            if(requestData != null){
                request.setMethod(requestData.Method_Type__c);
                request.setEndPoint(basePath + requestData.Endpoint_Path__c);
                logger.info('API Endpoint: ' + basePath + requestData.Endpoint_Path__c);
                logger.info('API payload: ' + reqWrapper.payload);
                logger.info('API headers: ' + reqWrapper.headers);
                logger.savelog();
                if(requestData?.isXml__c){
                    request.setHeader('Content-type', 'application/xml');
                    request.setHeader('Accept', 'application/xml');
                }
                else{
                    request.setHeader('Content-type', 'application/json');
                    request.setHeader('Accept', 'application/json');
                }
                request.setTimeout(60000); 
                if(requestData.Headers__c != null){
                    request.setHeader(requestData.Headers__c.split(',')[0],requestData.Headers__c.split(',')[1]);    
                }
                if(reqWrapper.payload != null && reqWrapper.payload != '') {
                   request.setBody(reqWrapper.payload); 
                }
                if(reqWrapper?.headers != null && reqWrapper?.headers != ''){
                    Map<String, Object> headerMap = (Map<String, Object>) JSON.deserializeUntyped(reqWrapper?.headers);
                    for(String key: headerMap.keyset()) {
                        request.setHeader(key, String.valueOf(headerMap.get(key)));
                    }
                }
                logger.info('final request endpoint: ' + request.getEndpoint());
                return request;
            }else{
                return request;
            }
        }
        catch(Exception e){
            logger.error('Error while building http request: '+e.getStackTraceString());
            logger.savelog();
            
            return request;
        }
    }
    

}