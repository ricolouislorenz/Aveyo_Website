/**
 * Image Validation and Processing Utility
 * Validates image dimensions, file size, and generates descriptive filenames
 */

export interface ImageValidationOptions {
  maxWidth?: number;
  maxHeight?: number;
  minWidth?: number;
  minHeight?: number;
  maxFileSize?: number; // in MB
  allowedFormats?: string[];
}

export interface ImageValidationResult {
  valid: boolean;
  error?: string;
  width?: number;
  height?: number;
  size?: number;
  suggestedName?: string;
}

/**
 * Default validation options for property images
 */
export const DEFAULT_PROPERTY_IMAGE_OPTIONS: ImageValidationOptions = {
  maxWidth: 2400,
  maxHeight: 1600,
  minWidth: 800,
  minHeight: 600,
  maxFileSize: 5, // 5MB
  allowedFormats: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
};

/**
 * Default validation options for review/profile images
 */
export const DEFAULT_PROFILE_IMAGE_OPTIONS: ImageValidationOptions = {
  maxWidth: 1200,
  maxHeight: 1200,
  minWidth: 400,
  minHeight: 400,
  maxFileSize: 3, // 3MB
  allowedFormats: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
};

/**
 * Validates an image file
 */
export async function validateImage(
  file: File,
  options: ImageValidationOptions = DEFAULT_PROPERTY_IMAGE_OPTIONS
): Promise<ImageValidationResult> {
  // Check file type
  if (options.allowedFormats && !options.allowedFormats.includes(file.type)) {
    return {
      valid: false,
      error: `Ungültiges Bildformat. Erlaubte Formate: ${options.allowedFormats
        .map((f) => f.replace('image/', '').toUpperCase())
        .join(', ')}`,
    };
  }

  // Check file size
  const fileSizeMB = file.size / (1024 * 1024);
  if (options.maxFileSize && fileSizeMB > options.maxFileSize) {
    return {
      valid: false,
      error: `Datei zu groß. Maximale Größe: ${options.maxFileSize}MB. Aktuelle Größe: ${fileSizeMB.toFixed(2)}MB`,
    };
  }

  // Load image to check dimensions
  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const width = img.width;
      const height = img.height;

      // Check minimum dimensions
      if (options.minWidth && width < options.minWidth) {
        resolve({
          valid: false,
          error: `Bildbreite zu klein. Mindestens ${options.minWidth}px erforderlich. Aktuell: ${width}px`,
          width,
          height,
          size: fileSizeMB,
        });
        return;
      }

      if (options.minHeight && height < options.minHeight) {
        resolve({
          valid: false,
          error: `Bildhöhe zu klein. Mindestens ${options.minHeight}px erforderlich. Aktuell: ${height}px`,
          width,
          height,
          size: fileSizeMB,
        });
        return;
      }

      // Check maximum dimensions
      if (options.maxWidth && width > options.maxWidth) {
        resolve({
          valid: false,
          error: `Bildbreite zu groß. Maximal ${options.maxWidth}px erlaubt. Aktuell: ${width}px`,
          width,
          height,
          size: fileSizeMB,
        });
        return;
      }

      if (options.maxHeight && height > options.maxHeight) {
        resolve({
          valid: false,
          error: `Bildhöhe zu groß. Maximal ${options.maxHeight}px erlaubt. Aktuell: ${height}px`,
          width,
          height,
          size: fileSizeMB,
        });
        return;
      }

      resolve({
        valid: true,
        width,
        height,
        size: fileSizeMB,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({
        valid: false,
        error: 'Fehler beim Laden des Bildes. Datei könnte beschädigt sein.',
      });
    };

    img.src = objectUrl;
  });
}

/**
 * Generates a descriptive filename based on property/context information
 */
export function generateDescriptiveFilename(
  type: 'property' | 'profile' | 'review',
  context: {
    title?: string;
    location?: string;
    name?: string;
    timestamp?: Date;
  },
  originalExtension: string
): string {
  const timestamp = context.timestamp || new Date();
  const dateStr = timestamp.toISOString().split('T')[0]; // YYYY-MM-DD
  
  let parts: string[] = [];

  if (type === 'property') {
    parts.push('immobilie');
    if (context.location) {
      parts.push(sanitizeForFilename(context.location));
    }
    if (context.title) {
      parts.push(sanitizeForFilename(context.title));
    }
  } else if (type === 'profile') {
    parts.push('profil');
    if (context.name) {
      parts.push(sanitizeForFilename(context.name));
    }
  } else if (type === 'review') {
    parts.push('bewertung');
    if (context.name) {
      parts.push(sanitizeForFilename(context.name));
    }
  }

  parts.push(dateStr);

  return `${parts.join('-')}.${originalExtension}`;
}

/**
 * Sanitizes text for use in filenames
 */
function sanitizeForFilename(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 30); // Limit length
}

/**
 * Resizes an image if it exceeds maximum dimensions while maintaining aspect ratio
 */
export async function resizeImageIfNeeded(
  file: File,
  maxWidth: number,
  maxHeight: number,
  quality: number = 0.9
): Promise<{ blob: Blob; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { width, height } = img;

      // Check if resize is needed
      if (width <= maxWidth && height <= maxHeight) {
        // No resize needed, return original
        resolve({ blob: file, width, height });
        return;
      }

      // Calculate new dimensions maintaining aspect ratio
      const aspectRatio = width / height;

      if (width > maxWidth) {
        width = maxWidth;
        height = width / aspectRatio;
      }

      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }

      // Create canvas and resize
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context nicht verfügbar'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve({ blob, width, height });
          } else {
            reject(new Error('Fehler beim Erstellen des Bildes'));
          }
        },
        file.type,
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Fehler beim Laden des Bildes'));
    };

    img.src = objectUrl;
  });
}

/**
 * Gets recommended dimensions text for display
 */
export function getRecommendedDimensionsText(
  options: ImageValidationOptions
): string {
  const parts: string[] = [];

  if (options.minWidth && options.minHeight) {
    parts.push(`Mindestens ${options.minWidth}×${options.minHeight}px`);
  }

  if (options.maxWidth && options.maxHeight) {
    parts.push(`Maximal ${options.maxWidth}×${options.maxHeight}px`);
  }

  if (options.maxFileSize) {
    parts.push(`Max. ${options.maxFileSize}MB`);
  }

  return parts.join(' • ');
}
