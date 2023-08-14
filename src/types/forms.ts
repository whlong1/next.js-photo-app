export interface PhotoFormData {
  id?: string;
  year?: number;
  title?: string;
  category?: string;
  location?: string;
  description?: string;
  isUploaded?: boolean;

  // Properties not present in client form data:
  // fileSize, fileName, mimeType, authorId, authorName, createdAt, updatedAt

  // Note: id is appended to formData on submit for updates
}