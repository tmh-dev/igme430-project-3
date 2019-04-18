// import * as React from 'react';
// import BoardCard from './BoardCard';
// import BoardGroup from './BoardGroup';
// import { gql } from 'apollo-boost';
// import { graphql, Query } from 'react-apollo';

// class UserPage extends React.Component {
//     private displayBoards = () => {
//         return (
//             <Query
//                 query={gql`
//               {
//                 boards(ownerId: ${localStorage.getItem('user')}) {
//                   title
//                 }
//               }
//             `}
//             >
//                 {({ loading, error, data }) => {
//                     if (loading) return <p>Loading...</p>;
//                     if (error) return <p>Error :(</p>;

//                     return data.rates.map(({ title }) => (
//                         <div key={title}>
//                             <p>{currency}: {rate}</p>
//                         </div>
//                     ));
//                 }}
//             </Query>
//         );
//     }

//     private createGroup = () => {
//         const { boards } = this.state;
//         // if no cards are passed down
//         if (boards.length <= 0) {
//             return <div>No boards Made</div>;
//         }

//         let group: any = [];
//         let numRows: number = Math.ceil(boards.length / 4);

//         // outer loop to create rows
//         for (let i: number = 0; i < numRows; i++) {
//             let cols = [];
//             // inner loop to create cols 
//             for (let j: number = 0; boards.length > 0 && i < 4; j++) {
//                 const { id } = boards.shift();
//                 cols.push(<BoardCard title={id} text='' link='' id=''/>);
//             }
//             // create row and add cols
//             group.push(<div className="row">{ cols }</div>);
//         }
        
//         return group;
//     }

//     render() {
//         const { boards } = this.state;

//         return (
//             <div className="container">
//                 <h2>Boards:</h2>
//                 <BoardGroup title="main" cards={boards}/>
//             </div>
//         );
//     }
// }