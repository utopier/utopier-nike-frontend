import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import Footer from './Footer';

const AppLayoutContainer = styled.div`
    .content {
        height: 600px;
        padding: 0 38px;
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