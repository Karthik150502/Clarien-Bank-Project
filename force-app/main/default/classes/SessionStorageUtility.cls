public class SessionStorageUtility {

    @future 
    public static void set(Map<String, String> sessionData){
        try{
            for (String key : sessionData.keyset()) {
                Cache.Session.put(key, sessionData.get(key));
            }
            logger.info('Session stored.');
            logger.savelog();
        }catch(Exception e){
            logger.error('Cannot store session = ' + e.getMessage());
            logger.savelog();
        }
    }



    @AuraEnabled(cacheable=true)
    public static void put(String key, String value) {
        try{
            Cache.Session.put(key, value);
            logger.info('Session stored.');
            logger.savelog();
        }catch(Exception e){
            logger.error('Cannot store session = ' + e.getMessage());
            logger.savelog();
        }
    }

    @AuraEnabled(cacheable=true)
    public static String get(String key) {
        return (String)Cache.Session.get(key);
    }
    
    @AuraEnabled(cacheable=true)
    public static void setSessionData(String sessionData) {
        Map<String, String> sessData = (Map<String, String>) JSON.deserializeUntyped(sessionData);
        set(sessData);
    }


    @AuraEnabled(cacheable=true)
    public static Map<String, String> getSessionData(List<String> keys) {
        Map<String, String> resultMap = new Map<String, String>();
        for (String key : keys) {
            String value = (String)Cache.Session.get(key);
            resultMap.put(key, value);
        }
        return resultMap;
    }

}