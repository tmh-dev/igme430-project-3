import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { InMemoryCache } from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';

const httpLink = createHttpLink({
    uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

// defaults to the '/graphql' endpoint on same host
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});


// import main app component
import { App } from './components/App';

// import store
import { store } from './redux/helpers';

// import stylesheets
//import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.scss';

ReactDOM.render(
    <Provider store={store}>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </Provider>, 
    document.querySelector("#root")
);