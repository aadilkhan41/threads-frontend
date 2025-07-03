import { Avatar, Box, Text, Flex, Menu, MenuButton, MenuItem, MenuList, useColorMode, useToast } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";

const PostHeader = ({ comment, image, username }) => {

    const { colorMode } = useColorMode();
    const toast = useToast();

    const handleCommentCopy = (comment) => {
        navigator.clipboard.writeText(comment).then(() => {
            toast({
                title: "Copied comment",
                description: "use Ctrl + V to access the comment content",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        })
    }

    return (
        <Flex justifyContent="space-between" mt={5}>
            <Flex alignItems="start" gap={1}>
                <Avatar src={image} size="sm" mr={1.5} />
                <Text fontSize="sm" fontWeight="bold">{username}</Text>
            </Flex>
            <Flex alignItems="center" gap={4}>
                <Text fontSize="sm" color="gray.light">1d</Text>
                <Box onClick={(e) => e.preventDefault()}>
                    <Menu>
                        <MenuButton
                            bg={colorMode === "dark" ? "gray.dark" : "gray.200"}
                            p={1}
                            fontSize="xs"
                            borderRadius="50%"
                        >
                            <BsThreeDots />
                        </MenuButton>
                        <MenuList bg={colorMode === "dark" ? "gray.dark" : "gray.200"}>
                            <MenuItem
                                bg={colorMode === "dark" ? "gray.dark" : "gray.200"}
                                onClick={() => handleCommentCopy(comment)}
                            >
                                Copy Comment
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </Flex>
        </Flex>
    );
};

export default PostHeader;
