import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';

import ImageList from '../Components/Product/ImageList';
import ProductHeader from '../Components/Product/ProductHeader';
import Loader from '../Components/Shared/Loader';
import Error from '../Components/Shared/Error';
import OptionList from '../Components/Product/OptionList';
import SizeList from '../Components/Product/SizeList';
import ButtonGroupBox from '../Components/Product/ButtonGroupBox';
import DescriptionBox from '../Components/Product/DescriptionBox';
import ReviewBox from '../Components/Product/ReviewBox';
// import RecommendSwiper from '../Components/RecommendSwiper/RecommendSwiper';

const ProductContainer = styled.div`
  display: flex;
  padding: 20px 0;
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;

const ProductOptContainer = styled.div`
  width: 600px;
  margin-top: 90px;
  padding: 0 20px;
  @media (max-width: 1200px) {
    margin-top: 10px;
    width: 100%;
    padding: 0 30%;
  }
  @media (max-width: 900px) {
    padding: 0 20%;
  }
  @media (max-width: 630px) {
    padding: 0 10px;
  }
`;

export const GET_PRODUCT = gql`
  query getProduct($id: String!) {
    getProduct(id: $id) {
      title
      subtitle
      price
      imageUrls {
        url
      }
      descriptionPreview {
        title
        body
      }
      reviewCount
    }
  }
`;

interface IProductPageParams {
  productId: string;
}

interface IProductPageProduct {
  title: string;
  subtitle: string;
  price: string;
  imageUrls: IProductImgUrls[];
  descriptionPreview: IProductDescriptionPreview;
  reviewCount: number;
}

interface IProductImgUrls {
  url: string;
}

interface IProductDescriptionPreview {
  title: string;
  body: string;
}

interface IGetProductResult {
  getProduct: IProductPageProduct;
}

interface IGetProductVar {
  id: string;
}

const Product: React.FC = () => {
  console.log('Product Page Render');
  const { productId } = useParams<IProductPageParams>();
  const { data, loading, error, refetch } = useQuery<IGetProductResult, IGetProductVar>(GET_PRODUCT, {
    variables: { id: productId },
  });

  console.log(loading);
  if (loading) return <Loader />;

  let errorStatus;
  if (error) {
    errorStatus = error;
    console.log(errorStatus);
    console.log(typeof errorStatus.message);
    console.log(
      errorStatus.message.match('prisma') ||
        errorStatus.message.match('prisma.imageurl.findFirst()') ||
        errorStatus.message.match('Expected Iterable') ||
        errorStatus.message.match('max_user_connections'),
    );
    if (
      errorStatus ||
      errorStatus.message.match('prisma') ||
      errorStatus.message.match('prisma.imageurl.findFirst()') ||
      errorStatus.message.match('Expected Iterable') ||
      errorStatus.message.match('max_user_connections')
    ) {
      refetch();
      console.log('refetch...');
      return <Loader />;
    } else {
      return <Error error={error} />;
    }
  }

  console.log(data);
  const { title, subtitle, price, imageUrls, descriptionPreview, reviewCount } = data.getProduct;
  return (
    <>
      {data && data.getProduct && (
        <>
          <ProductContainer>
            <ImageList imageUrls={imageUrls} />
            <ProductOptContainer>
              <ProductHeader title={title} subtitle={subtitle} price={price} />
              <OptionList optionImgUrls={[]} />
              <SizeList />
              <ButtonGroupBox />
              <DescriptionBox title={descriptionPreview.title} body={descriptionPreview.body} />
              <ReviewBox reviewCount={reviewCount} />
            </ProductOptContainer>
          </ProductContainer>
          {/* <RecommendSwiper imageUrls={imageUrls} /> */}
        </>
      )}
    </>
  );
};

export default Product;
