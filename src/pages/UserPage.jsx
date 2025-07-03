import { Link, useParams } from "react-router-dom";
import { UserHeader, UserPost } from "../components";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Box, Button, Flex, Spinner, Text, useToast } from "@chakra-ui/react";

const UserPage = () => {
    const { username } = useParams();
    const [userProfile, setUserProfile] = useState(null);
    const user = useRecoilValue(userAtom);
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://threads-backend-tp0d.onrender.com/api/users/profile/${username}`)
            .then(response => response.data)
            .then(result => {
                setUserProfile(result)
            })
            .catch(error => {
                toast({
                    title: "Error",
                    description: error?.response?.data?.message || "Something went wrong",
                    status: "error",
                    duration: 3000,
                    isClosable: true
                })
                setUserProfile(null);
            })
            .finally(() => setIsLoading(false))
    }, [user, username]);

    if (isLoading) {
        return (
            <Flex justifyContent="center" alignItems="center" my={10}>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='gray.light'
                    size='xl'
                />
            </Flex>
        );
    }

    if (!userProfile) {
        return (
            <Flex w="full" justifyContent="center" mt={10}>
                <Link to="/">
                    <Button>Back to Safety</Button>
                </Link>
            </Flex>
        );
    }

    return (
        <Box w="full">
            {(!isLoading && userProfile) && <UserHeader userProfile={userProfile} />}
            {userProfile?.posts?.length === 0 && <Text color="gray.light" fontSize="lg" textAlign="center" my={10}>No Posts Yet</Text>}
            {userProfile?.posts?.map((post) => <UserPost key={post._id} post={post} userProfile={userProfile} />)}
        </Box>
    )
}

export default UserPage