import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import axios from "axios";


const divStyle = {
    backgroundColor: '#7CD7D1',
    width: '100%',
    paddingTop: '15px',
    paddingLeft: '5px',
    paddingBottom: '15px'
};


export function Top() {
    const [surveyId, setSurveyId] = useState("");
    const [validId, setValidId] = useState(true);
    const history = useHistory();


    async function toResults() {
        if (surveyId) {
            const surveyExists = await axios.get(`/surveyId/${surveyId}`);
            if (surveyExists.data) {
                history.push(`/results/${surveyId}`);
            } else {
                setValidId(false);
            }
        }
    }

    return (
        <div style={divStyle}>
            <Box ml={2}>
                <Typography variant='h6'>
                    inclusivity indicator
            </Typography>
            </Box>
            <TextField
                id="survey-id-input"
                label="Survey Id"
                type="surveyId"
                variant="outlined"
                value={surveyId}
                onChange={event => setSurveyId(event.target.value)}>
            </TextField>
            <Button className="submit-button" variant="contained" color="primary" onClick={toResults}>
                TORES
        </Button>
        </div>
    );

}

export default Top;