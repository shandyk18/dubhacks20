import React, {useState, useEffect} from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TopBar from '../TopBar';
import axios from 'axios';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

function ResultsPage() {
    const classes = useStyles();
    var url = window.location.href;
    var surveyId = url.substr(url.lastIndexOf('/') + 1);
    const [department, setDepartment] = useState();
    const [instructor, setInstructor] = useState();
    const [course, setCourse] = useState();
    const [q1, setQ1] = useState([]);
    const [q2, setQ2] = useState([]);
    const [comments, setComments] = useState([]);

    const data1 = [
        {
            "name": "Yes",
            "response": q1[0],
        },
        {
            "name": "No",
            "response": q1[1],
        },
    ]

    const data2 = [
        {
            "name": "1",
            "inclusivity rating": q2[0],
        },
        {
            "name": "2",
            "inclusivity rating": q2[1],
        },
        {
            "name": "3",
            "inclusivity rating": q2[2],
        },
        {
            "name": "4",
            "inclusivity rating": q2[3],
        },
        {
            "name": "5",
            "inclusivity rating": q2[4],
        },
    ]

    const handleChangeDepartment = (event) => {
        setDepartment(event.target.value);
    };

    const handleChangeInstructor = (event) => {
        setInstructor(event.target.value);
    }

    const handleChangeCourse = (event) => {
        setCourse(event.target.value);
    }

    useEffect(() => {
        axios.get(`/getAnswer1/${surveyId}`, {
            params: {
                surveyId: surveyId
            }
        })
        .then(function (response) {
            setQ1([response.data['yes'], response.data['no']])
            console.log(surveyId)
        })

        axios.get(`http://localhost:5000/getAnswer2/${surveyId}`, {
            params: {
                surveyId: surveyId
            }
        })
        .then(function (response) {
            setQ2([response.data['1'], response.data['2'], response.data['3'], response.data['4'], response.data['5']])
        })

        axios.get(`/getAnswer2/${surveyId}`, {
            params: {
                surveyId: surveyId
            }
        })
        .then(function (response) {
            setQ2([response.data['1'], response.data['2'], response.data['3'], response.data['4'], response.data['5']])
        })
    }, []);

    return (
        <div>
            <TopBar />
            <Box m={10}>
                <div className={classes.root}>
                    <Grid container spacing={2}>
                        <Grid item md={4}>
                            <Typography variant='h3'>
                                Filters
                        </Typography>
                            <br />
                            <FormControl className={classes.formControl}>
                                <Typography variant='h5'>
                                    Department
                            </Typography>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={department}
                                    onChange={handleChangeDepartment}
                                >
                                    <MenuItem value={'Computer Science'}>Computer Science</MenuItem>
                                    <MenuItem value={'International Studies'}>International Studies</MenuItem>
                                </Select>
                                <br />
                                <Typography variant='h5'>
                                    Instructor
                            </Typography>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={instructor}
                                    onChange={handleChangeInstructor}
                                >
                                    <MenuItem value={123}>Julia Kim</MenuItem>
                                    <MenuItem value={456}>Jeremy Chen</MenuItem>
                                    <MenuItem value={789}>Eric Yeh</MenuItem>
                                    <MenuItem value={111}>Jonathan Chen</MenuItem>
                                </Select>
                                <br />
                                <Typography variant='h5'>
                                    Course
                            </Typography>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={course}
                                    onChange={handleChangeCourse}
                                >
                                    <MenuItem value={'CSE 461'}>CSE 461</MenuItem>
                                    <MenuItem value={'CSE 451'}>CSE 451</MenuItem>
                                </Select>
                                <br />
                                <Button
                                    variant="contained"
                                    onClick={() => { console.log('submitted'); }}
                                >
                                    Submit
                            </Button>
                            </FormControl>
                        </Grid>
                        <Grid item md={8}>
                            <Typography variant='h4'>
                                Discrimination or Uncomfortable in Class
                            </Typography>
                            <br />
                            <BarChart width={730} height={250} data={data1}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="response" fill="#82ca9d" />
                            </BarChart>
                            <Typography variant='h4'>
                                Overall Feelings of Class's Inclusivity Policies
                            </Typography>
                            <br />
                            <BarChart width={730} height={250} data={data2}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="inclusivity rating" fill="#82ca9d" />
                            </BarChart>
                        </Grid>
                    </Grid>
                </div>
            </Box>
        </div>
    );
}

export default ResultsPage;
