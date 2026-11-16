import { useEffect, useState } from 'react';
import type { CloudImageAsset } from '../components/CloudImage';
import { type MediaCollection } from '../constants/media';
import { fetchMediaCollection } from '../mediaApi';

type MediaCollectionStatus = 'loading' | 'ready' | 'error';

export function useMediaCollection(collection: MediaCollection): {
  images: CloudImageAsset[];
  status: MediaCollectionStatus;
} {
  const [images, setImages] = useState<CloudImageAsset[]>([]);
  const [status, setStatus] = useState<MediaCollectionStatus>('loading');

  useEffect(() => {
    const controller = new AbortController();
    setImages([]);
    setStatus('loading');

    fetchMediaCollection(collection, controller.signal)
      .then((items) => {
        setImages(items);
        setStatus('ready');
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus('error');
      });

    return () => controller.abort();
  }, [collection]);

  return { images, status };
}