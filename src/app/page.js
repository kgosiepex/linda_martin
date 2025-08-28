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

			<div className='jnxhwL'>
				<div>
					<div
						className='gSpxyY'
						id='header'
					>
						<div className='cdfTtx'>
							<div className='fRlJSL'>
								<h1 className='tangerine-bold'>
									Linda<span className=''> &amp; </span>
									Martin&apos;s <br /> Wedding
								</h1>
								<h5 className='fFaBpC'>
									We are getting married. Join us <br /> on our special day
								</h5>
								<h3 className='jBOaQF '>18.10.25</h3>
								<div className='kCfAnJ'>
									<a
										className='eLtAgX mt-5'
										href='/rsvp'
									>
										Details
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default WeddingPage;
