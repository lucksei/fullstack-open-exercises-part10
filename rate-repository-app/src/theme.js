import { Platform } from "react-native";
import * as Font from "expo-font";

const theme = {
    colors: {
        textPrimary: '#24292e',
        textSecondary: '#586069',
        white: '#ffffff',
        primary: '#0366d6',
        error: '#d73a4a',
        backgroundPrimary: '#dcdcdcff',
        backgroundSecondary: '#24292e',
    },
    fontSizes: {
        body: 14,
        subheading: 16,
    },
    fontFamilies: {
        main: Platform.select({
            android: 'Roboto',
            ios: 'Arial',
            default: 'Sans-Serif',
        }),
    },
    fontWeights: {
        normal: '400',
        bold: '700',
    },
};

export default theme;