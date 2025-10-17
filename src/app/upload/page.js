'use client';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function WeddingUpload() {
	const [files, setFiles] = useState([]);
	const [status, setStatus] = useState('initial'); // initial, uploading, success, error

	// Handle new files selection
	const handleFileChange = (e) => {
		const selected = Array.from(e.target.files || []);
		setFiles((prev) => {
			const combined = [...prev];
			selected.forEach((file) => {
				if (!combined.some((f) => f.name === file.name && f.size === file.size)) {
					combined.push(file);
				}
			});
			return combined;
		});
		setStatus('initial');
	};

	// Remove a specific file by index
	const removeFile = (index) => {
		setFiles((prev) => prev.filter((_, i) => i !== index));
	};

	// Upload files to API
	const handleUpload = async (e) => {
		e.preventDefault();
		if (!files.length) return;

		setStatus('uploading');
		toast.loading('Uploading files...');
		const formData = new FormData();
		files.forEach((file) => formData.append('media', file));

		try {
			const res = await fetch('/api/upload', {
				method: 'POST',
				body: formData,
			});

			if (res.ok) {
				setStatus('success');
				toast.dismiss();
				toast.success('Files uploaded successfully!');
				setFiles([]);
			} else {
				setStatus('error');
				const data = await res.json();
				toast.dismiss();
				toast.error(`Upload failed: ${data.message || 'Unknown error'}`);
				console.error('Upload error:', data.message);
			}
		} catch (err) {
			setStatus('error');
			toast.dismiss();
			toast.error('Upload failed. Please try again.');
			console.error('Upload failed:', err);
		}
	};

	return (
		<div
			className='d-flex flex-column align-items-center justify-content-center text-center'
			style={{ minHeight: '100vh', maxWidth: 800, margin: '0 auto', padding: '2em 1em' }}
		>
			<h6
				style={{
					fontFamily: 'Open Sans, Helvetica, Arial, sans-serif',
					fontWeight: 300,
					fontSize: '1.1em',
					marginBottom: '3em',
					marginTop: '1em',
					textTransform: 'uppercase',
					letterSpacing: '0.25em',
				}}
			>
				Linda &amp; Martin&apos;s Wedding
			</h6>

			<h2>
				Upload Your <br /> Favorite Wedding Moments
			</h2>

			<form
				onSubmit={handleUpload}
				className='d-flex flex-column align-items-center justify-content-center'
				style={{ gap: '1.5em', width: '100%' }}
			>
				{/* File select label */}
				<label
					htmlFor='fileUpload'
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: '3em',
						width: '100%',
						maxWidth: '300px',
						border: '1px solid #ccc',
						borderRadius: '8px',
						cursor: 'pointer',
						fontFamily: 'Open Sans, Helvetica, Arial, sans-serif',
						fontSize: '0.95em',
						fontWeight: 400,
						color: 'white',
						// backgroundColor: '#f9f9f9',
						transition: 'all 0.2s ease',
					}}
					// onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
					// onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f9f9f9')}
				>
					Select Files
				</label>
				<input
					id='fileUpload'
					type='file'
					multiple
					accept='image/*,video/*'
					onChange={handleFileChange}
					style={{ display: 'none' }}
				/>

				{/* Selected files list */}
				{files.length > 0 && (
					<div
						className='d-flex flex-column gap-2 mt-2'
						style={{ width: '100%', maxWidth: '300px' }}
					>
						{files.map((file, idx) => (
							<div
								key={idx}
								className='d-flex justify-content-between align-items-center'
								style={{
									padding: '0.5em 0.75em',
									border: '1px solid #ccc',
									borderRadius: '6px',
									// backgroundColor: '#f9f9f9',
								}}
							>
								<span
									style={{
										fontSize: '0.9em',
										color: '#333',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
										maxWidth: '220px',
									}}
								>
									{file.name}
								</span>
								<button
									type='button'
									onClick={() => removeFile(idx)}
									style={{
										backgroundColor: '#e74c3c',
										color: 'white',
										borderRadius: '50%',
										width: '18px',
										height: '18px',
										fontSize: '12px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										border: 'none',
										cursor: 'pointer',
									}}
								>
									&times;
								</button>
							</div>
						))}
					</div>
				)}

				{/* Upload button */}
				<button
					type='submit'
					disabled={!files.length || status === 'uploading'}
					className={`admin-button w-100 h-11 rounded-lg text-white font-medium transition ${
						!files.length || status === 'uploading'
							? 'bg-blue-300 cursor-not-allowed'
							: 'bg-blue-600 hover:bg-blue-700'
					}`}
					style={{ maxWidth: '300px', height: '3em' }}
				>
					{status === 'uploading' ? 'Uploading...' : 'Upload Files'}
				</button>

				{/* Status messages */}
				{/* {status === 'success' && <p className='text-success mt-2'>Files uploaded successfully!</p>} */}
				{/* {status === 'error' && <p className='text-danger mt-2'>Upload failed. Please try again.</p>} */}
			</form>
		</div>
	);
}
