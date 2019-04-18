import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './alert.actions';
import { history } from '../helpers';

const signup = (email: string, password1: string, password2: string) => {

    const request = (user: object) => { return { type: userConstants.SIGNUP_REQUEST, user } };
    const success = (user: object) => { return { type: userConstants.SIGNUP_SUCCESS, user } };
    const failure = (error: object) => { return { type: userConstants.SIGNUP_FAILURE, error } };

    return (dispatch: any) => {
        dispatch(request({ email }));

        userService.signup(email, password1, password2)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
}

const login = (email: string, password: string) => {

    const request = (user: object) => { return { type: userConstants.LOGIN_REQUEST, user } };
    const success = (user: object) => { return { type: userConstants.LOGIN_SUCCESS, user } };
    const failure = (error: object) => { return { type: userConstants.LOGIN_FAILURE, error } };
    
    return (dispatch: any) => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
}

const logout = () => {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

export const userActions = {
    signup,
    login, 
    logout,
};