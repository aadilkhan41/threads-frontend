import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './utils/theme.js';
import Routes from './utils/router.jsx';
import "./index.css";
import { RecoilRoot } from 'recoil';

ReactDOM.createRoot(document.getElementById('root')).render(
    <RecoilRoot>
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Routes />
        </ChakraProvider>
    </RecoilRoot>
);