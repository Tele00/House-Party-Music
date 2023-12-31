import React, { Component } from 'react';
import JoinRoomPage from './JoinRoomPage';
import CreateRoomPage from './CreateRoomPage'; 
import Room from './Room';
import { BrowserRouter } from 'react-router-dom';
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Info from "./Info";

export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            roomCode: null,
        }
        this.clearRoomCode = this.clearRoomCode.bind(this);
    } 

    async componentDidMount() {
        fetch('/api/user-in-room')
        .then(response => response.json())
        .then(data => {
            this.setState({
                roomCode: data.code
            });
        });
    }

    clearRoomCode() {
        this.setState({
            roomCode: null,       
        });
    }

    renderHomePage() {
        return (
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} align="center">
                    <Typography variant="h3" component="h3">
                        House Party Music
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" to="/join" component={Link}>
                            Join a Room
                        </Button>
                        <Button color="default" to="/info" component={Link}>
                            Info
                        </Button>
                        <Button color="secondary" to="/create" component={Link}>
                            Create a Room
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    }

    render () {
         return (
             <Router>
                 <Switch>
                     <Route exact path="/" render={ () => {
                         return this.state.roomCode ? (<Redirect to={`/room/${this.state.roomCode}`} />) : this.renderHomePage()
                     }} />
                     <Route path="/join" component={JoinRoomPage} />
                     <Route path="/info" component={Info} />
                     <Route path="/create" component={CreateRoomPage} />
                     <Route 
                     path="/room/:code" 
                     render={(props) => {
                         return <Room {...props} leaveRoomCallback={this.clearRoomCode} />;
                     }} />
                 </Switch>
             </Router>
         );
    }
}

