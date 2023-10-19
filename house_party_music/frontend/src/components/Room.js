import React, { Component } from 'react';
import { Grid, Button, Typography } from "@material-ui/core";
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";

export default class Room extends Component {
    constructor(props){
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
            showSettings: false,
            spotifyAuthenticated: false,
            song: {},
        };
        this.leaveButtonClicked = this.leaveButtonClicked.bind(this);
        this.updateShowSettings = this.updateShowSettings.bind(this);
        this.renderSettingsButton = this.renderSettingsButton.bind(this);
        this.renderSettings = this.renderSettings.bind(this);
        this.code = this.props.match.params.code;
        this.getRoomDetails = this.getRoomDetails.bind(this);
        this.authenticateSpotify = this.authenticateSpotify.bind(this);
        this.getCurrentSong = this.getCurrentSong.bind(this);
        this.getRoomDetails();
    }

    
    componentDidMount() {
        this.interval = setInterval(this.getCurrentSong, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    

    getCurrentSong() {
        fetch('/spotify/current-song')
        .then((response) => {
            if(!response.ok) {
               return {};
            } else {
                return response.json();
            }
        }).then((data) => {
            if (data !== {}){
                this.setState({ song: data });
                //console.log(data);
            } else {
                this.setState({ song: {} });
                //console.log(data)
            }
        });
    }

    updateShowSettings(value) {
        this.setState({
            showSettings: value,
        });
    }

    renderSettingsButton() {
        if (this.state.isHost) {
            return (
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="primary" onClick={() => this.updateShowSettings(true)}>
                        Settings
                    </Button>
                </Grid>
            )
        }
    }

    renderSettings() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <CreateRoomPage 
                    update={true} 
                    votesToSkip={this.state.votesToSkip} 
                    guestCanPause={this.state.guestCanPause} 
                    roomCode={this.code} 
                    updateCallback={this.getRoomDetails}>
                    </CreateRoomPage>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" onClick={() => {this.updateShowSettings(false)}}>
                            Close
                    </Button>
                </Grid>
            </Grid>
        );
    }

    getRoomDetails() {
        fetch("/api/get-room" + "?code=" + this.code).then(response => {
            if(!response.ok){
                this.props.leaveRoomCallback()
                this.props.history.push('/')
            }
            return response.json()
        })
        .then(data => {
            this.setState({
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host,
            });
            if (this.state.isHost) {
                this.authenticateSpotify()
            }
        });
    }

    authenticateSpotify() {
        fetch('/spotify/is-authenticated')
        .then(response => response.json())
        .then(data => {
            this.setState({ spotifyAuthenticated: data.status });
            if (!data.status) {
                fetch('/spotify/get-auth-url').then(response => response.json())
                .then(data => {
                    window.location.replace(data.url)
                });
            }
        });
    }

    leaveButtonClicked() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        };

        fetch("/api/leave-room", requestOptions).then(response => {
            this.props.leaveRoomCallback()
            this.props.history.push('/')
        })
    }

    render() {
        if (this.state.showSettings) {
            return this.renderSettings();
        }
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h4" component="h4">
                        Code: {this.code}
                    </Typography>
                </Grid>
                <MusicPlayer {...this.state.song} />
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" onClick={this.leaveButtonClicked}>
                        Leave Room
                    </Button>
                </Grid>
                {this.renderSettingsButton()}
            </Grid>
        );
    }

}
