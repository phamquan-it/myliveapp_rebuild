import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import { fileTypeFromBuffer  } from 'file-type';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = '~/a.png'; // Local file path

  try {
    // Read the file as a buffer
    const fileBuffer = await fs.readFile(filePath);

    // Detect the content type based on the buffer content
    const detectedType = await fileTypeFromBuffer(fileBuffer);

    if (!detectedType) {
      return res.status(400).json({ message: 'Could not determine content type' });
    }

    res.status(200).json({ contentType: detectedType.mime });
  } catch (error) {
    res.status(404).json({ message: 'File not found' });
  }
}

