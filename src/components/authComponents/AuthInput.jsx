import { Box, FormControl, FormLabel, Input, useColorModeValue } from '@chakra-ui/react'

const AuthInput = ({ label, type, width, register }) => {
    return (
        <Box>
            <FormControl isRequired>
                <FormLabel>{label}</FormLabel>
                <Input
                    type={type}
                    borderColor={useColorModeValue("gray.400")}
                    variant={useColorModeValue("outline", "filled")}
                    focusBorderColor={useColorModeValue("gray.600", "teal.400")}
                    {...register(label)}
                />
            </FormControl>
        </Box>
    )
}

export default AuthInput