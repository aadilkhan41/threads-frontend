import { Divider, Flex, Text } from "@chakra-ui/react";
import PostHeader from "./templates/PostHeader";

const Reply = ({ comment, image, username }) => {

    return (
        <Flex flexDirection="column">
            <Divider />
            <PostHeader image={image} comment={comment} username={username} />
            <Flex flexDirection="column" ml={10}>
                <Text mb={3} fontSize={{
                    base: "sm",
                    lg: "md"
                }}>{comment}</Text>
            </Flex>
        </Flex>
    );
};

export default Reply;
