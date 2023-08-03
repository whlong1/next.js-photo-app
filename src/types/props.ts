export interface VideoSearchParams {
  year?: string;
  genre?: string;
  title?: string;
  artist?: string;
  director?: string;
  category?: string;
  videoUrl?: string;
  authorId?: string;
  thumbnailUrl?: string;
}

// Alternate Approach with Index Signature:
export interface SearchParams {
  [key: string]: string | string[] | undefined
}

// Note on Index Signatures"
// "Sometimes you don’t know all the names of a type’s properties ahead of time, 
// but you do know the shape of the values.""

// SearchParams is an object that can have any number of string props.
// The values of those props can be a string, an array of strings, or undefined.

// https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures