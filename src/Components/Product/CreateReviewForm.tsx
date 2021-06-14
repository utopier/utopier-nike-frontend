import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useInput } from '../../Hooks/useInput';
import styled from 'styled-components';
import {GET_REVIEWS} from './ReviewContent'
import {GET_PRODUCT} from '../../Routes/Product'

const CreateReviewFormWrapper = styled.div`
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

const CREATE_REVIEW = gql`
  mutation createReview($productId: String!, $title: String!, $body: String!) {
    createReview(productId: $productId, title: $title, body: $body) {
      id
      createdAt
      title
      body
      user {
        id
        username
      }
    }
  }
`;

const CreateReviewForm = React.memo(({ productId }: {productId: string}) => {
  const clickedCreate = React.useRef(false);
  const [createReviewMutation, { data}] = useMutation(CREATE_REVIEW,{
    update(cache, {data:{createReview}}){
      console.log('createReview Result Data : ', data);
      clickedCreate.current = false;
      const {getReviews} = cache.readQuery({query:GET_REVIEWS,variables:{productId}})
      cache.writeQuery({
        query:GET_REVIEWS,
        variables:{productId},
        data:{
          getReviews: [...getReviews,{...createReview,commentCount:0}]
        }
      })
      const {getProduct} =cache.readQuery({query:GET_PRODUCT, variables:{id: productId}})
      cache.writeQuery({
        query: GET_PRODUCT,
        variables: {id: productId},
        data:{
          getProduct:{...getProduct, reviewCount: getProduct.reviewCount + 1}
        }
      })
    }
  });

  const [title, onChangeTitle] = useInput('');
  const [body, onChangeBody] = useInput('');

  if(clickedCreate.current && localStorage.getItem('token')){
    console.log('create review remutation...')
    createReviewMutation({
      variables: {
        productId: productId + '',
        title,
        body,
      },
    });
  }

  const onSubmitCreateReview = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clickedCreate.current = true;
    createReviewMutation({
      variables: {
        productId: productId + '',
        title,
        body,
      },
    });
    (document.getElementsByClassName('modal-close')[0] as HTMLButtonElement).click()
  };

  

  return (
    <CreateReviewFormWrapper>
      <div>
        <h2>리뷰 작성</h2>
      </div>
      <div>
        <form onSubmit={onSubmitCreateReview}>
          <label>
            <input type="text" placeholder="...title" value={title} onChange={onChangeTitle} />
          </label>
          <label>
            <textarea placeholder="...body" value={body} onChange={onChangeBody} />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </CreateReviewFormWrapper>
  );
})

export default CreateReviewForm;
