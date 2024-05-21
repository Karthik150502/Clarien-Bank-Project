/**
 * @description       : 
 * @author            : Prateek Deshmukh
 * @group             : 
 * @last modified on  : 04-29-2024
 * @last modified by  : Prateek Deshmukh
**/
public with sharing class CBProfileSearchResponseWrapper {
    public class Status {
		public List<Message> message;
	}

	public class UserDetails {
		public String bayUserId;
		public String cLName;
		public String corpUser;
		public String corpUserType;
		public String cMPhoneNo;
		public String cEmailId;
	}

	public class Message {
		public String messageCode;
		public String messageDescription;
		public String messageType;
	}

	public class Header {
		public Status status;
		public Session session;
	}

	public String requestUUID;
	public Header header;
	public UserDetails userDetails;

	public class Session {
		public String sessionId;
		public String fromId;
	}
public static CBProfileSearchResponseWrapper parse(String json) {
		return (CBProfileSearchResponseWrapper) System.JSON.deserialize(json, CBProfileSearchResponseWrapper.class);
	}
	
}