import React from 'react';
import styled from 'styled-components';

const ProductHeaderContainer = styled.div`
  padding: 5px 0;
  .product-header-info {
    justify-content: space-between;
    padding: 15px 0;
    display: flex;
    .product-price {
      font-weight: 700;
    }
  }
  .product-title {
    font-size: 28px;
    font-weight: 800;
  }
`;

interface IProductHeaderProps {
  title: string;
  subtitle: string;
  price: string;
}

const ProductHeader: React.FC<IProductHeaderProps> = React.memo((props) => {
  const { title, subtitle, price } = props;
  return (
    <>
      <ProductHeaderContainer>
        <div className="product-header-info">
          <div className="product-subtitle">
            <span>{subtitle}</span>
          </div>
          <div className="product-price">
            <span>{price}</span>
          </div>
        </div>
        <h1 className="product-title">{title}</h1>
      </ProductHeaderContainer>
    </>
  );
});

export default ProductHeader;
