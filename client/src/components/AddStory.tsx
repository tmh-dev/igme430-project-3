import * as React from "react";
import { Mutation } from 'react-apollo';

import { ADD_STORY_MUTATION } from '../mutations';

interface IProps {
    boardId: string;
    refresh: any;
}

interface IState {
    title: string;
    status: string;
    description: string;
}

export default class AddStory extends React.Component<IProps, IState> {
    state: IState = {
        title: "",
        status: "",
        description: "",
    };

    private handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.getAttribute('id')) {
            case 'inputTitle':
                this.setState({ title: e.target.value });
                break;
            case 'inputDescription':
                this.setState({ description: e.target.value });
                break;
        }
    }

    // TODO: Add coniditional rendering
    private handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>, addStory: any): Promise<any> => {
        e.preventDefault();
        const { title, description } = this.state;
        const { boardId } = this.props;

        if (!title || !description) {
            console.log("All fields are required");
        }

        addStory({
            variables: {
                title,
                description,
                boardId,
            },
        });
        this.props.refresh();
    }

    render() {
        const { title, description } = this.state;

        return (
            <div className="container">
                <Mutation mutation={ADD_STORY_MUTATION}>
                {(addStory) => (
                        <form onSubmit={e => this.handleFormSubmit(e, addStory)}>
                            <h3 className="text-center">Make New Story</h3>
                            <div className="form-group">
                                <label htmlFor="inputTitle">Title</label>
                                <input type="text" className="form-control" id="inputTitle" aria-describedby="titleHelp"
                                    placeholder="Enter title" onChange={this.handleOnChange} value={title} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputDescription">Description</label>
                                <input type="text" className="form-control" id="inputDescription" placeholder="Enter description"
                                    onChange={this.handleOnChange} value={description} />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form >
                )}
                </Mutation>
            </div>
        );
    }
}
