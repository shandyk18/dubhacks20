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
    return (
        <div style={divStyle}>
            <Box ml={2}>
                <Typography variant='h6'>
                    inclusivity indicator
            </Typography>
            </Box>
        </div>
    );

}

export default Top;
