import * as React from 'react';
import { Query } from 'react-apollo';

import BoardCard from './BoardCard';
import AddBoard from './AddBoard';
import { GET_BOARDS_QUERY } from '../queries';


let ownerId = "";

class UserPage extends React.Component {
    state = {
        refresh: false,
    }
    constructor(props: any) {
        super(props);
        const user = JSON.parse(localStorage.getItem('user'));
        ownerId = user.id;
        console.log(ownerId);
    }

    refresh = () => {
        this.setState({refresh: !this.state.refresh});
    }

    displayBoards = (boards: any) => {
        // if no boards are passed down
        if (boards.length <= 0) {
            return <div>No boards Made</div>;
        }
    
        let group: any = [];
        let numRows: number = Math.ceil(boards.length / 4);
    
        // outer loop to create rows
        for (let i: number = 0; i < numRows; i++) {
            let cols = [];
            // inner loop to create cols 
            for (let j: number = 0; boards.length > 0 && i < 4; j++) {
                const { title, id } = boards.shift();
                cols.push(<BoardCard refresh={this.refresh} title={title} id={id}/>);
            }
            // create row and add cols
            group.push(<div className="row">{ cols }</div>);
        }
        
        return group;
    }

    updateCacheAfterAdd = (cache: any, board: any) => {
        const { boards } = cache.readQuery({ query: GET_BOARDS_QUERY, variables: {ownerId} });

        cache.writeQuery({
            query: GET_BOARDS_QUERY,
            variables: {ownerId},
            data: {
                boards: boards.concat(board),
            },
        });
    }

    render() {
        return (
            <div>
                <AddBoard updateStoreAfterAdd={this.updateCacheAfterAdd} ownerId={ownerId}/>
                <div className="container">
                    <Query query={GET_BOARDS_QUERY} variables={{ ownerId }}>
                        {({ loading, error, data }) => {
                            if (loading) return "Loading...";
                            if (error) return `Error! ${error.message}`;
                            console.log(data);
                            return this.displayBoards(data.boards);
                        }}
                    </Query>
                </div>
            </div>
        );
    }
}

export default UserPage;