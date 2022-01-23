import { createTheme } from '@mui/material/styles';

//Light Theme
let background = '#cfcfe0';
let primary = '#313131';
let primaryContrastText = '#ffffff';
let secondary = '#6d6d6d';
let secondaryContrastText = '#fafafa';
let primaryText = '#3D3D3D';
let secondaryText = '#575757';
let disabledText = '#858585';
let paperBackground = '#ffffff';

const appTheme = createTheme({
    typography: {
        fontFamily: ['Quicksand', 'Calibri', 'sans-serif'].join(','),
        caption: {
            fontWeight: 400,
            fontSize: 14,
        },
        fontWeightRegular: 400,
        fontWeightBold: 600,
        h1: {
            fontWeight: 600,
            fontSize: 28,
        },
        h2: {
            fontWeight: 600,
            fontSize: 23,
        },
        h3: {
            fontWeight: 600,
            fontSize: 20,
        },
        h4: {
            fontWeight: 600,
            fontSize: 18,
        },
        h5: {
            fontWeight: 600,
            fontSize: 18,
        },
        h6: {
            fontWeight: 600,
            fontSize: 16,
        },
        body1: {
            fontWeight: 500,
            fontSize: 16,
        },
        body2: {
            fontWeight: 500,
            fontSize: 16,
        },
    },
    palette: {
        background: {
            default: background,
            paper: paperBackground,
        },
        primary: {
            main: primary,
            contrastText: primaryContrastText,
        },
        secondary: {
            main: secondary,
            contrastText: secondaryContrastText,
        },
        text: {
            primary: primaryText,
            secondary: secondaryText,
            disabled: disabledText,
        },
    },
    components: {}
});

export default appTheme;