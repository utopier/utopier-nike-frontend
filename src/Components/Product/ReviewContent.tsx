import React, { useState } from 'react';
import { gql, useQuery} from '@apollo/client';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ReviewCard from './ReviewCard';

import Loader from '../Shared/Loader';
import Error from '../Shared/Error';

import Modal from '../Shared/Modal';
import CreateReviewForm from './CreateReviewForm';

const CreateReviewBtnWrapper = styled.div`
  padding: 20px 0;
  button {
    background-color: white;
    border: 0;
    cursor: pointer;
    text-decoration: underline;
    font-size: 0.9rem;
    font-weight: 600;
  }
`;

const ReviewListWrapper = styled.div``;

export const GET_REVIEWS = gql`
  query getReviews($productId: String) {
    getReviews(productId: $productId) {
      id
      createdAt
      title
      body
      user {
        id
        username
      }
      commentCount
    }
  }
`;

export interface IGetReviewsResult {
  getReviews: IGetReviewContent[]
}

export interface IGetReviewContent {
  id : string;
  createdAt : string;
  title : string;
  body : string;
  user : IGetReviewContentUser
  commentCount : number;
}

interface IGetReviewContentUser {
  id: string;
  username: string;
}

interface  IGetReviewVar {
  productId: string;
}



const ReviewContent : React.FC = React.memo(() => {
  const [openCreatedReview, setOpenCreatedReview] = useState(false);
  const { productId } = useParams<{productId: string}>();
  const { data, loading, error, refetch: reviewRefetch } = useQuery<IGetReviewsResult, IGetReviewVar>(GET_REVIEWS, {
    variables: {
      productId,
    },
    fetchPolicy:'cache-and-network',
  });
  
  console.log('review loading : ', loading);
  if (loading) return <Loader/>;
  let errorStatus;
    if(error){
      errorStatus = error;
      console.log('review error :',errorStatus);
      if(localStorage.getItem('token') && errorStatus) {
        reviewRefetch();
        console.log('review refetch...');
      } else {
        return <Error error={error}/>;
      }
    }

  const openCreateReviewModal = () => {
    setOpenCreatedReview(true);
  };

  const closeCreateReviewModal = () => {
    setOpenCreatedReview(false);
  };

  console.log(data && data.getReviews)

  return (
    <>
      <CreateReviewBtnWrapper>
        <button className="review-create-btn" onClick={openCreateReviewModal}>
          리뷰 작성하기
        </button>
        {openCreatedReview && (
          <Modal visible={openCreatedReview} closable={true} maskClosable={true} onClose={closeCreateReviewModal}>
            <CreateReviewForm productId={productId} />
          </Modal>
        )}
      </CreateReviewBtnWrapper>
      <ReviewListWrapper>
        {data && data.getReviews.map((review) => {
          return (
            <>
              <ReviewCard key={review.id} review={review} productId={productId} />
            </>
          );
        })}
      </ReviewListWrapper>
    </>
  );
});

export default ReviewContent;
