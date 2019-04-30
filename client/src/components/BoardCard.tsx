import * as React from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import { DELETE_BOARD_MUTATION } from '../mutations';
import { GET_BOARDS_QUERY } from '../queries';

export interface IProps {
    title: string, 
    id: string,
    refresh: any;
};

export default class BoardCard extends React.Component<IProps> {
    state = {
        ownerId: "",
    }
    constructor(props: any) {
        super(props);

        const user = JSON.parse(localStorage.getItem('user'));
        this.setState({ownerId: user.id});
    }

    render() {
        const { title, id } = this.props;
        return (
            <div className="col-sm-3">
                <div className="card" style={{ width: "12rem" }}>
                    <img className="card-img-top" src="..." alt="card top" />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <Link className="btn btn-primary" to={{
                            pathname: "/storyboard",
                            state: {
                                boardId: id,
                            }
                        }}>Open</Link>
                        <Mutation mutation={DELETE_BOARD_MUTATION}>
                            {(deleteBoard) => (
                                <input className="btn btn-danger" type="button" value="Delete" onClick={e => {
                                    e.preventDefault();
                                    deleteBoard({
                                        variables: {
                                            id,
                                        },
                                    });
                                    this.props.refresh();
                                }} />
                            )}
                        </Mutation>
                    </div>
                </div>
            </div>
        );
    }
}
