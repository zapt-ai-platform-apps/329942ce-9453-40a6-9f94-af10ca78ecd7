import * as Sentry from "@sentry/node";
import cloudinary from 'cloudinary';
import formidable from 'formidable';

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.PROJECT_ID
    }
  }
});

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const config = {
  api: {
    bodyParser: false // We need to disable the default body parser
  }
};

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    // Handle file upload and store the image
    const imageUrl = await handleFileUpload(req);
    res.status(200).json({ imageUrl });
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Error uploading image' });
  }
}

async function handleFileUpload(req) {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        reject(err);
      }

      const file = files.file;
      if (!file) {
        reject(new Error('No file uploaded'));
      }

      // Upload to Cloudinary
      cloudinary.v2.uploader.upload(file.filepath, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      });
    });
  });
}