import { gql } from 'apollo-boost';

const ADD_STORY_MUTATION = gql`
    mutation addStory($title: String!, $description: String!, $boardId: ID!) {
        addStory(title: $title, description: $description, boardId: $boardId) {
            title,
            description,
            id
        }
    }
`;

const ADD_BOARD_MUTATION = gql`
    mutation AddBoard($title: String!, $ownerId: ID!) {
        addBoard(title: $title, ownerId: $ownerId) {
            title,
            id
        }
    }
`;

const UPDATE_STORY_MUTATION = gql`
    mutation updateStory($title: String, $status: String, $description: String, $id: ID!) {
        updateStory(title: $title, status: $status, description: $description, id: $id) {
            id
        }
    }
`;

const DELETE_STORY_MUTATION = gql`
    mutation deleteStory($id: ID!) {
        deleteStory(id: $id) {
            id
        }
    }
`;

const DELETE_BOARD_MUTATION = gql`
    mutation deleteBoard($id: ID!) {
        deleteBoard(id: $id) {
            id
        }
    }
`;

export {
    ADD_BOARD_MUTATION,
    ADD_STORY_MUTATION,
    UPDATE_STORY_MUTATION,
    DELETE_STORY_MUTATION,
    DELETE_BOARD_MUTATION,
}