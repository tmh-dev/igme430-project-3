import * as React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions';

export interface IState {
    email: string;
    password1: string;
    password2: string;
}

class Signup extends React.Component<any, IState> {
    state: IState = {
        email: '',
        password1: '',
        password2: '',
    };

    private handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        switch (e.target.getAttribute('id')) {
            case 'inputEmail':
                this.setState({ email: e.target.value });
                break;
            case 'inputPassword1':
                this.setState({ password1: e.target.value });
                break;
            case 'inputPassword2':
                this.setState({ password2: e.target.value });
                break;
        }
    }

    private handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<any> => {
        e.preventDefault();

        const { email, password1, password2 } = this.state;
        const { dispatch } = this.props;
    
        if (!email || !password1 || !password2) {
            console.log(`All fields required.`);
        } else if (password1 !== password2) {
            console.log(`Passwords must match.`);
        } else {
            dispatch(userActions.signup(email, password1, password2));
        }

    }

    public render() {
        const { email, password1, password2 } = this.state;

        return (
            <div className="container">
                <form onSubmit={ this.handleFormSubmit }>
                    <h3 className="text-center">Signup</h3>
                    <div className="form-group">
                        <label htmlFor="inputEmail">Email address</label>
                        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" 
                        placeholder="Enter email" onChange={ this.handleOnChange } value={ email }/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>             
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword1">Password</label>
                        <input type="password" className="form-control" id="inputPassword1" placeholder="Password" 
                        onChange={ this.handleOnChange } value={ password1 } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword2">Confirm Password</label>
                        <input type="password" className="form-control" id="inputPassword2" placeholder="Confirm Password" 
                        onChange={ this.handleOnChange } value={ password2 } />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form >
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

const connectedSignup = connect(mapStateToProps)(Signup);
export { connectedSignup as Signup };