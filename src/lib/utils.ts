import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Optimizes GitHub raw image URLs by adding cache busting and ensuring
 * proper headers for better caching behavior
 * @param imageUrl - The GitHub raw image URL
 * @returns Optimized image URL with cache headers
 */
export function optimizeGitHubImageUrl(imageUrl: string): string {
  if (!imageUrl || !imageUrl.includes('githubusercontent.com')) {
    return imageUrl;
  }

  // Add ?raw=true parameter to ensure raw image serving
  // GitHub serves with proper caching headers for raw images
  const separator = imageUrl.includes('?') ? '&' : '?';
  return `${imageUrl}${separator}raw=true`;
}
