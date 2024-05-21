public class CBApiCallOut {
    public HttpResponse makeHttpCallOut(HttpRequest request){
        HttpResponse response = new Http().send(request);
        
        // Check the status code
        if (response.getStatusCode() >= 400) {
            return null; // Return null if there's an error
        }
        
        return response;
    }
}