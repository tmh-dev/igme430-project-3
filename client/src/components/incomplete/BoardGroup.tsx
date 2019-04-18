import * as React from "react";
import BoardCard from "./BoardCard";

export interface IProps {
    title: string,
    cards: any,
}

export default class BoardGroup extends React.Component<IProps> {
    private createGroup = () => {
        const { cards } = this.props;
        // if no cards are passed down
        if (cards.length <= 0) {
            return <div>No Boards Made</div>;
        }

        let group: any = [];
        let numRows: number = Math.ceil(cards.length / 4);

        // outer loop to create rows
        for (let i: number = 0; i < numRows; i++) {
            let cols = [];
            // inner loop to create cols 
            for (let j: number = 0; cards.length > 0 && i < 4; j++) {
                const { title, text, link, id } = cards.shift();
                cols.push(<BoardCard title="test" text="test" link="..." id="test"></BoardCard>);
            }
            // create row and add cols
            group.push(<div className="row">{ cols }</div>);
        }
        
        return group;
    }

    public render() {
        return (
            <div className="container">{this.createGroup()}</div>
        );
    }
}
