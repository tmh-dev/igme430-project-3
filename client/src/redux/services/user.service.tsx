//import config from 'config';
import { authHeader } from '../helpers';
import axios from 'axios';
import { stringify } from 'query-string';

const signup = async (email: string, password1: string, password2: string) => {
    const requestData = {
        email,
        pass1: password1,
        pass2: password2,
    };

    let user = {};

    try {
        const response = await axios({
            method: 'post',
            url: '/api/signup',
            data: stringify(requestData),
            headers: {
                'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
            },
        });
        user = {
            email,
            token: response.data.token
        }
        // add user to local storage to sign in
        localStorage.setItem('user', JSON.stringify(user));
    } catch(err) {
        console.log(err.message);
    }
    return user;
}

const login = async (email: string, password: string) => {
    const requestData = {
        email,
        password,
    };


    let user = {};

    try {
        const response = await axios({
            method: 'post',
            url: '/api/login',
            data: stringify(requestData),
            headers: {
                'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
            },
        });
        user = {
            email,
            token: response.data.token
        }
        // add user to local storage to sign in
        localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
        console.log(err);
    }
    return user;
}

const logout = () => {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

export const userService = {
    signup,
    login, 
    logout,
};

