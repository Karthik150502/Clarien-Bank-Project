/**
* @description       : 
* @author            : Prateek Deshmukh
* @group             : Prateek Deshmukh,Aditya S,Mahalakshmi 
* @last modified on  : 04-22-2024
* @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public class CBLoginResponseWrapper {
    
    public Header header;
    public UserDetails userDetails;
    public ForcePwdChangeSettings forcePwdChangeSettings; 
    public UserCustomerIdDetails userCustomerIdDetails;
    
    public class Status {
        public List<Message> message;
    }
    public class Header {
        public Status status;
        public Session session;
    }
    
    public class Session{
        public String sessionId;
        public String fromId; 
    }
    public class Message {
        public String messageCode;
        public String messageDescription;
        public String messageType;
    }   
    
    public class UserDetails {
        public String customerId;
        public String userId;  
        public String lastLoginTime;
    }
    public class ForcePwdChangeSettings {
        public String forcePwdChangeFlag;
        public String forceTxnPwdChangeFlag;
        public String forceUssdChangeFlag;
    }
    
    public class UserCustomerIdDetails {
        public List<UserCustomerIDDetails_REC> userCustomerIDDetails_REC;
    }
    
    public class UserCustomerIDDetails_REC {
        public String customerId;
        public String customerName;
    }
    
public static CBLoginResponseWrapper parse(String json) {
		return (CBLoginResponseWrapper) System.JSON.deserialize(json, CBLoginResponseWrapper.class);
	}
}