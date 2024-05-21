public with sharing class JSONBuilder {
    @AuraEnabled(cacheable=true)
    public static String buildUpdatedJSON(String jsonTemplate ,Map<String, String> keyValueMap) {
        
        // Deserialize the JSON string into an OrderedMap
        Map<String, Object> jsonMap = (Map<String, Object>) JSON.deserializeUntyped(jsonTemplate);
        
        // Recursively update the JSON map
        updateJSONMap(jsonMap, keyValueMap);
        
        // Serialize the updated JSON map back into a string
        String updatedJSONString = JSON.serialize(jsonMap);
        
        return updatedJSONString;
    }
    
    // Recursive method to update nested JSON structures
    private static void updateJSONMap(Map<String, Object> jsonMap, Map<String, String> keyValueMap) {
        for (String key : jsonMap.keySet()) {
            Object value = jsonMap.get(key);
            if (!(value instanceof List<Object>) && !(value instanceof Map<String, Object>)) {
                // If the value is not a collection type, directly check and update it
                if (value instanceof String || value instanceof Decimal || value instanceof Boolean) {
                    // If the value is a string, number, or boolean, and the key exists in the provided map, update it
                    if (keyValueMap.containsKey(key)) {
                        jsonMap.put(key, keyValueMap.get(key));
                    }
                }
            } else if (value instanceof Map<String, Object>) {
                // If the value is a nested map, recursively call updateJSONMap
                updateJSONMap((Map<String, Object>) value, keyValueMap);
            } else if (value instanceof List<Object>) {
                // If the value is a list, iterate over each element and recursively call updateJSONMap
                List<Object> listofValues = (List<Object>) value;
                for (Object element : listofValues) {
                    if (element instanceof Map<String, Object>) {
                        updateJSONMap((Map<String, Object>) element, keyValueMap);
                    }
                }
            }
            // Add additional else if blocks for other types of nested structures if needed
        }
    }
}