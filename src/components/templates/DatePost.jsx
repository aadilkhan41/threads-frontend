import { Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";

const DatePost = ({ post }) => {
    if (!Object.keys(post)?.length) {
        return null;
    }

    return (
        <Text color="gray.light" fontSize={{ base: "sm", md: "md" }}>
            {formatDistanceToNow(new Date(post?.createdAt), {
                includeSeconds: true,
                addSuffix: true,
            })}
        </Text>
    );
};

export default DatePost;
