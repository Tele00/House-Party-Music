import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from './HomePage';
import JoinRoomPage from './JoinRoomPage';
import CreateRoomPage from './CreateRoomPage'; 
import { electron } from "webpack";

export default class App extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="center">
                <HomePage />
            </div>
        );
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);