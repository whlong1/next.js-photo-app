export interface Greeting {
  id: number;
  text: string;
  sentiment: string;
  recipient: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface Video {
  year: number;
  genre: string;
  title: string;
  artist: string;
  director: string;
  category: string;

  videoUrl: string;
  thumbnailUrl: string;

  authorId: string;
}