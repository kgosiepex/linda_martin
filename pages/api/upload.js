import formidable from 'formidable-serverless';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

export const config = { api: { bodyParser: false } };

// Configure Cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
	if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

	try {
		const form = new formidable.IncomingForm({ multiples: true, keepExtensions: true });

		const { files } = await new Promise((resolve, reject) => {
			form.parse(req, (err, fields, files) => {
				if (err) reject(err);
				else resolve({ files });
			});
		});

		const uploadedFiles = Array.isArray(files.media) ? files.media : [files.media];
		if (!uploadedFiles || uploadedFiles.length === 0) {
			return res.status(400).json({ message: 'No files uploaded.' });
		}

		const results = [];

		for (const file of uploadedFiles) {
			const result = await cloudinary.uploader.upload(file.path, {
				resource_type: 'auto', // supports images & videos
				folder: 'wedding_uploads', // optional folder in your Cloudinary account
			});
			results.push({ url: result.secure_url, public_id: result.public_id });
			fs.unlinkSync(file.path); // remove temp file
		}

		return res.status(200).json({ message: 'Files uploaded successfully!', files: results });
	} catch (err) {
		console.error('Error uploading to Cloudinary:', err);
		return res.status(500).json({ message: 'Cloudinary upload failed', error: err.message });
	}
}
