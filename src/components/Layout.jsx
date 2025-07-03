import { Box } from "@chakra-ui/react";
import { Navbar, Footer } from ".";

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <Box minH="70vh">
                {children}
            </Box>
            <Footer />
        </>
    )
}

export default Layout;