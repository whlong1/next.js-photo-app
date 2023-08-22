export interface PhotoFormData {
  id?: string;
  year?: number;
  title?: string;
  category?: string;
  location?: string;
  description?: string;
  isUploaded?: boolean;
  isPublic?: boolean;

  // Properties not present in client form data:
  // fileSize, fileName, mimeType, authorId, authorName, createdAt, updatedAt

  // Note: id is appended to formData on submit for updates
}


export interface VideoFormData {
  year?: number;
  genre?: string;
  title?: string;
  artist?: string;
  director?: string;
  category?: string;

  // videoUrl: string | null;
  // thumbnailUrl: string | null;

  // Optional form data values:
  // authorId?: string;
  // updatedAt?: Date;
  // createdAt?: Date;
}


export interface ImageAttributes {
  width: number;
  height: number;
}