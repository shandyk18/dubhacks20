import React, { useState } from 'react';
import './Home.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TopBar from '../TopBar';
import { useHistory } from 'react-router-dom';
import axios from "axios";


export function Home() {
    const [surveyId, setSurveyId] = useState("");
    const [validId, setValidId] = useState(true);
    const history = useHistory();


    async function onSubmit() {
        // Make API call here to check if surveyId is valid.
        if (surveyId != "") {
            const test = await axios.get(`http://localhost:5000/surveyId/${surveyId}`);
            console.log(test);
            if (true) {
                history.push(`/${surveyId}`)
            }
        }
        
        
    }

    function invalidIdPrompt() {
        if (!validId) {
            return (
                <b style={{color: "red", marginTop: 20}}>Invalid survey id.</b>
            )
        }
    }

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
                        variant="outlined"
                        value={surveyId}
                        onChange={event => setSurveyId(event.target.value)}>
                    </TextField>
                    {invalidIdPrompt()}
                    <Button className="submit-button" variant="contained" color="primary" onClick={onSubmit}>
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

export default Home;
