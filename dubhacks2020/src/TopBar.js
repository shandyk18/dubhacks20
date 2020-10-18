import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const divStyle = {
  backgroundColor: '#7CD7D1',
  width: '100%',
  paddingTop: '15px',
  paddingLeft: '5px',
  paddingBottom: '15px'
};

const Top = () => (
  <div style={divStyle}>
        <Box ml={2}>
            <Typography variant='h6'>
                inclusivity indicator
            </Typography>
        </Box>
  </div>
);

export default Top;