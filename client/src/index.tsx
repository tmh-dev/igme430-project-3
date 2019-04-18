import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// defaults to the '/graphql' endpoint on same host
const client = new ApolloClient();

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