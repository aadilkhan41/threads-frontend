import { Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const AuthAsk = ({ques, linkText, link}) => {
  return (
    <Stack pt={6}>
        <Text align="center">
            {ques} <Link to={link}><Text as="span" display="inline-block" color="teal.400">{linkText}</Text></Link>
        </Text>
    </Stack>
  )
}

export default AuthAsk