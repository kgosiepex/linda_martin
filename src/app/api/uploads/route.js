import { google } from 'googleapis';
import formidable from 'formidable-serverless';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Disable default body parsing
export const config = {
	api: {
		bodyParser: false,
	},
};

export async function POST(req) {
	try {
		const form = new formidable.IncomingForm({ multiples: true, keepExtensions: true });

		// Parse form from the raw request using a Promise
		const { files } = await new Promise((resolve, reject) => {
			form.parse(req, (err, fields, files) => {
				if (err) return reject(err);
				resolve({ fields, files });
			});
		});

		const uploadedFiles = Array.isArray(files.media) ? files.media : [files.media];

		if (!uploadedFiles || uploadedFiles.length === 0) {
			return new Response(JSON.stringify({ message: 'No files were uploaded.' }), { status: 400 });
		}

		// Authenticate Google Drive
		const auth = new google.auth.GoogleAuth({
			keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
			scopes: ['https://www.googleapis.com/auth/drive.file'],
		});
		const drive = google.drive({ version: 'v3', auth });
		const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

		// Upload each file to Google Drive
		for (const file of uploadedFiles) {
			const fileMetadata = { name: file.name, parents: [folderId] };
			const media = { mimeType: file.type, body: fs.createReadStream(file.path) };
			await drive.files.create({ resource: fileMetadata, media, fields: 'id' });
		}

		return new Response(JSON.stringify({ message: 'Files uploaded successfully!' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('Error uploading to Google Drive:', error);
		return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}
