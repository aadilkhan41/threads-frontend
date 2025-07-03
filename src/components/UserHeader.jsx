import {
    Avatar,
    Box,
    Flex,
    VStack,
    Text,
    useToast,
    useColorMode,
    Button,
    useColorModeValue,
    MenuButton,
    Menu,
    Portal,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import FollowBtn from "./templates/FollowBtn";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link, useParams } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { useEffect, useState } from "react";

const UserHeader = ({ userProfile }) => {
    const toast = useToast();
    const { colorMode } = useColorMode();
    const userLoggedIn = useRecoilValue(userAtom);
    const [followersCount, setFollowersCount] = useState(0);
    const { username } = useParams();

    // userProfile data takes time to render so if changing the state it would undefined initially
    useEffect(() => {
        setFollowersCount(userProfile?.followers?.length);
    }, [userProfile])

    const handleCopy = () => {
        const userURL = window.location.href;
        navigator.clipboard.writeText(userURL).then(() => {
            toast({
                title: "Copied To Clipboard",
                description: "Use Ctrl + V to access the profile URL",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        });
    };

    return (
        <VStack mt="60px" alignItems="start" spacing={3.5}>
            <Flex justifyContent="space-between" w="100%">
                <Box>
                    <Text fontSize="2xl" fontWeight="bold" mb={1}>
                        {userProfile?.name}
                    </Text>
                    <Flex alignItems="center" gap={3}>
                        <Text fontSize="md">@{userProfile?.username}</Text>
                        <Text
                            fontSize="xs"
                            w={20}
                            textAlign="center"
                            color={colorMode === "dark" ? "gray.light" : "gray.dark"}
                            bg={colorMode === "dark" ? "gray.dark" : "gray.200"}
                            p={2}
                            borderRadius="full"
                        >
                            threads.net
                        </Text>
                    </Flex>
                </Box>
                <Box>
                    <Avatar
                        name={userProfile?.name}
                        src={userProfile?.profilePic}
                        size={{ base: "lg", md: "xl" }}
                    />
                </Box>
            </Flex>
            <Text>{userProfile?.bio}</Text>
            {/* Authenticaticated user profile must contain update profile and not follow */}
            {userProfile?._id !== userLoggedIn?._id ? (
                <FollowBtn userProfile={userProfile} followersCount={followersCount} setFollowersCount={setFollowersCount} />
            ) : (
                <Link to="/update">
                    <Button>Update Profile</Button>
                </Link>
            )}

            <Flex justifyContent="space-between" alignItems="center" w="full">
                <Flex alignItems="center" gap={2}>
                    <Text color="gray.light">
                        {followersCount} follower(s)
                    </Text>
                    <Box w={1} h={1} bg="gray.light" borderRadius="full"></Box>
                    <Link to={`https://instagram.com/${username}/`} target="_blank">
                        <Text color="gray.light" _hover={{ textDecoration: "underline" }}>
                            instagram.com
                        </Text>
                    </Link>
                </Flex>
                <Flex alignItems="center">
                    <Box
                        className="icon-container"
                        _hover={{ bg: useColorModeValue("gray.100", "#1e1e1e") }}
                    >
                        <BsInstagram size={20} />
                    </Box>
                    <Box
                        className="icon-container"
                        _hover={{ bg: useColorModeValue("gray.100", "#1e1e1e") }}
                    >
                        <Menu>
                            <MenuButton>
                                <CgMoreO size={20} />
                            </MenuButton>
                            <Portal>
                                <MenuList bg={useColorModeValue("gray.300", "gray.dark")}>
                                    <MenuItem
                                        bg={useColorModeValue("gray.300", "gray.dark")}
                                        onClick={handleCopy}
                                    >
                                        Copy Link
                                    </MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                </Flex>
            </Flex>

            <Flex justifyContent="space-between" w="full">
                <Flex
                    flex={1}
                    borderBottom={`1px solid ${colorMode === "dark" ? "white" : "black"}`}
                    color={colorMode === "dark" ? "whiteAlpha.900" : "gray.dark"}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Text p={3} fontWeight="bold">
                        Threads
                    </Text>
                </Flex>
                <Flex
                    flex={1}
                    borderBottom="1px solid gray"
                    color="gray.light"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Text p={3} fontWeight="bold">
                        Replies
                    </Text>
                </Flex>
            </Flex>
        </VStack>
    );
};

export default UserHeader;
