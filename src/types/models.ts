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

  year: number | null;
  title: string | null;
  category: string | null;
  location: string | null;
  description: string | null;
  urlPath: string | null;

  updatedAt: Date;
  createdAt: Date;
  isUploaded: boolean;

  authorId: string;
  authorName: string;

  fileSize: number;
  fileName: string;
  mimeType: string;
}

// Make new interface for form data
export interface Video {
  id: string;

  year?: number | null;
  genre?: string | null;
  title?: string | null;
  artist?: string | null;
  director?: string | null;
  category?: string | null;

  videoUrl: string | null;
  thumbnailUrl: string | null;

  // Optional form data values:
  authorId?: string;
  updatedAt?: Date;
  createdAt?: Date;
}