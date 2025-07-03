import { Heading, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const AuthHeader = ({ header, description }) => {
    return (
        <Flex direction="column" alignItems="center" gap={4}>
            <Heading>{header}</Heading>
            <Text fontSize="lg" color="gray.light">
                {description}
            </Text>
        </Flex>
    )
}

export default AuthHeader