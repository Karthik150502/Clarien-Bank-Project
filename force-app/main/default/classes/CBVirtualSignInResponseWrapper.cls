public class CBVirtualSignInResponseWrapper {
	public class Status {
		public List<Message> message;
	}

	public class Pagination {
		public String numRecReturned;
		public String hasMoreRecords;
	}

	public class UserDetails {
		public String bankId;
		public String userId;
		public String corporateId;
		public String individualId;
		public String languageId;
		public String channelId;
		public String userType;
		public String userFirstName;
		public String userLastName;
		public String userPreferredDateFormat;
		public String userLocaleCountryCode;
		public String userLocaleLanguageCode;
		public String userMenuProfileId;
		public String userSignOnstatus;
		public String lastLoginTime;
		public String pwdEnabledFlag;
		public String txnPwdEnabledFlag;
		public String totalNumberOfLogin;
		public String recordUserId;
		public String lastUnsuccessfulLoginChannel;
		public String lastUnsuccessfulLoginTime;
	}

	public String requestUUID;
	public Header header;
	public UserDetails userDetails;
	public ForceChangePwd forceChangePwd;
	public ForceChangePwd realtionshipDetails;
	public ForceChangePwd userCustomerIdDetails;
	public Footer footer;

	public class Message {
		public String messageCode;
		public String messageDescription;
		public String messageType;
	}

	public class Header {
		public Status status;
		public Session session;
		public List<Pagination> pagination;
	}

	public class ForceChangePwd {
	}

	public class Footer {
		public List<Codedescription> codedescription;
	}

	public class Code {
		public String value;
		public String description;
	}

	public class CodeSet {
		public List<Code> code;
	}

	public class Codedescription {
		public List<CodeSet> codeSet;
	}

	public class Session {
		public String sessionId;
		public String fromId;
	}

	
	public static CBVirtualSignInResponseWrapper parse(String json) {
		return (CBVirtualSignInResponseWrapper) System.JSON.deserialize(json, CBVirtualSignInResponseWrapper.class);
	}

}