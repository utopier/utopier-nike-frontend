import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
    height: 96px;
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

const Header : React.FC = () => {
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
            </HeaderContainer>
        </>
    )
}

export default Header;