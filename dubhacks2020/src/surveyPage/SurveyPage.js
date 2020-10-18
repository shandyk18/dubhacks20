import React from 'react';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Rating from '@material-ui/lab/Rating';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Top from '../TopBar';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


class SurveyPage extends React.Component {    
    constructor(props) {
        super(props);
        var today = new Date();
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var monthName = monthNames[today.getMonth()];
        var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        var date = dayNames[today.getDay()] + ' ' + monthName + ' ' + today.getDate() + ', ' + today.getFullYear();
        var url = window.location.href;
        var final = url.substr(url.lastIndexOf('/') + 1);
        this.state = {
            comments: "",
            currentDate: date,
            answer1: "",
            answer2: 0,
            surveyId: final
        }
    }

    handleChange1 = (event) => {
        this.setState({ answer1: event.target.value });
    };

    handleChange2 = (event) => {
        this.setState({ answer2: event.target.value });
    };

    handleCommentChange = (event) => {
        this.setState({ comments: event.target.value })
    };

    send = () => {
        const data = {
            surveyId: this.state.surveyId,
            q1: this.state.answer1,
            q2: this.state.answer2,
            comments: this.state.comments
        }
        axios.post('/add-response',
            data,
            { headers: { 'Content-Type': 'application/json' } }
        ).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
        alert("submitted");
    }

    render() {
        return (
            <div>
                <Top />
                <Box paddingTop="15px" paddingLeft="15px">
                    <Box fontWeight="fontWeightBold" fontSize={40}>
                        {this.state.surveyId}
                   </Box>
                    <Box fontSize={30}>
                        {this.state.currentDate}
                    </Box>
                    <Box fontWeight="fontWeightBold" paddingTop="30px" paddingBottom="10px">
                        Have you at any point felt discriminated against or uncomfortable in this class?
                    </Box>
                    <Box>
                        <FormControl style={{ minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-label">Response</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.answer1}
                                onChange={this.handleChange1}
                            >
                                <MenuItem value={1}>Yes</MenuItem>
                                <MenuItem value={2}>No</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box fontWeight="fontWeightBold" paddingTop="30px" paddingBottom="10px">
                        What are your overall feelings of this class's inclusivity policies?
                    </Box>
                    <Box component="fieldset" mb={3} borderColor="transparent">
                        <Rating
                            name="customized-10"
                            defaultValue={0}
                            max={5}
                            size="large"
                            onChange={this.handleChange2} />
                    </Box>

                    <Box fontWeight="fontWeightBold" paddingBottom="10px">
                        Comments
                    </Box>

                    <TextField
                        id="outlined-password-input"
                        label="Comments"
                        type="comments"
                        autoComplete="current-comment"
                        variant="outlined"
                        style={{ width: 600 }}
                        onChange={this.handleCommentChange}
                    />
                </Box>
                <Box paddingLeft="15px" paddingTop="15px">
                    <Button
                        style={{ backgroundColor: "#7CD7D1" }}
                        variant="outlined"
                        onClick={() => { this.send() }}
                    >
                        Submit
                </Button>
                </Box>
            </div>
        )
    }
}

export default SurveyPage;