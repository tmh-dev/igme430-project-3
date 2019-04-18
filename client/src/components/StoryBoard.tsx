import * as React from "react";
import axios from 'axios';
import StoryForm from "./StoryForm";
import Story from './Story';

export interface IProps {
    _csrf: string;
}

export interface IState {
    stories: any[]
}

export default class StoryBoard extends React.Component<IProps, IState> {
    state: IState = {
        stories: [],
    };

    componentDidMount() {
        this.getStories();
    }

    private getStories = async (): Promise<any> => {
        try {
            const response = await axios({
                method: 'get',
                url: '/api/getStories',
                headers: {
                    'Accept':'application/json'
                }
            });
            this.setState({stories: response.data.stories});
        } catch (err) {
            console.log(err);
        }
    }

    private createGroup = () => {
        const { stories } = this.state;
        // if no cards are passed down
        if (!stories) {
            return <div>No Stories Made</div>;
        }

        let group: any = [];
        let numRows: number = Math.ceil(stories.length / 4);

        // outer loop to create rows
        for (let i: number = 0; i < numRows; i++) {
            let cols = [];
            // inner loop to create cols 
            for (let j: number = 0; stories.length > 0 && i < 4; j++) {
                const { title, status, description } = stories.shift();
                cols.push(<Story title={title} status={status} description={description} getStories={this.getStories} _csrf={this.props._csrf}/>);
            }
            // create row and add cols
            group.push(<div className="row">{ cols }</div>);
        }
        
        return group;
    }

    public render() {
        const { _csrf } = this.props;
        return (
            <div className="container">
                <div className="row">
                    {/* <BoardCategory title="ICE BOX" handleDragOver={this.handleDragOver} handleDrop={this.handleDrop} stories={stories} />
                    <BoardCategory title="EMERGENCY" handleDragOver={this.handleDragOver} handleDrop={this.handleDrop} stories={stories} />
                    <BoardCategory title="IN PROGRESS" handleDragOver={this.handleDragOver} handleDrop={this.handleDrop}/>
                    <BoardCategory title="TESTING" handleDragOver={this.handleDragOver} handleDrop={this.handleDrop}/>
                    <BoardCategory title="COMPLETE" handleDragOver={this.handleDragOver} handleDrop={this.handleDrop}/> */}
                </div>

                <div className="row">
                    <StoryForm _csrf={ _csrf } getStories={this.getStories}/>
                </div>

                {this.createGroup()}
            </div>
        );
    }
}