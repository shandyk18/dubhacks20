import React, {useState} from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

function ResultsPage() {
    const classes = useStyles();
    const [department, setDepartment] = useState();
    const [instructor, setInstructor] = useState();
    const [course, setCourse] = useState();

    const handleChangeDepartment = (event) => {
        setDepartment(event.target.value);
    };

    const handleChangeInstructor = (event) => {
        setInstructor(event.target.value);
    }

    const handleChangeCourse = (event) => {
        setCourse(event.target.value);
    }

    return (
        <Box m={10}>
            <div className={classes.root}>
                <Grid container spacing={4}>
                    <Grid item xs>
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
                                autowidth
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
                            <Button variant="contained">Submit</Button>
                        </FormControl>
                        <br />
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant='h5'>
                            see pretty charts here
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        </Box>
    );
}

export default ResultsPage;
