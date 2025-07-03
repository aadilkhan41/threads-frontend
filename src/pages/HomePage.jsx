import { Avatar, Box, Button, Flex, Input, ListItem, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, Text, UnorderedList, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { UserPost } from "../components";

const HomePage = () => {
    const userLoggedInData = useRecoilValue(userAtom);
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [currentTimeout, setCurrentTimout] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isSmallerThan700] = useMediaQuery('(max-width: 700px)');

    useEffect(() => {
        if (!userLoggedInData) navigate("/login");

        const getFeed = async () => {
            try {
                const response = await axios.get("https://threads-backend-tp0d.onrender.com/api/posts/feed");
                const feedPosts = await response.data;
                setPosts(feedPosts);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        getFeed();
    }, [userLoggedInData]);

    const handleSearch = (e) => {
        setSearchValue(e.target.value)
        if (currentTimeout) clearTimeout(currentTimeout);

        const previousTimeout = setTimeout(async () => {
            const response = await axios.get(`https://threads-backend-tp0d.onrender.com/api/users/all?filter=${e.target.value}`);
            const result = await response.data;
            setSearchResults(result);
        }, 100);

        setCurrentTimout(previousTimeout);
    }

    return (
        <Flex flexDirection="column" justifyContent="center" alignItems="center" mt={10} w="full" position="relative" >
            <Flex gap={4} alignItems="center" flexDirection="column">
                <Input value={searchValue} placeholder="Search for usernames & names" w={{ base: 300, md: 400 }} onChange={handleSearch} onClick={onOpen} />
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalCloseButton />
                        <ModalHeader textAlign="center" mt={10}>
                            <Input value={searchValue} placeholder="Search for usernames & names" w={{ base: 300, md: 400 }} onChange={handleSearch} />
                        </ModalHeader>
                        <ModalBody>
                            {(searchResults?.length > 0 && searchResults?.length <= 5) &&
                                <Box w="full" h={300}>
                                    <UnorderedList listStyleType="none">
                                        {
                                            searchResults?.map(result => <Link key={result?._id} to={`/${result?.username}`}>
                                                <ListItem my={4}>
                                                    <Flex alignItems="center" gap={2}>
                                                        <Avatar src={result?.profilePic} />
                                                        <Text>{result?.username}</Text>
                                                        {(result?.followers?.length >= 25) && <Image src={"/verified.png"} w={4} h={4} />}
                                                    </Flex>
                                                </ListItem>
                                            </Link>)
                                        }
                                    </UnorderedList>
                                </Box>
                            }
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Flex>

            {isSmallerThan700 && <Link to={`/${userLoggedInData?.username}`}><Button my={4} fontSize="sm">Visit Profile</Button></Link>}

            {isLoading && (
                <Flex justifyContent="center" alignItems="center" my={10}>
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="gray.light"
                        size="xl"
                    />
                </Flex>
            )}

            {(!isLoading && posts?.length) === 0 && (
                <Text color="gray.light" fontSize="lg" textAlign="center" my={10}>
                    Follow People To Light Your Feed Up🤗
                </Text>
            )}

            <Box w="full">
                {!isLoading &&
                    posts?.map((post) => (
                        <UserPost
                            key={post._id}
                            post={post}
                            userProfile={post.postedBy}
                            home="home"
                        />
                    ))}
            </Box>
        </Flex>
    );
};

export default HomePage;