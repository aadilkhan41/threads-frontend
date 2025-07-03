import { Button, Stack, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const AuthButton = ({ text }) => {
    return (
        <Stack spacing={10} pt={4}>
            <Button
                type="submit"
                loadingText="Submitting"
                bg={useColorModeValue("gray.600", "gray.800")}
                color="white"
                _hover={{
                    bg: useColorModeValue("gray.700", "gray.900"),
                }}
            >
                {text}
            </Button>
        </Stack>
    );
};

export default AuthButton;
