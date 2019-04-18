import { boardConstants } from '../constants';

const getBoards = () => {

    const request = (user: object) => { return { type: boardConstants.READ_REQUEST, user } };
    const success = (user: object) => { return { type: boardConstants.READ_SUCCESS, user } };
    const failure = (error: object) => { return { type: boardConstants.READ_FAILURE, error } };

    return (dispatch: any) => {
        dispatch(request({}));

        
    }

}