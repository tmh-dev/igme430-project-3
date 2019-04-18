import axios from 'axios';
import { authHeader } from '../helpers';
import { boardConstants } from '../constants';

const getBoards = async () => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/getStories',
            headers: {
                authHeader,
                'Accept': 'application/json',
            },
        });
        
    } catch (err) {
        console.log(err);
    }
}

const deleteBoard = async () => {
    try {
        const response = await axios({
            method: 'delete',
            url: '/api/deleteBoard',
            headers: {
                authHeader,
                'Accept': 'application/json'
            },
        });
    } catch (err) {
        console.log(err);
    }
}




export const boardService = {
    getBoards,
};