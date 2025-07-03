import {
    Box,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    Image,
    useColorMode,
    Avatar,
    Divider,
    useToast,
    Spinner,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";
import { DatePost, Reply } from ".";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import handleDeletePost from "../utils/features/deletePost";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useState } from "react";
import likesAtomFamily from "../atoms/likesAtom";

const PostDetails = ({ postDetails, onOpen }) => {
    const { colorMode } = useColorMode();
    const toast = useToast();
    const [userLoggedInData, setUserLoggedInData] = useRecoilState(userAtom);
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);
    const likesLength = useRecoilValue(likesAtomFamily(postDetails._id));

    const handleCopyPost = () => {
        const currentPostLink = window.location.href;

        navigator.clipboard.writeText(currentPostLink).then(() => {
            toast({
                title: "Copied post link",
                description: "use Ctrl + V to access the post link",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        });
    };

    return (
        <Flex flexDirection="column" gap={4} mt="60px">
            <Flex justifyContent="space-between" mb={2}>
                <Flex alignItems="center" gap={1}>
                    <Avatar
                        src={postDetails?.postedBy?.profilePic}
                        size="md"
                        mr={1.5}
                        name={postDetails?.postedBy?.name}
                    />
                    <Link to={`/${postDetails?.postedBy?.username}`}><Text fontWeight="bold">{postDetails?.postedBy?.username}</Text></Link>
                </Flex>
                <Flex alignItems="center" gap={4}>
                    <DatePost post={postDetails} />
                    {userLoggedInData?._id === postDetails?.postedBy?._id && (
                        <Box
                            onClick={async (e) => {
                                e.preventDefault();
                                setIsDeleting(true);
                                await handleDeletePost(
                                    postDetails?._id,
                                    userLoggedInData?.username,
                                    navigate,
                                    toast,
                                    setUserLoggedInData
                                );
                                setIsDeleting(false);
                            }}
                            cursor="pointer"
                        >
                            {
                                isDeleting ?
                                    <Spinner size='xs' /> :
                                    <MdOutlineDeleteOutline size={20} />
                            }
                        </Box>
                    )}
                    <Box onClick={(e) => e.preventDefault()}>
                        <Menu>
                            <MenuButton
                                bg={colorMode === "dark" ? "gray.dark" : "gray.200"}
                                p={2}
                                borderRadius="50%"
                            >
                                <BsThreeDots />
                            </MenuButton>
                            <MenuList bg={colorMode === "dark" ? "gray.dark" : "gray.200"}>
                                <MenuItem
                                    bg={colorMode === "dark" ? "gray.dark" : "gray.200"}
                                    onClick={() => handleCopyPost()}
                                >
                                    Copy Post Link
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>
                </Flex>
            </Flex>

            <Flex flexDirection="column" gap={4}>
                <Text
                    fontSize={{
                        base: "sm",
                        md: "md",
                    }}
                >
                    {postDetails?.text}
                </Text>
                {<Image loading="lazy" src={postDetails?.img} w={550} borderRadius={4} />}
            </Flex>
            <Actions post={postDetails} onOpen={onOpen} />
            <Flex gap={3} alignItems="center">
                <Text color="gray.light">{postDetails?.replies?.length} replies</Text>
                <Box w={1} h={1} bg="gray.light" borderRadius="full"></Box>
                <Text color="gray.light">{likesLength} likes</Text>
            </Flex>
            <Divider />
            <Text fontSize="lg" fontWeight="bold" mt={5}>
                Replies
            </Text>
            {postDetails?.replies?.length === 0 ? (
                <Text fontSize="md" color="gray.light">
                    No replies yet
                </Text>
            ) : (
                postDetails?.replies?.map((reply, index) => (
                    <Reply
                        key={index}
                        comment={reply?.text}
                        image={reply?.userProfilePic}
                        username={reply?.username}
                    />
                ))
            )}
        </Flex>
    );
};

export default PostDetails;
