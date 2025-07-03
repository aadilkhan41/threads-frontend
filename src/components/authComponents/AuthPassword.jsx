import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";

const AuthPassword = ({ register }) => {

    const [showPassword, setShowPasword] = useState(true);

    return (
        <Box>
            <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={showPassword ? "password" : "text"}
                        borderColor={useColorModeValue("gray.400")}
                        variant={useColorModeValue("outline", "filled")}
                        focusBorderColor={useColorModeValue("gray.600", "teal.400")}
                        {...register("Password")}
                    />
                    <InputRightElement>
                        <Button variant="ghost" onClick={() => setShowPasword(!showPassword)}>
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
        </Box>
    );
};

export default AuthPassword;
