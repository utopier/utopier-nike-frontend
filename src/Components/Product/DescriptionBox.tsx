import React from "react";
import styled from "styled-components";

const DescriptionContainer = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #e5e5e5;
  h3 {
    display: block;
    font-weight: 700;
    padding-bottom: 15px;
  }
  p {
    font-size: 13px;
    line-height: 1.75;
    letter-spacing: 1px;
  }
  a {
    font-size: 13px;
    cursor: pointer;
    color: #666;
    text-decoration: underline;
  }
  div {
    padding-top: 10px;
  }
`;

interface IDescriptionBoxProps {
    title: string;
    body: string;
}

const DescriptionBox : React.FC<IDescriptionBoxProps>= React.memo(({ title, body }) => {
  return (
    <DescriptionContainer>
      <h3>{title}</h3>
      <br />
      <p>{body}</p>
      <div>
        <a>더 보기</a>
      </div>
    </DescriptionContainer>
  );
});

export default DescriptionBox;
