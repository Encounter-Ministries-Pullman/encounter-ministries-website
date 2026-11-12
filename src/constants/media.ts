export const MEDIA_COLLECTIONS = ['worship', 'leadership'] as const;
export type MediaCollection = typeof MEDIA_COLLECTIONS[number];

export const MEDIA_COLLECTION_PREFIXES: Record<MediaCollection, string> = {
  worship: 'encounter-ministries-photos/worship/',
  leadership: 'encounter-ministries-photos/leadership/',
};

export const IMAGE_SUFFIXES = ['.jpg', '.jpeg', '.png', '.webp'];