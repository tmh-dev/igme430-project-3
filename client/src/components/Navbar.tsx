import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../redux/actions';

class Navbar extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    logout = () => {
        this.props.dispatch(userActions.logout());
    }

    conditionalDisplay = () => {
        let jsxElements = [];
        if (localStorage.getItem('user')) {
            jsxElements.push(
                <li className="nav-item">
                    <Link className="nav-link" to="/storyboard">StoryBoard</Link>
                </li>,
                <li className="nav-item">
                    <Link className="nav-link" to="/settings">Settings</Link>
                </li>,
                <li className="nav-item">
                    <button type="button" className="btn btn-secondary my-2 my-sm-0" onClick={this.logout}>Logout</button>
                </li>
            );
        } else {
            jsxElements.push(
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>,
                <li className="nav-item">
                    <Link className="nav-link" to="/signup">Signup</Link>
                </li>
            );
        }
        return jsxElements;
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Scrummy</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" 
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
    
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/pricing">Pricing</Link>
                        </li>
                        {this.conditionalDisplay()}
                    </ul>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state: any) => {
    // const { loggingIn } = state.authentication;
    // return {
    //     loggingIn,
    // };
};

const connectedNavbar = connect(mapStateToProps)(Navbar);
export { connectedNavbar as Navbar };
