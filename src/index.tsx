import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';

import Client from './Apollo/Client';
import { ApolloProvider } from '@apollo/client';


ReactDOM.render(
    <ApolloProvider client={Client}>
		<Routes />
	</ApolloProvider>,
	document.getElementById('root')
);
