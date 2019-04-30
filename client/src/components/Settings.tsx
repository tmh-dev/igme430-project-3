import * as React from 'react';
import axios from 'axios';
import { stringify } from 'query-string'

export interface IState {
    password1: string,
    password2: string,
}

export default class Login extends React.Component<{}, IState> {
    state: IState = {
        password1: '',
        password2: '',
    };

    private handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        switch (e.target.getAttribute('id')) {
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
        const { password1, password2 } = this.state;
        
        if (!password1 || !password2) {
            console.log("All fields are required");
        }
        
        if (password1 !== password2) {
            console.log("Passwords must match");
        }
        const user = JSON.parse(localStorage.getItem('user'));

        const data = {
            pass1: password1,
            pass2: password2,
            id: user.id,
        };

        try {
            const response = await axios({
                method: 'post',
                url: '/api/changePassword',
                data: stringify(data),
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded;charset=utf-8',
                    'authorization': `Bearer ${user.token}`,
                },
            });
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

    public render() {
        const { password1, password2 } = this.state;

        return (
            <div className="container">
                    <form onSubmit={ this.handleFormSubmit }>
                        <h3 className="text-center">Change Password</h3>
                        <div className="form-group">
                            <label htmlFor="inputPassword1">New Password</label>
                            <input type="password" className="form-control" id="inputPassword1" placeholder="New Password" 
                            onChange={ this.handleOnChange } value={ password1 } />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword2">Confirm New Password</label>
                            <input type="password" className="form-control" id="inputPassword2" placeholder="Confirm New Password" 
                            onChange={ this.handleOnChange } value={ password2 } />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
            </div>
        );
    }
}