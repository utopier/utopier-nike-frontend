import React from 'react';
// import styled from 'styled-components';
// import Slider from "react-slick";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';

interface IRecommendSwiperProps {
  imageUrls: IImgUrl[];
}

interface IImgUrl {
  url: string;
}

const RecommendSwiper: React.FC<IRecommendSwiperProps> = ({ imageUrls }) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          height: '70px',
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center',
          fontSize: '1.5rem',
          fontFamily: '600',
        }}
      >
        <span>추천상품</span>
      </div>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        ...
      </Swiper>
    </>
  );
};

export default RecommendSwiper;
