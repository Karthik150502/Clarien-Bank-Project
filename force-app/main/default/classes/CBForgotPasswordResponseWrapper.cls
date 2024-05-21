public class CBForgotPasswordResponseWrapper {

	public class Status {
		public List<Message> message;
	}

	public String requestUUID;
	public Header header;
	public Footer footer;

	public class Message {
		public String messageCode;
		public String messageDescription;
		public String messageType;
	}

	public class Header {
		public Status status;
		public Session session;
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

	
	public static CBForgotPasswordResponseWrapper parse(String json) {
		return (CBForgotPasswordResponseWrapper) System.JSON.deserialize(json, CBForgotPasswordResponseWrapper.class);
	}
}