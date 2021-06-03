import React from 'react';
import GlobalStyles from '../Styles/GlobalStyles';
import theme from '../Styles/theme';
import { ThemeProvider } from 'styled-components';
import {cartProductsVar, meDataVar} from '../Apollo/LocalState'
import { gql, useQuery} from '@apollo/client';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Products from './Products';
import Product from './Product';
import SignUp from './SignUp';
import Login from './Login';
import Cart from './Cart';

import Error from '../Components/Shared/Error';

import AppLayout from '../Components/Layout';

interface ICartProduct {
    id: string;
    title: string;
    subtitle: string;
    price: string;
    color: string;
    imageUrls: ICartProductImgUrls[];
  }
  
  interface ICartProductImgUrls{
    url: string;
  }
  
  interface ICartProducts {
    id: string;
    product:ICartProduct;
  }
  
  interface IGetCardResult {
    getCart: ICartProducts[]
  }
  
  
  const GET_CART = gql`
    query GetCart {
      getCart {
        id
        product {
          id
          title
          subtitle
          price
          color
          imageUrls {
            url
          }
        }
      }
    }
  `;

  
export const ME = gql`
query me {
  me {
    id
    username
    email
    likes{
      id
      product{
        id
      }
    }
  }
}
`

export interface IMeResult {
  me: IMeResultObj
}

interface IMeResultObj {
  id: string;
  username: string;
  email: string;
  likes?: IMeResultObjLike[];
}

interface IMeResultObjLike{
  id: string;
  product:{id: string};
}

const Routes = () => {
    const {data: meData, loading: meLoading, error: meError, refetch: meRefetch} = useQuery<IMeResult>(ME)

    const { data: cartData, loading: cartLoading, error: cartError , refetch: cartRefetch} = useQuery<IGetCardResult>(GET_CART);

    console.log('meLoading :',meLoading);
    console.log('cartLoading :', cartLoading);
  
    console.log('meError: ', meError);
    console.log('cartError:',cartError);
    let errorStatus;
    if(meError){
      errorStatus = meError;
      console.log('meError :',errorStatus);
      if(localStorage.getItem('token') && errorStatus && !meDataVar()) {
        meRefetch();
        console.log('me refetch...');
      } else if (!localStorage.getItem('token')){
        console.log('login 안됨')
      } 
      else {
        return <Error error={meError}/>;
      }
    }
    if(cartError){
      errorStatus = cartError;
      console.log('cartError : ',errorStatus);
      if((localStorage.getItem('token') && !cartProductsVar()) || (localStorage.getItem('token') && errorStatus)) {
        cartRefetch();
        console.log('cart refetch...');
      }else if (!localStorage.getItem('token')){
        console.log('login 안됨')
      }  else {
        return <Error error={cartError}/>;
      }
    }
    if(!cartError && cartData){
      cartProductsVar([...cartData.getCart])
    }
    console.log('getCard data : ', cartData);
    console.log('cartProductsVar : ', cartProductsVar());

    if(meData && meData.me){
      console.log('meData : ', meData);
      meDataVar({...meData.me})
   }
    return (
        <ThemeProvider theme={theme}>
            <>
                <GlobalStyles />
                    <Router basename={"/utopier-nike-frontend"}>
                    <AppLayout>
                        <Switch>
                            <Route exact={true} path="/" component={Home} />
                            <Route path="/products" component={Products} />
                            <Route path="/cart" component={Cart} />
                            <Route path="/product/:productId" component={Product} />
                            <Route path="/login" component={Login} />
                            <Route path="/signup" component={SignUp} />
                            <Redirect from="*" to="/" />
                        </Switch>
                        </AppLayout>
                    </Router>
            </>
        </ThemeProvider>
    )
}

export default Routes;