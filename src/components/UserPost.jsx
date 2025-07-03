import { Link, useNavigate } from "react-router-dom";
import {
    Avatar,
    Flex,
    Box,
    Image,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useToast,
    useColorMode,
    useDisclosure,
    Spinner,
} from "@chakra-ui/react";
import { Actions, DatePost, ReplyModal } from "./";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import handleDeletePost from "../utils/features/deletePost";
import { useState } from "react";
import likesAtomFamily from "../atoms/likesAtom";

const UserPost = ({ post, userProfile, home }) => {
    const toast = useToast();
    const { colorMode } = useColorMode();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [userLoggedInData, setUserLoggedInData] = useRecoilState(userAtom);
    const [isDeleting, setIsDeleting] = useState(false);
    const likesLength = useRecoilValue(likesAtomFamily(post._id));

    const handleCopyPost = (link) => {
        console.log(link);
        navigator.clipboard
            .writeText(`${window.location.origin}${link}`)
            .then(() => {
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
        <Box>
            <Link to={`/${userProfile?.username}/post/${post._id}`}>
                <Flex mt={8}>
                    <Flex
                        flexDirection="column"
                        alignItems="center"
                        minW={{ base: 12, sm: 20 }}
                    >
                        <Avatar
                            name={userProfile?.name}
                            size="md"
                            src={userProfile?.profilePic}
                        />
                        <Box h="full" w={{ base: 0.003, sm: 0.001 }} bg="gray.500" my={6}></Box>
                        <Flex
                            flexDirection="row"
                            flexWrap="wrap"
                            gap={1}
                            alignItems="center"
                            justifyContent="center"
                            w="80%"
                        >
                            {post.replies?.length === 0 && <Text>🥱</Text>}
                            {post.replies?.[0] && (
                                <Avatar
                                    name="user1"
                                    h={{ base: "14px", sm: "16px", md: "24px" }}
                                    w={{ base: "14px", sm: "16px", md: "24px" }}
                                    src={`${post.replies?.[0]?.userProfilePic}`}
                                />
                            )}
                            {post.replies?.[1] && (
                                <Avatar
                                    name="user2"
                                    h={{ base: "14px", sm: "16px", md: "24px" }}
                                    w={{ base: "14px", sm: "16px", md: "24px" }}
                                    src={`${post.replies?.[1]?.userProfilePic}`}
                                />
                            )}
                            {post.replies?.[2] && (
                                <Avatar
                                    name="user3"
                                    h={{ base: "14px", sm: "16px", md: "24px" }}
                                    w={{ base: "14px", sm: "16px", md: "24px" }}
                                    src={`${post.replies?.[2]?.userProfilePic}`}
                                />
                            )}
                        </Flex>
                    </Flex>
                    <Flex
                        flexDirection="column"
                        ml={home ? { base: 3, md: 3 } : { base: 2, md: 6 }}
                        mr={home && { base: 0, md: 6 }}
                        gap={4}
                        w="full"
                    >
                        <Flex justifyContent="space-between">
                            <Flex alignItems="center" gap={1}>
                                <Text
                                    fontWeight="bold"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate(`/${userProfile?.username}`);
                                    }}
                                >
                                    {userProfile?.username}
                                </Text>
                                {(userProfile?.followers?.length >= 25) && <Image src="/verified.png" w={4} h={4} />}
                            </Flex>
                            <Flex alignItems="center" gap={4}>
                                <DatePost post={post} />
                                {/* user logged in can only delete his own post that is postedBy _id */}
                                {userLoggedInData?._id === post?.postedBy && (
                                    <Box
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            setIsDeleting(true);
                                            await handleDeletePost(
                                                post?._id,
                                                userLoggedInData?.username,
                                                navigate,
                                                toast,
                                                setUserLoggedInData
                                            );
                                            setIsDeleting(false);
                                        }}
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
                                        <MenuList
                                            bg={colorMode === "dark" ? "gray.dark" : "gray.200"}
                                        >
                                            <MenuItem
                                                bg={colorMode === "dark" ? "gray.dark" : "gray.200"}
                                                onClick={() =>
                                                    handleCopyPost(
                                                        `/${userProfile?.username}/post/${post._id}`
                                                    )
                                                }
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
                                    base: "md",
                                    md: "lg",
                                }}
                            >
                                {post?.text}
                            </Text>
                            {post?.img && <Image loading="lazy" src={post?.img} borderRadius={4} w={440} />}
                        </Flex>
                        <Actions post={post} onOpen={onOpen} />
                        <Flex mb={8} gap={3} alignItems="center">
                            <Text color="gray.light">{post?.replies?.length} replies</Text>
                            <Box w={1} h={1} bg="gray.light" borderRadius="full"></Box>
                            <Text color="gray.light">{likesLength} likes</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Link>
            <ReplyModal
                post={post}
                userProfile={userProfile}
                isOpen={isOpen}
                onClose={onClose}
            />
        </Box>
    );
};

export default UserPost;
