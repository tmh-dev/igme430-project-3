import * as React from "react";
import { Query } from 'react-apollo';

import AddStory from "./AddStory";
import Story from './Story';

import { GET_BOARD_QUERY } from '../queries';

export default class StoryBoard extends React.Component<any> {
    state = {
        refresh: false,
    }
    private createGroup = (stories: any) => {
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
                const { title, status, description, id } = stories.shift();
                cols.push(<Story refresh={this.refresh}title={title} status={"test"} description={description} id={id}/>);
            }
            // create row and add cols
            group.push(<div className="row">{ cols }</div>);
        }
        
        return group;
    }

    private refresh = () => {
        this.setState({refresh: !this.state.refresh});
    }

    public render() {
        const { boardId } = this.props.location.state;

        return (
            <div>
                <AddStory refresh={this.refresh} boardId={boardId} />
                <div className="container">
                    <Query query={GET_BOARD_QUERY} variables={{ boardId }}>
                        {({loading, error, data}) => {
                            if (loading) return "Loading...";
                            if (error) return `Error! ${error.message}`;
                            return this.createGroup(data.board.stories);
                        }}
                    </Query>
                </div>
            </div>
        );
    }
}