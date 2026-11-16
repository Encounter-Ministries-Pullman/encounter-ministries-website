import type { CloudImageAsset } from './components/CloudImage';
import { IMAGE_SUFFIXES, MEDIA_COLLECTION_PREFIXES, type MediaCollection } from './constants/media';

export type { MediaCollection } from './constants/media';

function getApiOrigin(): string {
  const configuredOrigin = import.meta.env.VITE_MEDIA_API_ORIGIN?.trim();
  const origin = configuredOrigin || (import.meta.env.DEV ? 'http://localhost:8000' : '');

  if (!origin) {
    throw new Error('VITE_MEDIA_API_ORIGIN must be set for production builds.');
  }

  return origin.replace(/\/+$/, '');
}

function isCollectionResponse(value: unknown, collection: MediaCollection): value is {
  collection: MediaCollection;
  items: unknown[];
} {
  return typeof value === 'object'
    && value !== null
    && 'collection' in value
    && 'items' in value
    && value.collection === collection
    && Array.isArray(value.items);
}

export async function fetchMediaCollection(
  collection: MediaCollection,
  signal?: AbortSignal,
): Promise<CloudImageAsset[]> {
  const response = await fetch(`${getApiOrigin()}/api/media/${collection}`, {
    headers: { Accept: 'application/json' },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Media catalog request failed with status ${response.status}.`);
  }

  const payload: unknown = await response.json();
  if (!isCollectionResponse(payload, collection)) {
    throw new Error('Media catalog returned an invalid response.');
  }

  const prefix = MEDIA_COLLECTION_PREFIXES[collection];
  return payload.items
    .filter((item): item is string => {
      if (typeof item !== 'string' || !item.startsWith(prefix)) return false;
      return IMAGE_SUFFIXES.some((suffix) => item.toLowerCase().endsWith(suffix));
    })
    .map((objectKey) => ({ objectKey }));
}