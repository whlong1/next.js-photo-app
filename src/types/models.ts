export interface Greeting {
  id: number;
  text: string;
  sentiment: string;
  recipient: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface Photo {
  id: string;

  // Optional Properties:
  year: number | null;
  title: string | null;
  category: string | null;
  location: string | null;
  description: string | null;

  // File
  fileSize: number;
  fileName: string;
  mimeType: string;

  // Size
  width: number;
  height: number;
  aspectRatio: string;

  // Color
  rgb: string;
  hex: string;
  isDark: boolean;
  hueDegree: number;
  dominantColor: string;

  // Meta
  updatedAt: Date;
  createdAt: Date;
  isPublic: boolean;
  isUploaded: boolean;

  // Clerk auth
  authorId: string;
  authorName: string;

  // The url prop is temporarily appended on server and not present on data
  // returned from the initial Prisma operation
  url?: string | null;
}