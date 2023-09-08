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

  fileSize: number;
  fileName: string;
  mimeType: string;

  width: number;
  height: number;
  aspectRatio: string;

  // Color
  rgb: string;
  hex: string;
  isDark: boolean;
  hueDegree: number;
  dominantColor: string;

  updatedAt: Date;
  createdAt: Date;
  isUploaded: boolean;
  isPublic: boolean;

  authorId: string;
  authorName: string;

  // The url prop is temporarily appended on server and not present on data
  // returned from the initial Prisma operation
  url?: string | null;
}