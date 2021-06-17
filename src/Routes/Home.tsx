import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  .mobile-home {
    display: none;
  }
  .desktop-home {
    display: block;
  }
  @media (max-width: 645px) {
    .mobile-home {
      display: block;
    }
    .desktop-home {
      display: none;
    }
  }
`;

const DeskTopContainer = styled.div`
  img {
    width: 100%;
  }
  video {
    width: 100%;
  }
  button {
    border-radius: 100px;
    font-size: 20px;
    padding: 5px 20px;
    background-color: black;
    color: white;
  }
  .home-img-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 30px;
    div {
      padding-bottom: 30px;
    }
  }
  .home-img-container__text {
    p:first-child {
      font-size: 40px;
      font-weight: 700;
      padding-bottom: 10px;
      text-align: center;
    }
    p:last-child {
      font-size: 20px;
      font-weight: 400;
      line-height: 1.5;
      text-align: center;
    }
  }
  .weekend-style {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 30px;
    div {
      padding-bottom: 30px;
    }
    button {
      margin-left: 5px;
    }
    .weekend-style__title {
      h3 {
        font-size: 23px;
        font-height: 400;
        padding-left: 8px;
        padding-bottom: 20px;
      }
    }
    .weekend-style__text {
      p:first-child {
        font-size: 40px;
        font-weight: 700;
        padding-bottom: 10px;
        text-align: center;
      }
      p:last-child {
        font-size: 20px;
        font-weight: 400;
        line-height: 1.5;
        text-align: center;
      }
    }
  }
`;

const MobileContainer = styled.div`
  img {
    width: 100%;
  }
  video {
    width: 100%;
  }
  button {
    border-radius: 100px;
    font-size: 16px;
    padding: 5px 20px;
    background-color: black;
    color: white;
    outline: none;
  }
  .home-img-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-bottom: 30px;
    div {
      padding-bottom: 30px;
    }
  }
  .home-img-container__text {
    p:first-child {
      font-size: 29px;
      font-weight: 700;
      padding-bottom: 10px;
      text-align: left;
    }
    p:last-child {
      font-size: 16px;
      font-weight: 400;
      line-height: 1.5;
      text-align: left;
    }
  }
  .weekend-style {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-bottom: 30px;
    div {
      padding-bottom: 30px;
    }
    button {
      margin-left: 5px;
    }
    .weekend-style__title {
      h3 {
        font-size: 21px;
        font-height: 400;
        padding-left: 8px;
        padding-bottom: 20px;
      }
    }
    .weekend-style__text {
      p:first-child {
        font-size: 28px;
        font-weight: 700;
        padding-bottom: 10px;
        text-align: left;
      }
      p:last-child {
        font-size: 16px;
        font-weight: 400;
        line-height: 1.5;
        text-align: left;
      }
    }
  }
`;

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <DeskTopContainer className="desktop-home">
        <div className="home-img-container">
          <div className="home-img-container__img">
            <img src="https://static-breeze.nike.co.kr/kr/ko_kr//cmsstatic/structured-content/65250/210324_hp_p1_bg.jpg" />
          </div>
          <div className="home-img-container__text">
            <p>나이키 에어 베이퍼 맥스 EVO</p>
            <p>
              클래식한 에어맥스 시리지를 리믹스하여
              <br />
              더욱 볼드해진 나이키 에어 베이퍼맥스 EVO를 만나보세요.
            </p>
          </div>
          <div className="home-img-container__btn">
            <button>구매하기</button>
          </div>
        </div>
        <div className="home-img-container">
          <div className="home-img-container__img">
            <img src="https://static-breeze.nike.co.kr/kr/ko_kr//cmsstatic/structured-content/65250/210302_hp_p2_bg.jpg" />
          </div>
          <div className="home-img-container__text">
            <p>나이키 에어맥스 비바</p>
            <p>
              맥스 에어 유닛과 아이코닉한 디자인의 비바와 함께
              <br />
              시선을 압도하는 세련된 스타일을 연출해보세요.
            </p>
          </div>
          <div className="home-img-container__btn">
            <button>구매하기</button>
          </div>
        </div>
        <div className="weekend-style">
          <div className="weekend-style__title">
            <h3>이번 주 스타일링</h3>
          </div>
          <div className="weekend-style__video">
            <video autoPlay={true} muted={true} loop={true}>
              <source src="https://nikevideo.nike.com/72451143001/202103/2188/72451143001_6241143221001_6241143807001.mp4" />
            </video>
          </div>
          <div className="weekend-style__text">
            <p>스프링 재킷 스타일</p>
            <p>봄을 위한 여성 재킷 제품들과 함께 레이어드 룩을 완성해보세요.</p>
          </div>
          <div className="weekend-style__btn">
            <button>구매하기</button>
            <button>더 많은 스타일링 보기</button>
          </div>
        </div>
        <div className="home-img-container">
          <div className="home-img-container__img">
            <img src="https://static-breeze.nike.co.kr/kr/ko_kr//cmsstatic/structured-content/65250/210315_hp_p4_bg.jpg" />
          </div>
          <div className="home-img-container__text">
            <p>조던 MA2</p>
            <p>최상의 편안함과 감각적인 스타일의 조던 MA2를 만나보세요.</p>
          </div>
          <div className="home-img-container__btn">
            <button>구매하기</button>
          </div>
        </div>
      </DeskTopContainer>
      <MobileContainer className="mobile-home">
        <div className="home-img-container">
          <div className="home-img-container__img">
            <img src="https://static-breeze.nike.co.kr/kr/ko_kr//cmsstatic/structured-content/65250/m210324_hp_p1.bg.jpg" />
          </div>
          <div className="home-img-container__text">
            <p>
              나이키 에어 <br />
              베이퍼 맥스 EVO
            </p>
            <p>
              클래식한 에어맥스 시리즈를 <br />
              리믹스하여 더욱 볼드해진 <br />
              나이키 에어 베이퍼맥스 EVO를 만나보세요.
            </p>
          </div>
          <div className="home-img-container__btn">
            <button>구매하기</button>
          </div>
        </div>
        <div className="home-img-container">
          <div className="home-img-container__img">
            <img src="https://static-breeze.nike.co.kr/kr/ko_kr//cmsstatic/structured-content/65250/m210302_hp_p2_bg.jpg" />
          </div>
          <div className="home-img-container__text">
            <p>나이키 에어맥스 비바</p>
            <p>
              맥스 에어 유닛과 아이코닉한 디자인의
              <br /> 비바와 함께 시선을 압도하는 <br />
              세련된 스타일을 연출해보세요.
            </p>
          </div>
          <div className="home-img-container__btn">
            <button>구매하기</button>
          </div>
        </div>
        <div className="weekend-style">
          <div className="weekend-style__title">
            <h3>이번 주 스타일링</h3>
          </div>
          <div className="weekend-style__video">
            <video autoPlay={true} muted={true} loop={true}>
              <source src="https://nikevideo.nike.com/72451143001/202103/980/72451143001_6241143162001_6241143907001.mp4" />
            </video>
          </div>
          <div className="weekend-style__text">
            <p>스프링 재킷 스타일</p>
            <p>
              봄을 위한 여성 재킷 제품들과 함께 <br /> 레이어드 룩을 완성해보세요.
            </p>
          </div>
          <div className="weekend-style__btn">
            <button>구매하기</button>
            <button>더 많은 스타일링 보기</button>
          </div>
        </div>
        <div className="home-img-container">
          <div className="home-img-container__img">
            <img src="https://static-breeze.nike.co.kr/kr/ko_kr//cmsstatic/structured-content/65250/m210315_hp_p4_bg.jpg" />
          </div>
          <div className="home-img-container__text">
            <p>조던 MA2</p>
            <p>
              최상의 편안함과 감각적인 스타일의
              <br /> 조던 MA2를 만나보세요.
            </p>
          </div>
          <div className="home-img-container__btn">
            <button>구매하기</button>
          </div>
        </div>
      </MobileContainer>
    </HomeContainer>
  );
};

export default Home;
