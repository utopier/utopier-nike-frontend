import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useInput } from '../../Hooks/useInput';
import styled from 'styled-components';
import {GET_REVIEWS} from './ReviewContent'

const UpdateReviewWrapper = styled.div`
  height: 100%;
  div {
    padding: 20px;
  }
  h2 {
    font-size: 1.2rem;
    font-weight: 600;
  }
  form {
    input {
      height: 35px;
      width: 100%;
    }
    textarea {
      margin: 15px 0;
      width: 100%;
      height: 100px;
    }
    button {
      height: 30px;
      width: 70px;
      display: block;
      background-color: black;
      color: white;
      text-decoration: none;
    }
  }
`;

const UPDATE_REVIEW = gql`
  mutation updateReview($reviewId: String!, $username: String!, $title: String!, $body: String!) {
    updateReview(reviewId: $reviewId, username: $username, title: $title, body: $body)
  }
`;

interface IUpdateReviewProps {
  reviewId: string;
  username: string;
  initTitle: string;
  initBody: string;
  productId: string;
}

const UpdateReview : React.FC<IUpdateReviewProps> = ({ reviewId, username, initTitle, initBody, productId }) => {
  const [updateReviewMutation] = useMutation(UPDATE_REVIEW,{
    update(cache, {data:{updateReview}}){
      const {getReviews} = cache.readQuery({query:GET_REVIEWS,variables:{productId}})
      cache.writeQuery({
        query:GET_REVIEWS,
        variables:{productId},
        data:{
          getReviews: [...getReviews,updateReview]
        }
      })
    }
  });
  const [title, onChangeTitle] = useInput(initTitle);
  const [body, onChangeBody] = useInput(initBody);

  const onSubmitUpdateReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
    updateReviewMutation({
      variables: {
        reviewId: reviewId + '',
        username,
        title,
        body,
      }
    });
    (document.getElementsByClassName('modal-close')[0] as HTMLButtonElement).click()
  };

  return (
    <UpdateReviewWrapper>
      <div>
        <h2>리뷰 수정</h2>
      </div>
      <div>
        <form onSubmit={onSubmitUpdateReview}>
          <label>
            <input type="text" placeholder="...title" value={title} onChange={onChangeTitle} />
          </label>
          <label>
            <textarea placeholder="...body" value={body} onChange={onChangeBody} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </UpdateReviewWrapper>
  );
};

export default UpdateReview;
