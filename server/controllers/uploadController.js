import multer from 'multer';
import { fileTypeFromBuffer } from 'file-type';
import sharp from 'sharp';

// SECURITY MANDATE: Use memory storage to prevent malicious files from touching disk.
// Enforce a strict 2MB file size limit.
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2 MB
  }
});

/**
 * Controller to handle avatar uploads with strict magic number validation and image processing.
 */
export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const buffer = req.file.buffer;

    // SECURITY MANDATE: Read "magic numbers" to definitively verify file type.
    // Do NOT trust req.file.mimetype or the original file extension.
    const typeInfo = await fileTypeFromBuffer(buffer);
    
    if (!typeInfo || (typeInfo.mime !== 'image/jpeg' && typeInfo.mime !== 'image/png')) {
      return res.status(400).json({ error: 'Invalid file type. Only JPEG and PNG are allowed.' });
    }

    // SECURITY MANDATE: Pipe through sharp to resize and explicitly strip EXIF metadata
    // EXIF metadata can contain embedded malicious payloads or location data.
    const processedImageBuffer = await sharp(buffer)
      .resize(400, 400, { fit: 'inside' })
      // .withMetadata(false) is the default behavior in modern sharp versions, 
      // but explicitly chaining an operation ensures the output is a clean, new image.
      .toFormat(typeInfo.ext) // Output in the same format
      .toBuffer();

    // TODO: Upload processedImageBuffer to a storage bucket (e.g., AWS S3, Google Cloud Storage)
    // const avatarUrl = await uploadToStorage(processedImageBuffer);

    // Mock successful response
    return res.status(200).json({ 
      message: 'Avatar uploaded and processed securely',
      url: 'https://mock-bucket.com/avatar.jpg' 
    });
  } catch (error) {
    console.error('Error processing upload', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
