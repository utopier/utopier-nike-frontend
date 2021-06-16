import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';

import Client from './Apollo/Client';
import Routes from './Routes';


ReactDOM.render(
    <ApolloProvider client={Client}>
		<Routes />
	</ApolloProvider>,
	document.getElementById('root')
);
