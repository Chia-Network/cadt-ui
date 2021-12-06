import { createGlobalStyle } from 'styled-components';

import NunitoSansRegular from '../../assets/fonts/NunitoSans-Regular.ttf';
import NunitoSansBold from '../../assets/fonts/NunitoSans-Bold.ttf';
import NunitoSansExtraBold from '../../assets/fonts/NunitoSans-ExtraBold.ttf';
import NunitoSansSemiBold from '../../assets/fonts/NunitoSans-SemiBold.ttf';
import NunitoSansLight from '../../assets/fonts/NunitoSans-Light.ttf';

const GlobalFontProvider = createGlobalStyle`
    @font-face {
        font-family: 'NunitoSans';
        src: url(${NunitoSansRegular}) format('truetype');
        font-weight: 400;
        font-style: normal;
        font-display: auto;
    }

    @font-face {
        font-family: 'NunitoSansBold';
        src: url(${NunitoSansBold}) format('truetype');
        font-weight: 700;
        font-style: normal;
        font-display: auto;
    }

    @font-face {
        font-family: 'NunitoSansExtraBold';
        src: url(${NunitoSansExtraBold}) format('truetype');
        font-weight: 800;
        font-style: normal;
        font-display: auto;
    }

    @font-face {
        font-family: 'NunitoSansSemiBold';
        src: url(${NunitoSansSemiBold}) format('truetype');
        font-weight: 600;
        font-style: normal;
        font-display: auto;
    }

    @font-face {
        font-family: 'NunitoSansLight';
        src: url(${NunitoSansLight}) format('truetype');
        font-weight: 300;
        font-style: normal;
        font-display: auto;
    }
`;

export { GlobalFontProvider };
