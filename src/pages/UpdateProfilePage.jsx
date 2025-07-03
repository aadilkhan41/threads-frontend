import React, { useEffect, useRef, useState } from "react";
import userAtom from "../atoms/userAtom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Avatar,
    Center,
    useToast,
    Box,
} from "@chakra-ui/react";
import useImageRender from "../utils/hooks/useImageRender";
import axios from "axios";

const UpdateProfilePage = () => {
    const [user, setUser] = useRecoilState(userAtom);
    const navigate = useNavigate();
    const toast = useToast();
    const [userProfileData, setUserProfileData] = useState({
        name: user?.name,
        username: user?.username,
        bio: user?.bio,
        email: user?.email,
        password: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    const clickInputFile = useRef(null);
    const { getFilesToRead, imgUrl } = useImageRender();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const updatedObject = { ...userProfileData, profilePic: imgUrl };
            const response = await axios.put(`https://threads-backend-tp0d.onrender.com/api/users/update/${user._id}`, updatedObject, { withCredentials: true });
            const result = await response.data;
            localStorage.setItem("user", JSON.stringify(result));
            setUser(result);
            toast({
                title: "Use Profile Updated Successfully",
                description: "User profile updated",
                duration: 3000,
                isClosable: true,
                status: "success"
            })
        }
        catch (error) {
            toast({
                title: error?.response?.data?.error,
                duration: 3000,
                isClosable: true,
                status: "error"
            })
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <Box w="full">
            <form onSubmit={handleSubmit}>
                <Flex align={"center"} justify={"center"}>
                    <Stack
                        spacing={7}
                        w={"full"}
                        maxW={"md"}
                        bg={useColorModeValue("white", "gray.900")}
                        p={6}
                        mt="60px"
                    >
                        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                            User Profile
                        </Heading>
                        <FormControl id="userName">
                            <Stack direction={"row"} spacing={6}>
                                <Center>
                                    <Avatar
                                        size="xl"
                                        src={imgUrl || user?.profilePic}
                                        name={userProfileData?.name}
                                    />
                                </Center>
                                <Center w="full">
                                    <Button w="full" onClick={() => clickInputFile.current?.click()}>Change Avatar</Button>
                                    <Input type="file" hidden ref={clickInputFile} onChange={getFilesToRead} />
                                </Center>
                            </Stack>
                        </FormControl>
                        <Stack spacing={5} mb={5}>
                            <FormControl id="fullname">
                                <FormLabel>Full Name</FormLabel>
                                <Input
                                    placeholder="Full Name"
                                    _placeholder={{ color: "gray.500" }}
                                    type="text"
                                    value={userProfileData?.name}
                                    borderColor={useColorModeValue("gray.400")}
                                    variant={useColorModeValue("outline", "filled")}
                                    focusBorderColor={useColorModeValue("gray.600", "teal.400")}
                                    onChange={(e) => setUserProfileData({ ...userProfileData, name: e.target.value })}
                                />
                            </FormControl>
                            <FormControl id="userName">
                                <FormLabel>Username</FormLabel>
                                <Input
                                    placeholder="UserName"
                                    _placeholder={{ color: "gray.500" }}
                                    type="text"
                                    value={userProfileData?.username}
                                    borderColor={useColorModeValue("gray.400")}
                                    variant={useColorModeValue("outline", "filled")}
                                    focusBorderColor={useColorModeValue("gray.600", "teal.400")}
                                    onChange={(e) => setUserProfileData({ ...userProfileData, username: e.target.value })}
                                />
                            </FormControl>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    placeholder="your-email@example.com"
                                    _placeholder={{ color: "gray.500" }}
                                    type="email"
                                    value={userProfileData?.email}
                                    borderColor={useColorModeValue("gray.400")}
                                    variant={useColorModeValue("outline", "filled")}
                                    focusBorderColor={useColorModeValue("gray.600", "teal.400")}
                                    onChange={(e) => setUserProfileData({ ...userProfileData, email: e.target.value })}
                                />
                            </FormControl>
                            <FormControl id="bio">
                                <FormLabel>Bio</FormLabel>
                                <Input
                                    placeholder="Bio"
                                    _placeholder={{ color: "gray.500" }}
                                    type="text"
                                    value={userProfileData?.bio}
                                    borderColor={useColorModeValue("gray.400")}
                                    variant={useColorModeValue("outline", "filled")}
                                    focusBorderColor={useColorModeValue("gray.600", "teal.400")}
                                    onChange={(e) => setUserProfileData({ ...userProfileData, bio: e.target.value })}
                                />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input
                                    placeholder="password"
                                    _placeholder={{ color: "gray.500" }}
                                    type="password"
                                    borderColor={useColorModeValue("gray.400")}
                                    variant={useColorModeValue("outline", "filled")}
                                    focusBorderColor={useColorModeValue("gray.600", "teal.400")}
                                    onChange={(e) => setUserProfileData({ ...userProfileData, password: e.target.value })}
                                />
                            </FormControl>
                        </Stack>
                        <Stack spacing={6} direction={"row"}>
                            <Button bg={"red.400"} color={"white"} w="full" _hover={{ bg: "red.500" }} onClick={() => navigate("/")} isDisabled={isLoading}>
                                Cancel
                            </Button>
                            <Button type="submit" isLoading={isLoading} bg={useColorModeValue("gray.600", "gray.800")} color="white" w="full" _hover={{bg: useColorModeValue("gray.700", "gray.700")}}>Submit</Button>
                        </Stack>
                    </Stack>
                </Flex>
            </form>
        </Box>
    );
};

export default UpdateProfilePage;