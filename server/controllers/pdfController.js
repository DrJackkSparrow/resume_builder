import { sanitizeResumeData } from '../utils/sanitizer.js';

/**
 * Controller to handle PDF generation requests
 */
export const generatePdf = async (req, res) => {
  try {
    const rawResumeData = req.body.resumeData;

    if (!rawResumeData) {
      return res.status(400).json({ error: 'resumeData is required' });
    }

    // SECURITY MANDATE: Sanitize all inputs before any processing to prevent XSS.
    // This recursively strips dangerous HTML tags from all string values in the JSON.
    const cleanResumeData = sanitizeResumeData(rawResumeData);

    // TODO: Pass cleanResumeData to the actual PDF rendering engine (e.g., Puppeteer)
    // const pdfBuffer = await renderPdf(cleanResumeData);

    // Mock successful response
    return res.status(200).json({ 
      message: 'PDF generated successfully (mock)',
      // We return the sanitized data just to demonstrate the cleaning worked
      sanitizedData: cleanResumeData 
    });
  } catch (error) {
    console.error('Error generating PDF');
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
