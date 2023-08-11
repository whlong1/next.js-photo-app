export interface Greeting {
  id: number;
  text: string;
  sentiment: string;
  recipient: string;
  updatedAt: Date;
  createdAt: Date;
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