import React from 'react';
import styled from 'styled-components';

const LoaderContainer = styled.div`
    width: 100%;
    height: 400px;
    div{
        padding: 100px;
    }
`

const Loader = () => {
    console.log('Loader Component');
    return(
        <LoaderContainer>
            <div>
                <h3>...Loading</h3>
            </div>
        </LoaderContainer>
    )
}

export default Loader;