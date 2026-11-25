import React from 'react';

const IMAGE_WIDTHS = [400, 800, 1200, 1600, 2400] as const;
const MEDIA_ORIGIN = process.env.NEXT_PUBLIC_MEDIA_ORIGIN?.replace(/\/+$/, '');

export interface CloudImageAsset {
  objectKey: string;
  width?: number;
  height?: number;
}

interface CloudImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'srcSet' | 'sizes' | 'alt' | 'width' | 'height' | 'loading' | 'decoding' | 'fetchPriority'> {
  image: CloudImageAsset;
  alt: string;
  sizes?: string;
  isLcp?: boolean;
}

function getCdnUrl(objectKey: string, width: number): string {
  if (!MEDIA_ORIGIN) {
    throw new Error('NEXT_PUBLIC_MEDIA_ORIGIN must be configured.');
  }

  const segments = objectKey.split('/');
  if (segments.some((segment) => !segment || segment === '.' || segment === '..')) {
    throw new Error(`Invalid CDN object key: ${objectKey}`);
  }

  const encodedKey = segments.map(encodeURIComponent).join('/');
  return `${MEDIA_ORIGIN}/cdn-cgi/image/width=${width},quality=80,format=auto/${encodedKey}`;
}

export function CloudImage({
  image,
  alt,
  sizes = '100vw',
  isLcp = false,
  className = '',
  style,
  ...imgProps
}: CloudImageProps): React.JSX.Element {
  const hasDimensions = image.width !== undefined && image.height !== undefined;
  const srcSet = IMAGE_WIDTHS
    .map((width) => `${getCdnUrl(image.objectKey, width)} ${width}w`)
    .join(', ');

  return (
    <img
      {...imgProps}
      src={getCdnUrl(image.objectKey, 1200)}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={image.width}
      height={image.height}
      loading={isLcp ? 'eager' : 'lazy'}
      decoding="async"
      {...(isLcp ? { fetchPriority: 'high' as const } : {})}
      style={{
        width: '100%',
        height: hasDimensions ? 'auto' : '100%',
        aspectRatio: hasDimensions ? `${image.width} / ${image.height}` : undefined,
        objectFit: 'cover',
        ...style,
      }}
      className={className}
    />
  );
}