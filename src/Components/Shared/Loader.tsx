import React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const LoaderContainer = styled.div`
  width: 100%;
  height: 400px;
  div {
    padding: 100px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoaderComponent = () => {
  console.log('Loader Component');
  return (
    <LoaderContainer>
      <Loader type="TailSpin" color="#00BFFF" height={100} width={100} timeout={3000} />
    </LoaderContainer>
  );
};

export default LoaderComponent;
