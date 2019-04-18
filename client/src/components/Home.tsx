import * as React from 'react';

export const Home = () => {
    return (
        <div className="container">
            <div className="jumbotron">
                <h1 className="display-4">Hello, world!</h1>
                <p className="lead">
                    Welcome to Scrummy, the solution to your agile
                    development needs by enabling you to track and 
                    manage all tasks among your projects
                </p>
                <hr className="my-4"></hr>
                <p>Some additional information about the service here</p>
            </div>
        </div>
    );
};