import React, {useEffect} from 'react';
import GlobalStyles from '../Styles/GlobalStyles';
import theme from '../Styles/theme';
import { ThemeProvider } from 'styled-components';
import {cartProductsVar, meDataVar} from '../Apollo/LocalState'
import { gql, useLazyQuery} from '@apollo/client';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Products from './Products';
import Product from './Product';
import SignUp from './SignUp';
import Login from './Login';
import Cart from './Cart';

import Error from '../Components/Shared/Error';
import Loader from '../Components/Shared/Loader'

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

const Routes = () => {
    const [getCart,{ data: cartData, loading: cartLoading, error: cartError }] = useLazyQuery<IGetCardResult>(GET_CART);

    useEffect(() => {
      if(meDataVar()){
        getCart()
      }
    }, [])
    if (cartLoading) return <Loader/>;
    if (cartError) return <Error error={cartError}/>;
  
    if(!cartError && cartData){
      cartProductsVar([...cartData.getCart])
    }
    console.log('getCard data : ', cartData);
    console.log('cartProductsVar : ', cartProductsVar());
    return (
        <ThemeProvider theme={theme}>
            <>
                <GlobalStyles />
                    <Router>
                    <AppLayout>
                        <Switch>
                            <Route exact={true} path="/" component={Home} />
                            <Route path="/products" component={Products} />
                            <Route path="/product/:productId" component={Product} />
                            <Route path="/cart" component={Cart} />
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