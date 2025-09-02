import sharp from 'sharp';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function processAndSaveImage(
  imageBuffer: Buffer,
  filename: string
): Promise<{ processedBuffer: Buffer; filePath: string; imageUrl: string }> {
  try {
    // Process image with sharp
    const processedBuffer = await sharp(imageBuffer)
      .resize(800, 600, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toBuffer();

    // Generate unique filename
    const uniqueId = uuidv4();
    const extension = 'jpg';
    const processedFilename = `${uniqueId}.${extension}`;

    // Ensure upload directory exists
    const uploadDir = process.env.UPLOAD_DIR || './public/uploads';
    await mkdir(uploadDir, { recursive: true });

    // Save file
    const filePath = join(uploadDir, processedFilename);
    await writeFile(filePath, processedBuffer);

    // Generate URL
    const imageUrl = `/uploads/${processedFilename}`;

    return {
      processedBuffer,
      filePath,
      imageUrl
    };
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error('Failed to process image');
  }
}

export function bufferToBase64(buffer: Buffer): string {
  return buffer.toString('base64');
}

export function validateImageFile(file: Express.Multer.File): boolean {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = parseInt(process.env.MAX_FILE_SIZE || '10485760'); // 10MB default

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return false;
  }

  if (file.size > maxSize) {
    return false;
  }

  return true;
}

export function generateThumbnail(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer)
    .resize(200, 150, { fit: 'cover' })
    .jpeg({ quality: 70 })
    .toBuffer();
}
