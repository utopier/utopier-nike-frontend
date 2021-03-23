import { ApolloClient, InMemoryCache, split, HttpLink  } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { setContext } from '@apollo/client/link/context'

import { isLoggedInVar, meDataVar, cartProductsVar ,getProductsVar, productList} from './LocalState';

// import {GET_REVIEWS} from '../Components/Product/ReviewContent'

export const cache : InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        meData: {
          read() {
            return meDataVar();
          }
        },
        cartProducts: {
          read() {
            return cartProductsVar();
          }
        },
        getProductsVar: {
          read() {
            return getProductsVar();
          }
        },
        productList: {
          read() {
            return productList();
          }
        }
      },
    },
  },
});

const httpLink = new HttpLink({
  uri:  process.env.NODE_ENV === 'development'
  ? 'http://localhost:4000/graphql'
  : 'https://utopier-nike-clone-graphapi.herokuapp.com/graphql'
})

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('token')
	return {
	  headers: {
		...headers,
		authorization: token ? `Bearer ${token}` : '',
	  },
	}
  })

const wsLink = new WebSocketLink({
  uri:   process.env.NODE_ENV === 'development'
  ? 'ws://localhost:4000/graphql'
  : 'wss://utopier-nike-clone-graphapi.herokuapp.com/graphql',
  options: {
    reconnect: true,
    // connectionParams: {
    //   authToken: localStorage.getItem('token')
    // },
  },
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);


export default new ApolloClient({
  link: splitLink,
  cache,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
