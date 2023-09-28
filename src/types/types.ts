export type SizeType = "fullsize" | "thumbnail" | "medium"

export interface ORCondition {
  OR: {
    [x: string]: {
      contains: string;
      mode: string;
    };
  }[];
}

export interface PrismaQueryObject {
  isPublic: boolean;
  category?: string;
  location?: string;
  authorName?: string;
  description?: string;
  dominantColor?: string;
  OR?: ORCondition["OR"];
}