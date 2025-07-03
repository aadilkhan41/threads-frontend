import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
    global: (props) => ({
        body: {
            color: mode("gray.800","whiteAlpha.900")(props),
            bg: mode("#ffffffe6","#14171c")(props),
        }
    })
}

const config = {
    initialColorMode: "dark",
    useSystemColorMode: true
};

const colors = {
    gray: {
        light: "#616161",
        dark: "#1e1e1e"
    }
}

const theme = extendTheme({ styles, config, colors });
export default theme;