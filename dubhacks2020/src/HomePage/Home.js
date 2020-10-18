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

    const recentSurveys = ["cse143_au20", "cse344_au20", "cse461_au20", "cse351_sp20", "shandyk"];

    function renderRecentSurveys() {
        var list = [];
        recentSurveys.forEach(surveyId => {
            list.push(
                <Button className="recent-survey" variant="contained" text="wow" key={surveyId} onClick={() =>history.push(`/${surveyId}`)}>
                    <b>inclusurvey.com/</b><p>&nbsp;&nbsp;{surveyId}</p>
                </Button>
            )
        });
        return list;
    }
    
    async function onSubmit() {
        if (surveyId) {
            const surveyExists = await axios.get(`http://localhost:5000/surveyId/${surveyId}`);
            if (surveyExists.data) {
                history.push(`/${surveyId}`);
            } else {
                setValidId(false);
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
                    {renderRecentSurveys()}
                </Grid>
                <Grid container item xs={5} />
            </Grid>
        </div>
    );
}

export default Home;
