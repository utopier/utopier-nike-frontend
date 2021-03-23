import React from 'react';

import GlobalStyles from '../Styles/GlobalStyles';
import theme from '../Styles/theme';
import { ThemeProvider } from 'styled-components';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Products from './Products';
import Product from './Product';
import SignUp from './SignUp';
import Login from './Login';
import Cart from './Cart';

const Routes = () => {
    return (
        <ThemeProvider theme={theme}>
            <>
                <GlobalStyles />
                <Router>
                    <Switch>
                        <Route exact={true} path="/" component={Home} />
                        <Route path="/products" component={Products} />
                        <Route path="/product/:productId" component={Product} />
                        <Route path="/cart" component={Cart} />
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={SignUp} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </Router>
            </>
        </ThemeProvider>
    )
}

export default Routes;