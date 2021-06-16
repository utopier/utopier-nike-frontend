import React from 'react';
import styled from 'styled-components';

const ProductImgsContainer = styled.div`
  display: grid;
  margin-top: 90px;
  width: 100%;
  padding: 0 5px;
  grid-template-columns: repeat(2, 1fr);
  gap: 1vw;
  img {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 550px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

interface IImageListProps {
  imageUrls: IImageListPropsUrl[];
}

interface IImageListPropsUrl {
  url: string;
}

const ImageList : React.FC<IImageListProps>= React.memo(({ imageUrls }) => {
  return (
    <>
      <ProductImgsContainer>
        {imageUrls.map(({ url }) => (
          <div className="product-img">
            <img alt="" src={url} />
          </div>
        ))}
      </ProductImgsContainer>
    </>
  );
});

export default ImageList;
