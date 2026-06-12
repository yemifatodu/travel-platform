import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'HUUBOI - Global Travel Platform',
    short_name: 'HUUBOI',
    description: 'One platform for global travel. Flights, hotels, tours, eSIMs, visa guidance.',
    start_url: '/',
    display: 'standalone',
    background_color: '#080807',
    theme_color: '#C8A96E',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
