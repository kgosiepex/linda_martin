/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from '/public/css/Schedule.module.css';

const images = [
	'/img/swipe/AttiresArtboard-1.png',
	'/img/swipe/AttiresArtboard-2.png',
	'/img/swipe/AttiresArtboard-3.png',
	'/img/swipe/AttiresArtboard-4.png',
	'/img/swipe/AttiresArtboard-5.png',
	'/img/swipe/AttiresArtboard-6.png',
	'/img/swipe/AttiresArtboard-7.png',
	'/img/swipe/AttiresArtboard-8.png',
];

const SwipeGallery = () => {
	return (
		<div className={styles.swipeGallery}>
			<Swiper
				modules={[Navigation, Pagination, Autoplay]}
				navigation
				pagination={false}
				autoplay={{ delay: 5000, disableOnInteraction: false }}
				spaceBetween={20}
				slidesPerView={1}
				style={{ maxWidth: 600, margin: '0 auto' }}
			>
				{images.map((src, i) => (
					<SwiperSlide key={i}>
						<img
							src={src}
							alt={`Dresscode example ${i + 1}`}
							className={styles.swipeImg}
							style={{
								maxWidth: '100%',
								width: 'auto',
								height: 'auto',
								maxHeight: '90vh',
								borderRadius: 18,
								margin: '0 auto',
								background: 'transparent',
								boxShadow: 'none',
								display: 'block',
							}}
						/>
					</SwiperSlide>
				))}
			</Swiper>
			<style
				jsx
				global
			>{`
				.swiper-button-next,
				.swiper-button-prev {
					color: #fff !important;
					background: none;
					border-radius: 50%;
					font-size: 1.8rem;
					width: 36px;
					height: 36px;
					box-shadow: none;
				}
				.swiper-button-next:after,
				.swiper-button-prev:after {
					color: #fff !important;
					font-weight: bold;
				}
				.swiper-pagination {
					display: none !important;
				}
			`}</style>
		</div>
	);
};

export default SwipeGallery;
