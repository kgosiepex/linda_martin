// import 'dotenv/config';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { google } from 'googleapis';
import readline from 'readline';

const oAuth2Client = new google.auth.OAuth2(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	process.env.GOOGLE_REDIRECT_URI
);

console.log(process.env.GOOGLE_REDIRECT_URI);

const authUrl = oAuth2Client.generateAuthUrl({
	access_type: 'offline',
	scope: ['https://www.googleapis.com/auth/drive.file'],
});

console.log('Authorize this app by visiting:', authUrl);

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('Enter the code from that page here: ', async (code) => {
	const { tokens } = await oAuth2Client.getToken(code);
	console.log('Save this refresh token:', tokens.refresh_token);
	rl.close();
});
