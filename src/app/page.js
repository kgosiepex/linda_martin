/* eslint-disable @next/next/no-img-element */
// app/page.js

import Head from 'next/head';
import { toast } from 'react-hot-toast';

const WeddingPage = () => {
	return (
		<>
			<Head>
				<title>Linda & Martin</title>
				<meta
					name='description'
					content='Wedding Details and RSVP for Linda and Martin'
				/>
				<meta
					property='og:title'
					content='Linda and Martin'
				/>
				<meta
					property='og:description'
					content='Wedding Details and RSVP'
				/>
			</Head>

			<div className='container-fluid min-vh-100 d-flex align-items-center justify-content-center p-0'>
				<div className='row w-100 h-100 m-0'>
					{/* Image Section */}
					<div
						className='col-12 col-lg-6 d-flex align-items-stretch p-0'
						style={{ height: '100vh' }}
					>
						<div
							className='w-100 h-100 d-flex flex-grow-1'
							style={{ height: '100%' }}
						>
							<img
								src='/img/bg_1.png'
								alt='Linda & Martin Wedding'
								style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
							/>
						</div>
					</div>
					{/* Text Section */}
					<div
						className='col-12 col-lg-6 d-flex flex-column align-items-center justify-content-center text-center p-0'
						style={{ minHeight: '100%' }}
					>
						<h1 className='tangerine-bold mb-3'>
							Linda<span> &amp; </span>Martin&apos;s <br /> Wedding
						</h1>
						<h5 className='fFaBpC mb-3'>
							We are getting married. Join us <br /> on our special day
						</h5>
						<h2 className='mb-4'>18.10.25</h2>
						<a
							className='admin-button mt-3 d-flex align-items-center justify-content-center'
							href='/rsvp'
							style={{
								height: '48px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								textDecoration: 'none',
							}}
						>
							Details
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default WeddingPage;
