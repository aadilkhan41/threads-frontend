import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Flex justifyContent="center" alignItems="center" pt={10} pb={5}>
            <Text color={useColorModeValue("gray.dark", "gray.light")}>Copyrights &#169; reserved at threads.net 2024</Text>
        </Flex>
    )
}

export default Footer;