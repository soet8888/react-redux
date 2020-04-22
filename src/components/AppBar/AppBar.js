import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';

const Topbar = props => {

    return (
        <AppBar
            className='Appbar'
            style={{ backgroundColor: "bluegray" }}
        >
            <Toolbar>
                <RouterLink to="/">
                    <img
                        alt="Logo"
                        src="images/mokkon.png"
                        height="40px"
                    />
                </RouterLink>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
