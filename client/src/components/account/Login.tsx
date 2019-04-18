import * as React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions/user.actions';

export interface IState {
    email: string;
    password: string;
}

class Login extends React.Component<any, IState> {
    state: IState = {
        email: '',
        password: '',
    };

    constructor(props: any) {
        super(props);

        // reset login status 
        this.props.dispatch(userActions.logout());
    }

    private handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        switch (e.target.getAttribute('id')) {
            case 'inputEmail':
                this.setState({ email: e.target.value });
                break;
            case 'inputPassword':
                this.setState({ password: e.target.value });
                break;
        }
    }

    private handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<any> => {
        e.preventDefault();

        const { email, password } = this.state;
        const { dispatch } = this.props;
        
        if (!email || !password) {
            console.log("All fields are required");
        } else {
            dispatch(userActions.login(email, password));
        }
    }

    public render() {
        const { email, password } = this.state;

        return (
            <div className="container">
                <form onSubmit={this.handleFormSubmit}>
                    <h3 className="text-center">Login</h3>
                    <div className="form-group">
                        <label htmlFor="inputEmail">Email address</label>
                        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp"
                            placeholder="Enter email" onChange={this.handleOnChange} value={email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password" className="form-control" id="inputPassword" placeholder="Password"
                            onChange={this.handleOnChange} value={password} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    const { loggingIn } = state.authentication;
    return {
        loggingIn,
    };
};

const connectedLogin = connect(mapStateToProps)(Login);
export { connectedLogin as Login };