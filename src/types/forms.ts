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
  // Note: id can be appended to formData on submit for updates
}

export interface FileUploadData {
  fullsize: File | null;
  thumbnail: File | null;
  medium: File | null;

  fileName: string;
  mimeType: string;
  fileSize: number;

  width: number;
  height: number;
  aspectRatio: string;

  rgb: string;
  hex: string;
  isDark: boolean;
  hueDegree: number;
  dominantColor: string;
}

export interface ImageAttributes {
  width: number;
  height: number;
}