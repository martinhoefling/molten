import Colors from 'material-ui/lib/styles/colors';
import Spacing from 'material-ui/lib/styles/spacing';
import ThemeManager from 'material-ui/lib/styles/theme-manager';

export default ThemeManager.getMuiTheme({
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
        alternateTextColor: Colors.white,
        borderColor: '#e0e0e0',
        disabledColor: 'rgba(0,0,0,0.3)',
        canvasColor: Colors.white
    }
});
