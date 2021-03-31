import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

import { useInput } from '../../Hooks/useInput';
import styled from 'styled-components';
import CommentCard from './CommentCard';

import {GET_REVIEWS} from './ReviewContent'

import Loader from '../Shared/Loader'
import Error from '../Shared/Error'

const ReviewDetailWrapper = styled.div`
  .review-comment-count {
    padding-bottom: 10px;
    button {
      height: 30px;
      width: auto;
      border: 0;
      background-color: white;
      color: black;
      text-decoration: underline;
    }
  }
  .review-comments-wrapper {
    border-top: 1px solid #e5e5e5;
    padding-left: 20px;
  }
  .comment-user {
    font-size: 0.9rem;
    color: #828282;
  }
  .comment-text {
    padding-left: 10px;
    font-size: 1rem;
    font-weight: 600;
  }
`;

export const GET_COMMNENTS = gql`
  query getComments($reviewId: String) {
    getComments(reviewId: $reviewId) {
      id
      createdAt
      text
      user {
        id
        username
      }
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation createComment($reviewId: String, $text: String) {
    createComment(reviewId: $reviewId, text: $text){
      id
      createdAt
      text
      user {
        id
        username
      }
    }
  }
`;

interface IReivewDetailProps {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  username: string;
  commentCount: number;
  productId: string;
}

export interface IGetCommentsResult {
  getComments: IGetCommentsComment[];
}

interface IGetCommentsComment {
  id: string;
  createdAt: string;
  text: string;
  user: IGetCommentsCommentUser
}

interface IGetCommentsCommentUser {
  id: string;
  username: string;
}


const ReviewDetail : React.FC<IReivewDetailProps> = ({ id: reviewId, title, body, createdAt, username, commentCount ,productId}) => {
  const [clickedCreateCommentBtn, setClickedCreateCommentBtn] = useState(false);
  const [commentBody, onChangeCommentBody,setCommentBody] = useInput('');
  const { data, loading, error, refetch: commentsRefetch } = useQuery<IGetCommentsResult>(GET_COMMNENTS, { variables: { reviewId } });
  const [createCommentMutation] = useMutation(CREATE_COMMENT,{
    update(cache,{data:{createComment}}){
      const {getComments} = cache.readQuery({query:GET_COMMNENTS,variables:{reviewId}})
      cache.writeQuery({
        query:GET_COMMNENTS,
        variables:{reviewId},
        data:{
          getComments: [...getComments,{...createComment}]
        }
      })
      const {getReviews} =cache.readQuery({query:GET_REVIEWS, variables:{productId}})
      cache.writeQuery({
        query: GET_REVIEWS,
        variables: {productId},
        data:{
          getReviews:{...getReviews, reviewCount: getReviews.commentCount + 1}
        }
      })
    }
  });

  const onClickCreateCommentBtn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();

    setClickedCreateCommentBtn(!clickedCreateCommentBtn);
  };

  const onSubmitCreateComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    
    createCommentMutation({
      variables: {
        reviewId,
        text: commentBody,
      },
    });

    setClickedCreateCommentBtn(false);
    setCommentBody('');
  };

  if (loading) return <Loader/>;
  let errorStatus;
    if(error){
      errorStatus = error;
      console.log('review error :',errorStatus);
      if(errorStatus) {
        commentsRefetch();
        console.log('review refetch...');
      } else {
        return <Error error={error}/>;
      }
    }

  return (
    <ReviewDetailWrapper>
      <div className="review-title">
        <span>{title}</span>
      </div>
      <div className="review-body">
        <span>{body}</span>
      </div>
      <div className="review-user">
        <span>{username} - </span>
        <span>{createdAt}</span>
      </div>
      <div className="review-comment-count">
        <span>{commentCount} Comments</span>
        <button onClick={onClickCreateCommentBtn}>댓글 달기</button>
        {clickedCreateCommentBtn && (
          <div id="create-comment-form">
            <form onSubmit={onSubmitCreateComment}>
              <label>
                <textarea value={commentBody} onChange={onChangeCommentBody} />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>
      <div className="review-comments-wrapper">
        {data &&
          data.getComments &&
          data.getComments.map((comment) => {
            return (
              <>
                <CommentCard comment={comment} productId={productId} reviewId={reviewId}/>
              </>
            );
          })}
      </div>
    </ReviewDetailWrapper>
  );
};

export default ReviewDetail;
