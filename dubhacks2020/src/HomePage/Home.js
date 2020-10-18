import React, { Component } from 'react';
import './Home.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TopBar from '../TopBar';

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <TopBar />
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
                        <Button className="submit-button" variant="contained" color="primary">
                            Join
                        </Button>
                    </Grid>
                    <Grid container item xs={5} />
                </Grid>
                <Grid container alignItems="center" justify="center" >
                    <Grid container item xs={5} />
                    <Grid className="recent-surveys" container item xs={2} >
                        <h3>Recent surveys</h3>
                        <Button className="recent-survey" variant="contained">
                            <b>inclusurvey.com/</b><p>&nbsp;&nbsp;ericyeh</p>
                        </Button>
                        <Button className="recent-survey" variant="contained">
                            <b>inclusurvey.com/</b><p>&nbsp;&nbsp;juliak</p>
                        </Button>
                        <Button className="recent-survey" variant="contained">
                            <b>inclusurvey.com/</b><p>&nbsp;&nbsp;jeremychen</p>
                        </Button>
                        <Button className="recent-survey" variant="contained">
                            <b>inclusurvey.com/</b><p>&nbsp;&nbsp;jonachen</p>
                        </Button>
                        <Button className="recent-survey" variant="contained">
                            <b>inclusurvey.com/</b><p>&nbsp;&nbsp;shandyk</p>
                        </Button>
                    </Grid>
                    <Grid container item xs={5} />
                </Grid>
            </div>
        );
    }
}

export default Home;
