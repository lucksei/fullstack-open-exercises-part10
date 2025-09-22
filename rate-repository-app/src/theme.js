import { Platform } from "react-native";

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
            ios: 'Arimo',
            default: 'System',
        }),
    },
    fontWeights: {
        normal: '400',
        bold: '700',
    },
};

export default theme;