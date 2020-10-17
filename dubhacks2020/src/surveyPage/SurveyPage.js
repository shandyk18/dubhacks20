import React from 'react';
import './SurveyPage.css';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Rating from '@material-ui/lab/Rating';
import TextField from '@material-ui/core/TextField';




class SurveyPage extends React.Component {
    constructor(props) {
        super(props);
        var today = new Date();
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var monthName = monthNames[today.getMonth()];
        var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        var date = dayNames[today.getDay()] + ' ' + monthName + ' ' + today.getDate() + ', ' + today.getFullYear();
        this.state = {
            comments: "",
            currentDate: date,
            answer1: "",
            answer2: 0
        }
    }

    handleChange1 = (event) => {
        console.log(this.state.answer1);

        this.setState({ answer1: event.target.value });
        console.log(this.state.answer1);
    };

    handleChange2 = (event) => {
        console.log(this.state.answer2);
        console.log(event.target.value);

        this.setState({ answer2: event.target.value });
    };

    render() {
        return (
            <div>
                <Box className="surveyTop">inclusivity indicator</Box>
                <Box className="surveyContent">
                    <Box fontWeight="fontWeightBold" fontSize={40}>
                        Title FirstName LastName
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
                        <Rating name="customized-10" defaultValue={2} max={5} size="large" />
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
                        style = {{width: 600}}
                    />
                </Box>

            </div>
        )
    }
}

export default SurveyPage;