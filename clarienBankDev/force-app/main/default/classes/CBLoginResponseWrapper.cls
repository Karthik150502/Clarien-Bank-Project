public class CBLoginResponseWrapper {
        public class Status {
            public List<Message> message;
        }
         public class Header {
            public Status status;
        }
        public class Message {
            public String messageCode;
            public String messageDescription;
            public String messageType;
        }
        public Header header;
        public UserDetails userDetails;

        public class UserDetails {
            public String customerId;
        }
}