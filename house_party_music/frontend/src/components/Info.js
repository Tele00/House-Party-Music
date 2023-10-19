import React, { useState, useEffect } from "react";
import { Grid, Button, Typography, IconButton } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link } from "react-router-dom";

const pages = {
    JOIN: 'pages.join',
    CREATE: 'pages.create'
};

export default function Info(props) {
    const [page, setPage] = useState(pages.JOIN)

    function joinInfo() {
        return ("House Party Music allows multiple users to be able to control the music during a party. The host of the party needs to create a room and then give guests the code to join the room. Depending on the settings/permissions that the host gives, guests can play/pause songs and change songs. The host can also make guests vote to skip a song, so the song would only skip when a certain number of votes is reached."
        );
    }

    function createInfo() {
        return "House Party music uses the Spotify API. Hosts need to have a Spotify premium account for the app to work properly. Hosts first need to start playing music from their spotify app then it'll show up on House Party Music and then everyone can control from there! With House Party Music, you can now let your guest easily control the songs thus making your party more fun! Enjoy!";
    }

    return (
        <Grid container spacing={1}>
            <Grid item sm={12} align="center">
                <Typography component="h4" variant="h4">
                    What Is House Party Music?
                </Typography>
            </Grid>
            <Grid item sm={12} align="center">
                <Typography variant="body1">
                    { page === pages.JOIN ? joinInfo() : createInfo()}
                </Typography>
            </Grid>
            <Grid item sm={12} align="center">
                <IconButton onClick={() => {page === pages.CREATE ? setPage(pages.JOIN): setPage(pages.CREATE)}}>
                    {page === pages.CREATE ? (<NavigateBeforeIcon/>): (<NavigateNextIcon/>)}
                </IconButton>
            </Grid>
            <Grid item sm={12} align="center">
                <Button color="secondary" variant="contained" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
    )
}
