import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery, gql, useMutation } from '@apollo/client';

import { GET_REVIEWS, IGetReviewsResult } from './ReviewContent';
import { GET_PRODUCT } from '../../Routes/Product';
import Modal from '../Shared/Modal';
import ReviewDetail from './ReviewDetail';
import UpdateReviewForm from './UpdateReviewForm';
import Loader from '../Shared/Loader';
// import Error from '../Shared/Error';

const ReviewCardWrapper = styled.div`
  border: 1px solid rgb(229, 229, 229);
  border-radius: 5px;
  margin: 5px;
  padding: 10px;
  div {
    padding-top: 10px;
  }
  .review-title {
    display: flex;
    justify-content: center;
    font-size: 1rem;
    font-weight: 700;
  }
  .review-user {
    display: flex;
    justify-content: flex-end;
    color: #828282;
  }
  .review-body {
    padding-left: 10px;
    margin-bottom: 10px;
    font-size: 1rem;
  }
  .review-comments {
    color: #828282;
  }
  .review-detail {
    .review-datail-btn {
      background-color: white;
      border: 0;
      cursor: pointer;
      text-decoration: underline;
      font-size: 0.8rem;
      font-weight: 500;
    }
  }
`;

const ME = gql`
  query me {
    me {
      id
      username
    }
  }
`;

const DELETE_REVIEW = gql`
  mutation deleteReview($reviewId: String, $username: String) {
    deleteReview(reviewId: $reviewId, username: $username)
  }
`;

interface IReviewCardProps {
  review: {
    id: string;
    title: string;
    createdAt: string;
    body: string;
    commentCount: number;
    user: IReviewCardPropsUser;
  };
  productId: string;
}

interface IReviewCardPropsUser {
  id: string;
  username: string;
}

const ReviewCard: React.FC<IReviewCardProps> = ({ review, productId }) => {
  const { id, title, user, createdAt, body, commentCount } = review;
  const [openedReviewDetail, setOpenedReviewDetail] = useState(false);
  const [openedUpdateReview, setOpenedUpdateReview] = useState(false);
  const { data, loading, error } = useQuery(ME);
  const [deleteReviewMutation] = useMutation(DELETE_REVIEW, {
    update(cache, { data: { deleteReview } }) {
      if (deleteReview) {
        const { getReviews }: IGetReviewsResult = cache.readQuery({ query: GET_REVIEWS, variables: { productId } });
        cache.writeQuery({
          query: GET_REVIEWS,
          variables: { productId },
          data: {
            getReviews: getReviews.filter((item) => {
              return item.id !== id;
            }),
          },
        });
        const { getProduct } = cache.readQuery({ query: GET_PRODUCT, variables: { id: productId } });
        cache.writeQuery({
          query: GET_PRODUCT,
          variables: { id: productId },
          data: {
            getProduct: { ...getProduct, reviewCount: getProduct.reviewCount - 1 },
          },
        });
      }
    },
  });

  if (loading) return <Loader />;
  if (error) {
    console.log('me error : ', error);
  }

  const openReviewDetail = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setOpenedReviewDetail(true);
  };

  const closeReviewDetail = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setOpenedReviewDetail(false);
  };

  const onClickUpdateReviewBtn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setOpenedUpdateReview(true);
  };

  const closeUpdateReview = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setOpenedUpdateReview(false);
  };

  const onClickDeleteReviewBtn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const result = window.confirm('삭제하시겠습니까');
    if (result) {
      deleteReviewMutation({
        variables: {
          reviewId: review.id,
          username: data.me.username,
        },
      });
    }
  };

  return (
    <ReviewCardWrapper>
      <div className="review-title">
        <span>{title}</span>
        {data && data.me && user.id === data.me.id ? (
          <div>
            <button onClick={onClickUpdateReviewBtn}>수정</button>
            <button onClick={onClickDeleteReviewBtn}>삭제</button>
            {openedUpdateReview && (
              <Modal visible={openedUpdateReview} closable={true} maskClosable={true} onClose={closeUpdateReview}>
                <UpdateReviewForm
                  reviewId={id}
                  username={data.me.username}
                  initTitle={title}
                  initBody={body}
                  productId={productId}
                />
              </Modal>
            )}
          </div>
        ) : null}
      </div>
      <div className="review-user">
        <span>{user.username} - </span>
        <span>{createdAt}</span>
      </div>
      <div className="review-body">
        <p>{body}</p>
      </div>
      <div className="review-comments">
        <span>{commentCount} Comments</span>
      </div>
      <div className="review-detail">
        <button className="review-datail-btn" onClick={openReviewDetail}>
          자세히 보기
        </button>
        {openedReviewDetail && (
          <Modal visible={openedReviewDetail} closable={true} maskClosable={true} onClose={closeReviewDetail}>
            <ReviewDetail
              id={id}
              title={title}
              username={user.username}
              createdAt={createdAt}
              body={body}
              commentCount={commentCount}
              productId={productId}
            />
          </Modal>
        )}
      </div>
    </ReviewCardWrapper>
  );
};

export default ReviewCard;
