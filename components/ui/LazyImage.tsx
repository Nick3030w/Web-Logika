import Image, { ImageProps } from 'next/image';

/**
 * Wrapper for below-the-fold images. Alt remains required by ImageProps and is
 * passed explicitly so accessibility tooling can verify it.
 */
export default function LazyImage({
  alt,
  ...props
}: ImageProps) {
  return <Image {...props} alt={alt} loading="lazy" />;
}
