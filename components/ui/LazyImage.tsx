import Image, { ImageProps } from 'next/image';

/**
 * LazyImage component - a wrapper around next/image that enforces lazy loading.
 * Note: Parent components must provide alt text via props (required by next/image)
 */
export default function LazyImage({ loading, ...props }: ImageProps & { loading?: 'lazy' | 'eager' }) {
  return <Image {...props} loading="lazy" />;
}
