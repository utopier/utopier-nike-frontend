import React from 'react';
import {getProductsVar} from '../Apollo/LocalState'

import styled from 'styled-components';

const ProductsHeaderWapper = styled.div`
  .section-title {
    font-size: 22px;
    font-weight: 500;
  }
  div{
    background-color: white;
    padding: 30px;
  }
  @media (max-width: 960px){
    padding-top: 20px;
    div{
      padding: 0;
      padding-left: 20px;
    }
  }
  width: 100%;
  padding-top: 100px;
  position: fixed;
  background-color: white;
  display: flex;
  justify-content: space-between;
  .section-control{
    button {
      background-color: white;
      border: 0;
      font-size: 0.9rem;
      color: #8d8d8d
    }
  }
  @media (max-width: 550px) {
    flex-direction: column;
    .section-title {
      font-size: 1.2rem;
      padding-bottom: 10px;
    }
  }
`;

const ProductsHeader : React.FC = React.memo(() => {

  const onClickSorting = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const text = e.currentTarget.innerText;

    if( text === "Expensive" ){   
      getProductsVar({...getProductsVar(),orderBy:{price: "desc"}})
    } else if ( text === "Cheap"){
      getProductsVar({...getProductsVar(),orderBy:{price: "asc"}})
    } else if ( text === "Newst"){
      getProductsVar({...getProductsVar(),orderBy:{createdAt: "desc"}})
    } else if ( text === "Oldest"){
      getProductsVar({...getProductsVar(),orderBy:{createdAt: "asc"}})
    } 
  }
  
  return (
    <>
      <ProductsHeaderWapper>
        <div className="section-title">Men's Men 축구 - 전체보기</div>
        <div className="section-control">
          <button onClick={onClickSorting}>Expensive</button>
          <button onClick={onClickSorting}>Cheap</button>
          <button onClick={onClickSorting}>Newst</button>
          <button onClick={onClickSorting}>Oldest</button>
        </div>
      </ProductsHeaderWapper>
    </>
  );
});

export default ProductsHeader;
