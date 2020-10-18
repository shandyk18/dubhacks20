import React, { Component } from 'react';
import './Home.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <Grid className="centered-box" container alignItems="center" justify="center" >
                    <Grid container item xs={5} />
                    <Grid className="enter-survey-box" container item xs={2} >
                        <h3>Enter Survey</h3>
                        <TextField
                            id="survey-id-input"
                            label="Survey Id"
                            type="surveyId"
                            variant="outlined">
                        </TextField>
                        <Button variant="contained" color="primary">
                            Join
                        </Button>
                    </Grid>
                    <Grid container item xs={5} />
                </Grid>
            </div>
        );
    }
}

export default Home;
