import React, { useState } from 'react';
import styled from 'styled-components';

import ReviewContent from './ReviewContent';

const ReviewButtonWrapper = styled.div`
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  padding: 40px 0;
  font-weight: 700;
`;

const ReviewContentWrapper = styled.div`
  height: 0;
  overflow: hidden;
`;

// const GET_REVIEW = gql``;

// const CREATE_REVIEW = gql``;

// const UPDATE_REVIEW = gql``;

// const DELETE_REVIEW = gql``;

// const GET_COMMENTS = gql``;

// const GET_COMMENT = gql``;

// const CREATE_COMMNET = gql``;

// const UPDATE_COMMENT = gql``;

// const DELETE_COMMENT = gql``;



const ReviewBox = ({ reviewCount }:{reviewCount: number}) => {
  const [clickdReviews, setClickedReviews] = useState(false);

  const onClcikReviewsBtn = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    const reviewsBtnEl = document.getElementById('review-btn');
    const dropdownBtnEl = document.querySelector('.dropdown-btn');
    const reviewContentEl = document.getElementById('review-content');
    if (clickdReviews) {
      reviewsBtnEl.classList.remove('open');
      dropdownBtnEl.removeAttribute('style');
      reviewContentEl.setAttribute('style', 'height: 0;');
      setClickedReviews(false);
    } else {
      reviewsBtnEl.classList.add('open');
      dropdownBtnEl.setAttribute('style', 'transform: rotate( 180deg ); transition: all ease 0.5s;');
      reviewContentEl.setAttribute('style', 'height: auto;');
      setClickedReviews(true);
    }
  };

  console.log(clickdReviews);
  return (
    <>
      <ReviewButtonWrapper id="review-btn" onClick={onClcikReviewsBtn}>
        <div className="text">리뷰 {reviewCount}</div>
        <div className="dropdown-btn">▽</div>
      </ReviewButtonWrapper>
      <ReviewContentWrapper id="review-content">{clickdReviews ? <ReviewContent /> : null}</ReviewContentWrapper>
    </>
  );
};

export default ReviewBox;
