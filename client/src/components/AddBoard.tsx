import * as React from 'react';
import { Mutation } from 'react-apollo';

import { ADD_BOARD_MUTATION } from '../mutations';

interface IProps {
    ownerId: any;
    updateStoreAfterAdd: any;
}

export default class AddBoard extends React.Component<IProps,any> {
    state = {
        title: "",
    };

    private handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>, addBoard: any): Promise<any> => {
        e.preventDefault();
        const { title  } = this.state;

        if (!title) {
            console.log("All fields are required");
        }

        await addBoard({
            variables: {
                title,
                ownerId: this.props.ownerId,
            },
        });        
    }

    render() {
        const { title } = this.state;
        const { updateStoreAfterAdd } = this.props;
        return (
            <div className="container">
                <Mutation mutation={ADD_BOARD_MUTATION} update={(store, { data: {addBoard} }) => {
                    console.log(addBoard);
                    updateStoreAfterAdd(store, addBoard);
                }}>
                    {(addBoard) => (
                        <form onSubmit={e => this.handleFormSubmit(e, addBoard)}>
                            <h3 className="text-center">Add Board</h3>
                            <div className="form-group">
                                <label htmlFor="inputTitle">Title</label>
                                <input type="text" className="form-control" id="inputTitle" aria-describedby="titleHelp"
                                    placeholder="Enter title" onChange={e => this.setState({title: e.target.value})} value={title} />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form >
                    )}
                </Mutation>
            </div>
        );
    }
}