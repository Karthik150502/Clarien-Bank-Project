/**
 * @description       : 
 * @author            : Prateek Deshmukh
 * @group             : 
 * @last modified on  : 05-02-2024
 * @last modified by  : Prateek Deshmukh
**/
@isTest
global class CB_MockHttpResponseGenerator implements HttpCalloutMock {

    protected Integer statusCode;
    protected String status;
    protected Map<String, String> resHeaders;
    protected String body;

    global CB_MockHttpResponseGenerator(Integer code, String status, String body, Map<String, String> resHeaders){
        this.statusCode = code;
        this.status = status;
        this.resHeaders = resHeaders;
        this.body = body;
    }


    /**
    * @description 
    * @author Prateek Deshmukh | 05-02-2024 
    * @param req 
    * @return HTTPResponse 
    **/
    global HTTPResponse respond(HTTPRequest req) {
        HttpResponse res = new HttpResponse();
        if(this.resHeaders != null){
            for(String key: this.resHeaders.keyset()){
                res.setHeader(key, this.resHeaders.get(key));
            }
        }

        if(this.body!=null && this.body !=''){
            res.setBody(this.body);
        }

        if(this.statusCode!=null){
            res.setStatusCode(this.statusCode);
        }

        if(this.status!=null && this.status !=''){
            res.setStatus(this.status);
        }

        return res;
    }
}