import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #111;
  padding: 10px 10px;
  color: white;
`;

const FooterNav = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-bottom: 1px solid gray;
  justify-items: center;
  dd {
    color: #999999;
    margin: 0;
  }
  dt {
    padding-bottom: 5px;
  }
  @media (max-width: 530px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
`;

const FooterCopy = styled.div`
  display: grid;
  justify-content: center;
  padding: 10px;
  div {
      a{
        color: white;
      }
    padding: 10px;
  }
`;


const Footer: React.FC = () => {
    console.log('footer')
    return (
        <>
            <FooterContainer>
                <FooterNav>
                    <div className="company-info">
                        <p>주문배송</p>
                        <p>매장안내</p>
                        <p>로그인</p>
                        <p>회원가입</p>
                        <p>고객센터</p>
                    </div>
                    <dl className="company-legal">
                        <dt>고객센터</dt>
                        <dd>080-022-0182</dd>
                        <dd>주문/결제</dd>
                        <dd>배송</dd>
                        <dd>주문배송조회</dd>
                        <dd>멤버쉽 혜택/서비스</dd>
                        <dd>공지사항</dd>
                        <dd>1:1 채팅 문의</dd>
                        <dd>1:1 이메일문의</dd>
                        <dd>이용약관</dd>
                        <dd>개인정보처리방법</dd>
                    </dl>
                    <dl className="company-agrement">
                        <dt>ABOUT NIKE</dt>
                        <dd>나이키에 대하여</dd>
                    </dl>
                    <dl className="company-follow">
                        <dt>SOCIAL</dt>
                        <dd>
                        <div className="footer-sns">
                            <a>
                            <span>트위터</span>
                            </a>
                            <a>
                            <span>페이스북</span>
                            </a>
                            <a>
                            <span>유튜브</span>
                            </a>
                            <a>
                            <span>인스타그램</span>
                            </a>
                        </div>
                        </dd>
                    </dl>
                </FooterNav>
                <FooterCopy>
                    <div>
                        <a>
                        <span>대한민국</span>
                        </a>
                    </div>
                    <div>
                        <a>이용약관</a>
                        <a>개인정보처리방침</a>
                    </div>
                </FooterCopy>
            </FooterContainer>
        </>
    );
};

export default Footer;