import * as React from 'react';
import { Link } from "react-router-dom";

export interface IProps {
    title: string, 
    text: string, 
    link: string,
    id: string,
};

const BoardCard: React.FunctionComponent<IProps> = (props) => {
    const { title, text } = props;
    return (
        <div className="col-sm-3">
            <div className="card" style={{ width: "12rem" }}>
                <img className="card-img-top" src="..." alt="card top" />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{text}</p>
                    <Link className="btn btn-primary" to="/storyboard">Open</Link>
                </div>
            </div>
        </div>
    );
};

export default BoardCard;