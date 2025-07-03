import { useEffect, useState } from "react";
import { PostDetails, ReplyModal } from "../components";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Flex, Spinner, useDisclosure, useToast } from "@chakra-ui/react";

const PostPage = () => {
    const { pid, username } = useParams();
    const [ postDetails, setPostDetails ] = useState(null);
    const { onOpen, isOpen, onClose } = useDisclosure();
    const toast = useToast();

    useEffect(() => {
        axios.get(`https://threads-backend-tp0d.onrender.com/api/posts/${pid}`, { withCredentials: true })
            .then(response => response.data)
            .then(result => setPostDetails(result))
            .catch(error => {
                toast({
                    title: `${error?.response?.data?.error || error?.response?.data?.message}`,
                    description: error,
                    status: "error",
                    duration: 3000,
                    isClosable: true
                })
            })
    }, [ pid ]);

    if (!postDetails) {
        return (<Flex justifyContent="center" alignItems="center" my={10}>
            <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='gray.light' size='xl' />
        </Flex>);
    }

    return (
        <>
            <PostDetails postDetails={postDetails} onOpen={onOpen} />
            <ReplyModal post={postDetails} userProfile={username} isOpen={isOpen} onClose={onClose} setPostDetails={setPostDetails} />
        </>
    )
}

export default PostPage