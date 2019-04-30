import * as React from 'react';
import { Mutation } from 'react-apollo';

import { DELETE_STORY_MUTATION } from '../mutations';
import { UPDATE_STORY_MUTATION } from '../mutations';

export interface IProps {
    title: String;
    description: String;
    status: String;
    id: String;
    refresh: any;
}

export interface IState {
    title: string,
    description: string,
    status: string,
    editingModeOn: boolean,
}

export default class Story extends React.Component<IProps, IState> {
    state: IState = {
        title: "",
        description: "",
        status: "",
        editingModeOn: false,
    };

    private handleClick = async (e: React.FormEvent<HTMLButtonElement>, deleteStory: any): Promise<any> => {
        const { id } = this.props;

        await deleteStory({
            variables: {
                id,
            },
        });

        this.props.refresh();
    }

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

    private handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>, updateStory: any): Promise<any> => {
        e.preventDefault();
        const { title, status, description } = this.state;
        const { id } = this.props;
        console.log(description);
        updateStory({
            variables: {
                title,
                description,
                status,
                id,
            },
        });
        this.props.refresh();
    }

    private toggleEditingMode = () => {
        const { editingModeOn } = this.state;

        if (editingModeOn) {
            return (
                <div className="card-body">
                    <Mutation mutation={UPDATE_STORY_MUTATION}>
                        {(updateStory) => (
                            <form onSubmit={e => this.handleFormSubmit(e, updateStory)} >
                                <div className="form-group">
                                    <label htmlFor="inputTitle">Title</label>
                                    <input type="text" className="form-control" id="inputTitle" aria-describedby="titleHelp"
                                        placeholder="Enter title" onChange={this.handleOnChange} value={this.state.title} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputDescription">Description</label>
                                    <input type="text" className="form-control" id="inputDescription" placeholder="Enter description"
                                        onChange={this.handleOnChange} value={this.state.description} />
                                </div>
                                <button type="submit" className="btn btn-primary">Update</button>
                                <input className="btn btn-warning" type="button" value="Cancel" onClick={e => this.setState({
                                    editingModeOn: false,
                                    title: "",
                                    status: "",
                                    description: "",
                                    })} />
                            </form>
                        )}
                    </Mutation>
                </div>
            );
        } else {
            return (
                <div className="card-body">
                    <h4 className="card-title">{this.props.title}</h4>
                    <h5 className="card-subtitle mb-1 text-muted">{status}</h5>
                    <p className="card-text">{this.props.description}</p>
                    <Mutation mutation={DELETE_STORY_MUTATION}>
                        {(deleteStory) => (
                            <input className="btn btn-danger" type="button" value="Delete" onClick={e => this.handleClick(e, deleteStory)} />
                        )}
                    </Mutation>
                    <input className="btn btn-warning" type="button" value="Edit" onClick={e => this.setState({editingModeOn: true})} />
                </div>
            );
        }
    }
    
    public render() {
        return (
            <div className="col-sm-4">
                <div className="card">
                    {this.toggleEditingMode()}
                </div>
            </div>
        );
    }
}

