import * as React from 'react';
import { Route, Router } from 'react-router-dom';
import { connect } from 'react-redux';


// import components
import { Landing } from './Landing';
import { Pricing } from './Pricing';
import { Login } from './Login';
import { Signup } from './Signup';
import { Navbar } from './Navbar';
import StoryBoard from './StoryBoard';
import Settings from './Settings';
import UserPage from './UserPage';

// import redux functionality
import { history } from '../redux/helpers';
import { alertActions } from '../redux/actions';
import { PrivateRoute } from '../redux/components/PrivateRoute';
import { PublicOnlyRoute } from '../redux/components/PublicOnlyRoute';

class App extends React.Component<any> {
    constructor(props: any) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    public render() {
        const { alert, dispatch } = this.props;

        return (
            <Router history={history}>
                <Navbar />
                <div>
                    <Route exact path="/" component={Landing} />
                    <Route path="/pricing" component={Pricing} />
                    <PrivateRoute path="/home" component={UserPage} />
                    <PublicOnlyRoute path="/login" component={Login} />
                    <PublicOnlyRoute path="/signup" component={Signup} />
                    <PrivateRoute path="/storyboard" component={StoryBoard} />
                    <PrivateRoute path="/settings" component={Settings} />
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state: any) => {
    const { alert } = state;
    return {
        alert,
    };
};

const connectedApp = connect(mapStateToProps)(App);

export { connectedApp as App }