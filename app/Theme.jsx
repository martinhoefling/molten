import React from 'react';
import { white } from 'material-ui/styles/colors';
import Spacing from 'material-ui/styles/spacing';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default props => {
    const theme = getMuiTheme({
        spacing: Spacing,
        fontFamily: 'Roboto, sans-serif',
        palette: {
            primary1Color: '#27586B',
            primary2Color: '#457485',
            primary3Color: '#022735',
            accent1Color: '#679933',
            accent2Color: '#90BF60',
            accent3Color: '#274D00',
            textColor: 'rgba(0, 0, 0, 0.87)',
            alternateTextColor: white,
            borderColor: '#e0e0e0',
            disabledColor: 'rgba(0,0,0,0.3)',
            canvasColor: white
        }
    });

    return (
        <MuiThemeProvider muiTheme={theme}>
            {props.children}
        </MuiThemeProvider>
    );
};
