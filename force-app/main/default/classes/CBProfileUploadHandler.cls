public class CBProfileUploadHandler {
/**
     * Apex method to retrieve the ContentDocumentId of the profile picture
     * Retrieves the ContentDocumentId of the profile picture ContentVersion.
     * @return String - ContentDocumentId of the profile picture ContentVersion
     */
 @AuraEnabled
  public static String getProfileDocId() {
      try{
        return [SELECT Id,ContentDocumentId FROM ContentVersion WHERE IsMajorVersion = false LIMIT 1].id;
      }catch(Exception e){
          return e.getMessage();
      }
  }
/**
     * Apex method to upload a file as a profile picture
     * Uploads a file as a profile picture for the current user.
     * @param base64 String - Base64-encoded file content
     * @param filename String - Name of the file
     * @return String - Id of the ContentDocumentLink created for the uploaded profile picture
     */
  @AuraEnabled
  public static String uploadFile(String base64, String filename) {
try {
    // Fetch the current user's name
    String currentUserFullName = UserInfo.getName();
    String recordId = UserInfo.getUserId();
    // Split the filename into name and extension
    String[] fileNameParts = filename.split('\\.');
    String fileExtension = fileNameParts.size() > 1 ? fileNameParts[1] : '';
    
    // Construct the new filename with the user's name before the filename extension
    string newFilename =currentUserFullName.replaceAll(' ','') +'_Profile_Image'+'.' + fileExtension;
    // Query for existing file
  List<ContentVersion> existingFiles = [SELECT Id FROM ContentVersion WHERE IsMajorVersion = false LIMIT 1];
    
    // Check if an existing file was found
    if (!existingFiles.isEmpty()) {
        // Get the existing file
        ContentVersion existingFile = existingFiles[0];
        
        // Update existing content version with new version data
        existingFile.VersionData = EncodingUtil.base64Decode(base64);
        
            update existingFile;
            
            // Create and insert the new content document link
            ContentDocumentLink cdl = createContentLink(existingFile.Id, recordId);
            if (cdl == null) {
                // Rollback the update if ContentDocumentLink insertion fails
                // You might want to handle this differently based on your use case
               return null;
            }
            
            return cdl.Id;
        
    } else {
        // Create and insert the new content version
        ContentVersion cv = createContentVersion(base64, newFilename);
        if (cv == null) {
            return null;
        }

        // Create and insert the new content document link
        ContentDocumentLink cdl = createContentLink(cv.Id, recordId);
        if (cdl == null) {
            // Rollback the insertion of ContentVersion if ContentDocumentLink insertion fails
            return null;
        }

        return cdl.Id;
    } 

  }catch(DMLException e) {
            System.debug(e);
            return e.getMessage();
        }
  }

 /**
     * Private method to create a new ContentVersion
     * Creates and inserts a new ContentVersion with the given base64 content and filename.
     * @param base64 String - Base64-encoded file content
     * @param filename String - Name of the file
     * @return ContentVersion - The created ContentVersion
     */
  private static ContentVersion createContentVersion(String base64, String filename) {
      ContentVersion cv = new ContentVersion();
      cv.VersionData = EncodingUtil.base64Decode(base64);
      cv.Title = filename;
      cv.PathOnClient = filename;
      cv.IsMajorVersion = false;

      try {
          insert cv;
          return cv;
      } catch(DMLException e) {
          System.debug(e);
          return null;
      }
  }
 /**
     * Private method to create a new ContentDocumentLink
     * Creates and inserts a new ContentDocumentLink for the given ContentVersion and recordId.
     * @param contentVersionId Id - Id of the ContentVersion
     * @param recordId String - Id of the record to which the ContentDocumentLink is linked
     * @return ContentDocumentLink - The created ContentDocumentLink
     */
  private static ContentDocumentLink createContentLink(Id contentVersionId, String recordId) {
      if (contentVersionId == null || recordId == null) {
          return null;
      }
      ContentDocumentLink cdl = new ContentDocumentLink();
      cdl.ContentDocumentId = [
          SELECT ContentDocumentId 
          FROM ContentVersion 
          WHERE Id = :contentVersionId
      ].ContentDocumentId;
      cdl.LinkedEntityId = recordId;
      // ShareType is either 'V', 'C', or 'I'
      // V = Viewer, C = Collaborator, I = Inferred
      cdl.ShareType = 'V';
      try {
          insert cdl;
          return cdl;
      } catch(DMLException e) {
          System.debug(e);
          return null;
      }
  }
}