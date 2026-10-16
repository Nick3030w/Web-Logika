import Image, { ImageProps } from 'next/image';

/**
 * Wrapper for below-the-fold images. `alt` stays required through `ImageProps`,
 * so callers must always provide meaningful text (or an empty string for
 * decorative images).
 */
export default function LazyImage({ alt, ...props }: ImageProps) {
  // eslint-disable-next-line jsx-a11y/alt-text -- `alt` is forwarded from props and enforced by ImageProps.
  return <Image {...props} alt={alt} loading="lazy" />;
}
