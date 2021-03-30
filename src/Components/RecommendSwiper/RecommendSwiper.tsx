import React, { useEffect, useState } from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
// import 'swiper/components/scrollbar/scrollbar.scss';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

import styled from 'styled-components';

const SwiperWrapper = styled(Swiper)`
  width: 100%;
  padding: 0 20px;
  div[class^='swiper-slide'] {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

interface IRecommendSwiperProps {
  imageUrls:IImgUrl[];
}

interface IImgUrl {
  url: string;
}

const RecommendSwiper : React.FC<IRecommendSwiperProps> =  ({ imageUrls }) => {
  const [slidesPerView, setSlidesPerView] = useState(4);

  useEffect(() => {
    setSlidesPerViewFunc();
    window.addEventListener('resize', function () {
      setSlidesPerViewFunc();
    });
  }, []);

  const setSlidesPerViewFunc = () => {
    const width = document.body.clientWidth;
    if (width >= 900) {
      setSlidesPerView(4);
    } else if (760 < width && width <= 900) {
      setSlidesPerView(3);
    } else if (560 < width && width <= 760) {
      setSlidesPerView(2);
    } else if (width <= 560) {
      setSlidesPerView(1);
    }
    console.log(width);
    console.log(760 < width && width <= 960);
    console.log(slidesPerView);
  };

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
      <SwiperWrapper
        // spaceBetween={1}
        slidesPerView={slidesPerView}
        // navigation
        scrollbar={{ draggable: true }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide>
          <img src={imageUrls[0].url} width="250" height="250" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={imageUrls[0].url} width="250" height="250" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={imageUrls[0].url} width="250" height="250" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={imageUrls[0].url} width="250" height="250" />
        </SwiperSlide>
      </SwiperWrapper>
    </>
  );
};

export default RecommendSwiper;