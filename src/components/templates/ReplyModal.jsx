import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Textarea,
    ModalFooter,
    Button,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ReplyModal = ({ post, userProfile, isOpen, onClose, setPostDetails }) => {
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleReplyToPost = async () => {
        try {
            setIsLoading(true);
            const response = await axios.put(`/api/posts/reply/${post._id}`, { text }, { withCredentials: true });
            const result = await response.data;
            if (setPostDetails) {
                // concating the new reply to current replies
                setPostDetails({
                    ...post, replies: post?.replies?.concat({
                        ...result.reply
                    })
                });
            }
            toast({
                title: result.message,
                status: "success",
                duration: 3000,
                isClosable: true
            });
            setText("");
            onClose();
            navigate(`/${userProfile?.username || userProfile}/post/${post._id}`);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Express your thoughts</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Textarea value={text} placeholder="Express your feelings through your words" _placeholder={{ color: "gray.light" }} onChange={(e) => setText(e.target.value)} />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="ghost" isLoading={isLoading} onClick={handleReplyToPost}>Reply</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ReplyModal;
