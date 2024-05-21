public class CBValidateUserResponseWrapper {

	public class Status {
		public List<Message> message;
	}

	public String requestUUID;
	public Header header;
	public FpValidateUser fpValidateUser;
	public Footer footer;

	public class Message {
		public String messageCode;
		public String messageDescription;
		public String messageType;
	}

	public class Header {
		public Status status;
		public Session session;
		public Object pagination;
	}

	public class Footer {
		public List<Codedescription> codedescription;
	}

	public class FpValidateUser {
		public String sectionId;
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

	
	public static CBValidateUserResponseWrapper parse(String json) {
		return (CBValidateUserResponseWrapper) System.JSON.deserialize(json, CBValidateUserResponseWrapper.class);
	}
}