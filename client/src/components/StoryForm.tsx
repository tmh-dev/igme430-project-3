import * as React from "react";
import axios from "axios";
import { stringify } from "query-string";

export interface IProps {
    getStories: any;
    _csrf: string;
}

export interface IState {
    title: string;
    description: string;
}

export default class StoryForm extends React.Component<IProps, IState> {
    state: IState = {
        title: "",
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
    private handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<any> => {
        e.preventDefault();
        const { title, description } = this.state;
        const { _csrf } = this.props;

        if (!title || !description) {
            console.log("All fields are required");
        }

        const data = {
            title,
            description,
            status: "Ice Box",
            _csrf,
        };

        try {
            const response = await axios({
                method: 'post',
                url: '/api/makeStory',
                data: stringify(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
            });
            console.log(response)
        } catch (err) {
            console.log(err);
        }

        // rerender parent component
        this.props.getStories();
    }

    render() {
        const { title, description } = this.state;

        return (
            <div className="container">
                <form onSubmit={ this.handleFormSubmit }>
                    <h3 className="text-center">Make New Story</h3>
                    <div className="form-group">
                        <label htmlFor="inputTitle">Title</label>
                        <input type="text" className="form-control" id="inputTitle" aria-describedby="titleHelp" 
                        placeholder="Enter title" onChange={this.handleOnChange} value={ title }/>       
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputDescription">Description</label>
                        <input type="text" className="form-control" id="inputDescription" placeholder="Enter description" 
                        onChange={this.handleOnChange} value={ description } />
                    </div>
                    <input type="hidden" name="_csrf" value={ "" } />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form >
            </div>
        );
    }
}