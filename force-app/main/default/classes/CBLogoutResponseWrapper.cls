public class CBLogoutResponseWrapper {

	public class Status {
		public List<Message> message;
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

	public class Session {
	}
	
	public static CBLogoutResponseWrapper parse(String json) {
		return (CBLogoutResponseWrapper) System.JSON.deserialize(json, CBLogoutResponseWrapper.class);
	}
}