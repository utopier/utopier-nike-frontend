import React from 'react';
import styled from 'styled-components';
import { gql, useMutation } from '@apollo/client';

import { cartProductsVar } from '../Apollo/LocalState';
import CartProductCart from '../Components/Cart/CartProductCard';
import Loader from '../Components/Shared/Loader';
import Error from '../Components/Shared/Error';

const CartWrapper = styled.div`
  padding-top: 90px;
  margin: 0 10px;
  .cart__header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 150px;
    border-bottom: 1px solid #e5e5e5;
    .cart__header-title {
      font-size: 18px;
      font-weight: 700;
      padding-bottom: 20px;
    }
    .cart__header-product-count {
      color: #999;
      font-weight: 500;
    }
  }
  .cart__body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px 100px;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 40px;
    .cart__body--product-card {
      display: flex;
      padding: 10px 0;
      .cart__body--product-card--info {
        padding: 10px;
        width: 400px;
        div {
          padding: 5px;
        }
        h3 {
          font-weight: 600;
        }
      }
      .cart__body--product-card--delete-btn {
        display: flex;
        align-items: center;
        width: 50px;
        button {
          width: 100%;
          height: 30px;
          background-color: black;
          color: white;
          border-radius: 3px;
          border: 0;
        }
        button:hover {
          opacity: 0.5;
        }
      }
    }
  }
  @media (max-width: 670px) {
    .cart__body {
      padding: 30px 5px;
      .cart__body--product-card {
        .cart__body--product-card--img {
          img {
            width: 100px;
            height: 70px;
          }
        }
        .cart__body--product-card--info {
          width: 230px;
          font-size: 0.7rem;
        }
        .cart__body--product-card--delete-btn {
          width: 30px;
        }
      }
    }
  }
`;

const DELETE_PRODUCT_IN_CART = gql`
  mutation deleteProductInCard($cartId: String) {
    deleteProductInCart(cartId: $cartId)
  }
`;

let deletedCartItemId: string;

const Cart: React.FC = React.memo(() => {
  const [deleteBtnMutation, { data: deleteData, loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_PRODUCT_IN_CART);

  if (deleteLoading) return <Loader />;
  if (deleteError) return <Error error={deleteError} />;

  if (deleteData && deleteData.deleteProductInCart) {
    const newProdutsInCart = cartProductsVar().filter(({ id }) => {
      return id !== deletedCartItemId;
    });
    console.log('deletedCartItemId : ', deletedCartItemId);
    cartProductsVar([...newProdutsInCart]);
    deletedCartItemId = '';
  }

  const onClickDeleteBtn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      deletedCartItemId = (e.target as HTMLButtonElement).getAttribute('data-id');
      deleteBtnMutation({
        variables: {
          cartId: deletedCartItemId as string,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  console.log(cartProductsVar());
  return (
    <>
      <CartWrapper>
        <div className="cart__header">
          <div className="cart__header-title">
            <h1>장바구니</h1>
          </div>
          <div className="cart__header-product-count">
            <h3>{Array.isArray(cartProductsVar()) && cartProductsVar().length}개 상품</h3>
          </div>
        </div>
        <div className="cart__body">
          {Array.isArray(cartProductsVar()) &&
            cartProductsVar().map(({ id, product }) => {
              return (
                <>
                  <CartProductCart id={id} product={product} onClickDeleteBtn={onClickDeleteBtn} />
                </>
              );
            })}
        </div>
      </CartWrapper>
    </>
  );
});

export default Cart;
