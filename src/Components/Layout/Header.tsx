import React from 'react';
import styled from 'styled-components';

import { Link, useHistory } from 'react-router-dom';

const HeaderContainer = styled.header`
    height: 96px;
    z-index: 1;
    .responsive-header {
      display: none;
    }
    @media (max-width: 960px) {
      .pre_header {
        display: none;
      }
      .nk_gnb {
        display: none;
      }
      .responsive-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }  
    .pre_header {
        height: 36px;
        padding: 10px 38px;
        background-color: #f5f5f5;
        .nk_brand {
            display: flex;
            justify-content: space-between;
            ul{
                display: flex;
                li {
                    font-size: 12px;
                    padding-left: 10px;
                }
            }
        }
    }
    .nk_gnb {
        height: 60px;
        padding: 10px 38px;
        .pre_nav_box{
            display: flex;
            justify-content: space-between;
            ul{
                display: flex;
                width: 500px;
                justify-content: center;
                li{
                    padding: 10px;
                    font-size: 16px;
                    font-weight: 500;
                    line-height: 2;
                }
            }
            .pre_nav-box--btn-groups{
                display: flex;
                justify-content: space-between;
                width: 300px;
                .pre_nav_box--search{
                    position:relative;
                    top: 10px;
                    img{
                        position:absolute;
                        top: 5px;
                        left: 5px;
                    }
                    input{
                        width: 180px;
                        background: #f5f5f5;
                        border-radius: 100px;
                        font-size: 16px;
                        padding: 8px 48px;
                        border: 0;
                    }
                }   
            }
            .pre_nav_box--btn_group {
                display: flex;
                div {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 50px;
                }
            }
        }
    }
`;

const ResponsiveHeader = styled.header`
    padding: 10px 10px 0;
    .responsive-header__icons {
    display: flex;
    div {
        padding: 0 5px;
    }
    .search-bar {
        cursor: pointer;
        input {
        display: none;
        }
    }
    }
`;

const MobileMenu = styled.div`
width: 0;
height: 100vh;
z-index: 110;
position: fixed;
transition: 0.5s;
top: 0;
right: 0;
background-color: white;
overflow-x: hidden;
div {
  padding: 20px 50px;
  &:first-child {
    padding-top: 60px;
  }
  h2 {
    font-size: 1.2rem;
    font-weight: 600;
  }
  span {
    color: #757575;
  }
}

`;

const MobileSearch = styled.div`
width: 0;
height: 100vh;
visibility: hidden;
position: fixed;
transition: 0.5s;
overflow-y: hidden;
top: 0;
right: 0;
background-color: white;
.mobile-search__bar {
  height: 50px;
  display: flex;
  width: 100%;
  padding: 5px;
  form {
    width: 100%;
    padding: 0 5px;
  }
  input {
    border-radius: 5px;
    height: 100%;
    width: 100%;
    background: #f5f5f5;
    border: 0;
    padding: 8px 20px;
  }
  button {
    width: 50px;
    height: 100%;
    border-radius: 20px;
    background: #f5f5f5;
    border: 0;
    font-size: 1.3rem;
  }
}
.bobile-search__recommend-keyword {
  padding: 30px;
  p {
    font-size: 1.2rem;
    font-weight: 600;
  }
  ul {
    padding-top: 20px;
    li {
      margin-top: 20px;
      font-size: 1.1rem;
    }
  }
}
&.open {
  z-index: 200;
  visibility: visible;
}
`;

interface IHeaderProps {
    isLoggedIn: boolean;
  }

const Header : React.FC<IHeaderProps> = ({isLoggedIn}) => {
    const history = useHistory()

    const onClickLogout = () => {
        localStorage.removeItem('token');
        // isLoggedInVar(false);
        history.push('/');
      };
    

    const onClickMenu = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
    
        const mobileMenuEl : HTMLElement  = document.getElementById('moblie-menu');
        console.log(mobileMenuEl);
        if (mobileMenuEl.className.match('open')) {
          mobileMenuEl.classList.remove('open');
        } else {
          mobileMenuEl.classList.add('open');
          mobileMenuEl.style.width = '300px';
          document.querySelector('html').addEventListener('click', function (event) {
            if (!(event.target as HTMLHtmlElement).className.match('open')) {
              mobileMenuEl.classList.remove('open');
              mobileMenuEl.style.width = '0';
            }
          });
        }
      };
    
      const onClickSearchIcon = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        
        const mobileSearchEl = document.getElementById('mobile-search');
        
        console.log(mobileSearchEl)
        mobileSearchEl.classList.add('open');
        mobileSearchEl.style.width = '100%';
      };
    
      const onClickCloseMobileSearch = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
    
        const mobileSearchEl = document.getElementById('mobile-search');
        mobileSearchEl.classList.remove('open');
        mobileSearchEl.style.width = '0';
      };
    
    return (
        <>
            <HeaderContainer>
                <div className="pre_header">
                    <div className="nk_brand">
                        <div className="nk_brand--logo">
                            <img src="/image/jordan.png" width="20px" height="20px"/>
                        </div>
                        <div className="nk_brand--desk_user">
                            <ul>
                                <li>고객센터</li>
                                <li>멤버 가입</li>
                                <li>로그인</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="nk_gnb">
                    <div className="pre_nav_box">
                        <div className="pre_nav_box--logo">
                            <img src="/image/nikelogo.png" width="50px" height="28px"/>
                        </div>
                        <ul>
                            <li>New Releases</li>
                            <li>Men</li>
                            <li>Women</li>
                            <li>Kids</li>
                            <li>Sale</li>
                        </ul>
                        <div className="pre_nav-box--btn-groups">
                            <div className="pre_nav_box--search">
                                <img src="/icon/search.png" width="24px" height="24px"/>
                                <input placeholder="검색"/>
                            </div>
                            <div className="pre_nav_box--btn_group">
                                <div className="pre_nav_box--btn_group--wish">
                                    <img src="/icon/emptyHeart.svg" width="24px" height="24px"/>
                                </div>
                                <div className="pre_nav_box--btn_group--cart">
                                    <img src="/icon/cart.png" width="24px" height="24px"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ResponsiveHeader className="responsive-header">
                    <div className="logo">
                        <Link to="/">
                        <a href="#">
                            <span>
                            <img src={`${process.env.PUBLIC_URL}/image/nikelogo.png`} width="60px" height="45px" />
                            </span>
                        </a>
                        </Link>
                    </div>
                    <div className="responsive-header__icons">
                        <div className="search-bar" onClick={onClickSearchIcon}>
                        <img src={`${process.env.PUBLIC_URL}/icon/search.png`} width="25px" height="25px" />
                        <input type="text" placeholder="검색" />
                        </div>
                        <div>
                        <Link to="/cart">
                            <img src={`${process.env.PUBLIC_URL}/icon/cart.png`} width="25px" height="25px" />
                        </Link>
                        </div>
                        <div>
                        <a href="#" className="icon" onClick={onClickMenu}>
                            <img src={`${process.env.PUBLIC_URL}/icon/menu.png`} width="25px" height="25px" />
                        </a>
                        </div>
                    </div>
                </ResponsiveHeader>
            </HeaderContainer>
            <MobileMenu id="moblie-menu">
                <div>
                <Link to="/products">
                    <h2>Men</h2>
                </Link>
                </div>
                <div>
                <Link to="/products">
                    <span>New</span>
                </Link>
                </div>
                <div>
                <Link to="/products">
                    <span>신상품</span>
                </Link>
                </div>
                <div>
                <Link to="/products">
                    <span>신발</span>
                </Link>
                </div>
                <div>
                <Link to="/products">
                    <span>의류</span>
                </Link>
                </div>
                <div>
                <Link to="/products">
                    <span>스포츠</span>
                </Link>
                </div>
                <div>
                <Link to="/products">
                    <span>브랜드</span>
                </Link>
                </div>
                <div>
                <Link to="/products">
                    <span>SALE</span>
                </Link>
                </div>
                <div>
                {isLoggedIn ? (
                    <a href="" onClick={onClickLogout}>
                    로그아웃
                    </a>
                ) : (
                    <>
                    <Link to="/signup">회원가입 </Link> | <Link to="/login"> 로그인 </Link>
                    </>
                )}
                </div>
            </MobileMenu>
            <MobileSearch id="mobile-search">
                <div className="mobile-search__bar">
                <form>
                    <label htmlFor="mobile-search-input">
                    <input id="mobile-search-input" type="text" placeholder="검색" />
                    </label>
                </form>
                <button type="button" onClick={onClickCloseMobileSearch}>
                    x
                </button>
                </div>
                <div className="bobile-search__recommend-keyword">
                <p>추천 검색어</p>
                <ul>
                    <li>패딩</li>
                    <li>킬샷</li>
                    <li>홈트레이닝</li>
                    <li>에어 포스 1</li>
                    <li>플리스</li>
                </ul>
                </div>
            </MobileSearch>
        </>
    )
}

export default Header;