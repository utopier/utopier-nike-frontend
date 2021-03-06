import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import styled from 'styled-components';

import Error from '../Components/Shared/Error';
import { meDataVar } from '../Apollo/LocalState';
import { ME, IMeResult } from '../Routes';

const ProductsListWapper = styled.div`
  img {
    width: 100%;
    height: 100%;
  }
`;

const ProductInfo = styled.div`
  margin: 1vw 0;
  color: #8d8d8d;
  font-weight: 600;
  .price {
    color: #111;
    font-weight: 700;
  }
  .item-title {
    color: #111;
    font-weight: 700;
  }
  div {
    padding-bottom: 1vw;
  }
  p {
    padding-bottom: 1vw;
  }
  .like-img {
    cursor: pointer;
  }
  @media (max-width: 820px) {
    flex-direction: column;
    font-size: 0.8rem;
  }
`;

interface IProductCardProps {
  id: string;
  price: string;
  title: string;
  subtitle: string;
  imageUrls: IProductCardImgUrls;
}

interface IProductCardImgUrls {
  url: string;
}

const TOGGLE_LIKE = gql`
  mutation toggleLike($productId: String!) {
    toggleLike(productId: $productId) {
      status
      like {
        id
        productId
        userId
      }
    }
  }
`;

const ProductCard: React.FC<IProductCardProps> = ({ id, imageUrls, title, subtitle, price }) => {
  // const liked = meDataVar().likes.find(v => id === v.product.id)
  // const client = useApolloClient()
  // const liked = client.cache.readQuery<IMeResult>({query:ME}).me.likes.find(v => id === v.product.id)
  const [openedErrorModal, setOpenedErrorModal] = useState(false);
  const [toggleLikeMutation, { loading, error }] = useMutation(TOGGLE_LIKE, {
    update(cache, { data: { toggleLike } }: any) {
      console.log('update me cache');
      const { me }: IMeResult = cache.readQuery({ query: ME });
      console.log(me);
      console.log(toggleLike);
      if (toggleLike.status === 'deleted') {
        console.log('deleted');
        meDataVar({
          ...me,
          likes: me.likes && me.likes.filter((v) => v.product.id !== id),
        });
      } else if (toggleLike.status === 'added') {
        console.log('added');
        console.log(meDataVar());
        if (me.likes) {
          meDataVar({
            ...me,
            likes: [
              ...me.likes,
              {
                id: toggleLike.like.id,
                product: { id: toggleLike.like.productId },
              },
            ],
          });
        } else {
          meDataVar({
            ...me,
            likes: [
              {
                id: toggleLike.like.id,
                product: { id: toggleLike.like.productId },
              },
            ],
          });
        }
        console.log(meDataVar());
      }
    },
  });
  const closeErrorModal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setOpenedErrorModal(false);
  };
  console.log('toggleMutation Loading : ', loading);
  console.log('toggleMutation error : ', error);
  const onClickHeart = (e) => {
    console.log('onClickHeart');
    e.preventDefault();
    if (localStorage.getItem('token')) {
      toggleLikeMutation({
        variables: {
          productId: id,
        },
      });
    } else {
      setOpenedErrorModal(true);
    }
  };

  return (
    <>
      <ProductsListWapper>
        <div className="product-card">
          <div className="product-img">
            <Link to={`/product/${id}`}>
              <img src={imageUrls && imageUrls.url} alt="????????? ?????? ?????? ????????? FG" />
            </Link>
          </div>
        </div>
        <ProductInfo>
          <div>
            <p className="product-display-name">
              <span className="item-title">{title}</span>
            </p>
          </div>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', paddingRight: '10px' }}>
            <div>
              <div className="product-subtitle">
                <span className="text-color-secondary">{subtitle}</span>
              </div>
              <div id="item-color-opt" className="product-colorways-number">
                <span className="text-color-secondary">3 ??????</span>
              </div>
              <div className="price">
                <span>{price}</span>
              </div>
            </div>
            <div onClick={onClickHeart} style={{ width: '48px', height: '48px' }}>
              {meDataVar() &&
              meDataVar().likes &&
              meDataVar().likes.find((v) => {
                return id === v.product.id;
              }) ? (
                <img className="like-img" src={`${process.env.PUBLIC_URL}/icon/heart.svg`} width="48px" height="48px" />
              ) : (
                <img
                  className="like-img"
                  src={`${process.env.PUBLIC_URL}/icon/emptyHeart.svg`}
                  width="48px"
                  height="48px"
                />
              )}
            </div>
          </div>
          {openedErrorModal && (
            <Error visible={openedErrorModal} closable={true} maskClosable={true} onClose={closeErrorModal}>
              <div>{error}</div>
            </Error>
          )}
        </ProductInfo>
      </ProductsListWapper>
    </>
  );
};

export default ProductCard;
