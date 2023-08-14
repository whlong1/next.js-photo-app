export interface PhotoFormData {
  year?: number;
  title?: string;
  category?: string;
  location?: string;
  description?: string;
  isUploaded?: boolean;

  // Properties not present in client form data:
  // fileSize, fileName, mimeType, authorId, authorName, createdAt, updatedAt
}