import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import {cartProductsVar, meDataVar} from '../../Apollo/LocalState'

import Loader from '../Shared/Loader'
import Error from '../Shared/Error'

const ButtonGroupContainer = styled.div`
  width: 100%;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  div {
    height: 60px;
    margin: 10px 0;
  }
  button {
    cursor: pointer;
    outline: none;
    margin: 1px;
    width: 100%;
    height: 100%;
    border-radius: 30px;
    border: 1px solid black;
    background-color: white;
    font-weight: 700;
  }
  button:hover {
    border-color: #999;
  }
  .direct-order:hover {
    background-color: #343434;
  }
  .direct-order {
    background-color: black;
    color: white;
  }
  div:last-child {
    display: flex;
  }
`;
// const ME = gql`
//   query GetMe {
//     me {
//       id
//     }
//   }
// `;

const CREACT_PRODUCT_IN_CART = gql`
  mutation createProductInCart($productId: String) {
    createProductInCart(productId: $productId){
      id
      createdAt
      updatedAt
      title
      subtitle
      price
      color
      imageUrls {
        id
        url
      }
    }
  }
`;

const ButtonGroupBox = React.memo(() => {
  console.log('ButtonGroupBox Component Render');
  const { productId } = useParams<{productId: string}>();
  // const { data: userData, loading: userDataLoading} = useQuery(ME);
  const [cartBtnMutation, { data, loading, error }] = useMutation(CREACT_PRODUCT_IN_CART);

  if( loading) return <Loader/>
  let errorStatus;
  if(error){
    errorStatus = error;
    console.log(errorStatus);
    if(localStorage.getItem('token')) {
      cartBtnMutation({
        variables: {
          productId
        },
      });
      console.log('cartMutation refetch...');
    } else {
      return <Error error={error}/>;
    }
  }
  console.log('meDataVar : ', meDataVar());
  if(data && data.createProductInCart){
    console.log(data);
    cartProductsVar([...cartProductsVar(),data.createProductInCart])
    console.log('cartProductsVar() : ', cartProductsVar());
    }

  const onClickCartBtn = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log('onClick CartBtn')
    e.preventDefault();
    try {
      let exitingProduct;
      if( cartProductsVar()){
        exitingProduct = cartProductsVar().find(({product})=>
          product.id === productId
        )
      }
      if(exitingProduct){
        alert('이미 추가되었습니다.')
        return
      }
      if (meDataVar() && meDataVar().id || localStorage.getItem("token")) {
        cartBtnMutation({
          variables: {
            productId
          },
        });
      } else {
        alert('Login 해야합니다.')
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <ButtonGroupContainer>
        <div>
          <button className="direct-order">바로구매</button>
        </div>
        <div>
          <button onClick={onClickCartBtn}>장바구니</button>
          <button>위시리스트 ♡</button>
        </div>
      </ButtonGroupContainer>
    </>
  );
});

export default ButtonGroupBox;