import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata = {
	title: 'Linda & Martin Wedding',
	description: 'Wedding Details and RSVP for Linda and Martin',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<head>
				<link
					rel='icon'
					href='/favicon.ico'
				/>
			</head>

			<body>
				<Toaster
					toastOptions={{
						success: {
							style: {
								background: 'green',
								color: 'white',
							},
						},
						error: {
							style: {
								background: 'red',
								color: 'white',
							},
						},
						loading: {
							style: {
								background: 'white',
								color: 'black',
							},
						},
					}}
				/>
				{children}
			</body>
		</html>
	);
}
