import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import Footer from './Footer';

const AppLayoutContainer = styled.div`
    .content {
        padding: 0 38px;
    }
    @media(max-width:645px){
        .content{
            padding: 0 12px;
        }
    }
`

const AppLayout = ({children}) => {
    const isLoggedIn = false;
    return (
        <>
            <AppLayoutContainer>
                <Header isLoggedIn={isLoggedIn} />
                <div className="content">
                {...children}
                </div>
                <Footer/>
            </AppLayoutContainer>
        </>
    )
}

export default AppLayout;