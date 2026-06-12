'use client';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export default function ResponsiveImage({ 
  src, 
  alt, 
  priority = false, 
  className = '' 
}: ResponsiveImageProps) {
  const basePath = src.replace(/\.(jpg|png|jpeg)$/, '');
  
  return (
    <picture>
      <source
        media="(max-width: 640px)"
        srcSet={`${basePath}-mobile.webp`}
        type="image/webp"
      />
      <source
        media="(max-width: 1024px)"
        srcSet={`${basePath}-tablet.webp`}
        type="image/webp"
      />
      <source
        srcSet={`${basePath}-desktop.webp`}
        type="image/webp"
      />
      <img
        src={`${basePath}-desktop.webp`}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </picture>
  );
}
