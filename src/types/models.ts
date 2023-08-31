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

  // Null properties if file is uploaded before resource:
  year: number | null;
  title: string | null;
  category: string | null;
  location: string | null;
  description: string | null;

  // Null properties if resource is created before upload:
  fileSize: number | null;
  fileName: string | null;
  mimeType: string | null;
  
  width: number | null;
  height: number | null;

  // The url prop is temporarily appended on server and not present on data
  // returned from the initial Prisma operation
  url?: string | null;

  updatedAt: Date;
  createdAt: Date;
  isUploaded: boolean;
  isPublic: boolean;

  authorId: string;
  authorName: string;
}
