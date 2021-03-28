import React from 'react';
import styled from 'styled-components';
import {gql, useQuery} from '@apollo/client'


import Header from './Header';
import Footer from './Footer';
import Loader from './Shared/Loader';
import Error from './Shared/Error';

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

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
interface IIsLoggedInData {
    isLoggedIn: boolean;
  }

const AppLayout = ({children}) => {
    const { data, loading, error } = useQuery<IIsLoggedInData>(IS_LOGGED_IN);
  
    if (loading) return <Loader/>;
    if (error) return <Error error={error}/>; 
   

    return (
        <>
            <AppLayoutContainer>
                <Header isLoggedIn={data && data.isLoggedIn} />
                <div className="content">
                {...children}
                </div>
                <Footer/>
            </AppLayoutContainer>
        </>
    )
}

export default AppLayout;