import * as React from "react";

export const Pricing = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-6">
                    <h2>Free</h2>
                    <ul className="list-group">
                        <li className="list-group-item">Unlimited Boards</li>
                        <li className="list-group-item">Unlimited Tasks</li>
                    </ul>
                </div>
                <div className="col-sm-6">
                    <h2>Premium ($15/year)</h2>
                    <ul className="list-group">
                        <li className="list-group-item">Unlimited Boards</li>
                        <li className="list-group-item">Unlimited Tasks</li>
                        <li className="list-group-item list-group-item-primary">Team Boards</li>
                        <li className="list-group-item list-group-item-primary">Custom Board Styling</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};