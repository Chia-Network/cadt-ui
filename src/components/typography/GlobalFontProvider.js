import { createGlobalStyle } from 'styled-components';

import NunitoSansRegular from '../../assets/fonts/NunitoSans-Regular.ttf';

const GlobalFontProvider = createGlobalStyle`
    @font-face {
        font-family: 'NunitoSans';
        src: url(${NunitoSansRegular}) format('truetype');
        font-weight: 300;
        font-style: normal;
        font-display: auto;
    }
`;

export { GlobalFontProvider };
