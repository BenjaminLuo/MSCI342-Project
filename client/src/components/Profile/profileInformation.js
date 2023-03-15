import React from 'react';
import {
    Typography,
    Container,
    Grid, Avatar
} from '@material-ui/core';

// Left container: User profile information
export function profileInformation(user) {
    return <Grid item xs={3} style={{ position: 'fixed' }}>

        {/* Avatar icon with first 1-2 letters of the name */}
        <Avatar style={{ height: '150px', width: '150px', fontSize: '70px', margin: '40px auto 40px auto' }}>
            {user.display_name.match(/\b(\w)/g).slice(0, 2)}
        </Avatar>

        <Container style={{ marginLeft: '10px' }}>

            <Typography variant="h4" style={{ marginBottom: '8px' }}>
                {user.display_name}
            </Typography>
            <Typography style={{ fontSize: '20px', fontStyle: 'italic', marginBottom: '10px', color: '#333333' }}>
                ID: {user.user_id}
            </Typography>
            <Typography style={{ fontSize: '16px', color: '#333333' }}>
                {user.bio}
            </Typography>

        </Container>

    </Grid>;
}
