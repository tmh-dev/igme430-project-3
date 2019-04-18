import * as React from 'react';
import axios from "axios";
import { stringify } from "query-string";

export interface IProps {
    title: String;
    description: String;
    status: String;
    getStories: any;
    _csrf: string;
}

export default class Story extends React.Component<IProps> {
    private handleDragStart = (e: React.DragEvent) => {
        e.preventDefault();
        console.log("drag started")
        //e.dataTransfer.setData("text", this.props._id);
    }

    private deleteStory = async (e: any, title: String): Promise<any> => {
        e.preventDefault();
        const {_csrf} = this.props;
    
        const data = {
            title,
            _csrf,
        };

        try {
            const response = axios({
                method: "delete",
                url: "/api/deleteStory",
                data: stringify(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
            });
            console.log(response);
            console.log('test')
        } catch (err) {
            console.log(err);
        }

        // rerender parent component
        this.props.getStories();
    }

    public render() {
        const { title, status, description } = this.props;

        return (
            <div className="col-sm-4">
                <div className="card" draggable onDragStart={this.handleDragStart}>
                    <div className="card-body">
                        <h4 className="card-title">{title}</h4>
                        {/* <h5 className="card-subtitle mb-1 text-muted">{status}</h5> */}
                        {/* <select className="form-control">
                            <option>Completed</option>
                            <option>In Progress</option>
                            <option>Emergency</option>
                            <option>Ice Box</option>
                        </select> */}
                        <p className="card-test">{description}</p>
                        <input className="btn btn-danger" type="button" value="Delete" onClick={e => this.deleteStory(e, title)} />
                    </div>
                </div>
            </div>
        );
    }
}

