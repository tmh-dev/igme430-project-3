import { gql } from 'apollo-boost';

// gets all boards from user
const GET_BOARDS_QUERY = gql`
    query boards($ownerId: ID!) {
        boards(ownerId: $ownerId) {
            title,
            id
        }
    }
`;

// gets a single board from user
const GET_BOARD_QUERY = gql`
    query Board($boardId: ID!) {
        board(id: $boardId) {
            title,
            stories {
                title,
                description,
                id
            }
        }
    }
`;

export { 
    GET_BOARDS_QUERY, 
    GET_BOARD_QUERY 
};