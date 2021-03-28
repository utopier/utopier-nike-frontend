import React from 'react';

interface IErrorProps {
    error: object;
}

const Error: React.FC<IErrorProps> = ({error}) => {
    return(
        <>
            <div>
                <p>{error.toString()}</p>
            </div>
        </>
    )
};

export default Error;