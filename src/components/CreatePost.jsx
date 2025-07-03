import { AddIcon } from "@chakra-ui/icons";
import {
    Button,
    CloseButton,
    Flex,
    Icon,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    Textarea,
    useToast,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FaImages } from "react-icons/fa";
import useImageRender from "../utils/hooks/useImageRender";
import axios from "axios";
import userAtom from "../atoms/userAtom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

const maxCharacters = 500;

const CreatePost = () => {
    const [textArea, setTextArea] = useState("");
    const [maxChar, setMaxChar] = useState(maxCharacters);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { getFilesToRead, imgUrl, setImgUrl } = useImageRender();
    const toast = useToast();
    const inputFile = useRef(null);
    const [userLoggedInData, setUserLoggedInData] = useRecoilState(userAtom);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleTextArea = (e) => {
        if (e.target.value.length > maxCharacters) {
            toast({
                title: "Limit Reached",
                description: "Cannot exceed 500 characters",
                status: "error",
                duration: 3000,
                isClosable: true
            })
        }
        else {
            setTextArea(e.target.value);
            setMaxChar(maxCharacters - e.target.value.length);
        }
    }

    const handleCloseModal = () => {
        onClose();
        setTextArea("");
        setMaxChar(maxCharacters);
        setImgUrl(null);
        inputFile.current.value = null; // to make sure same file can be selected again
    }

    const handlePostLogic = async () => {
        try {
            setIsLoading(true);
            const postBody = {
                postedBy: userLoggedInData._id,
                text: textArea,
                img: imgUrl || ""
            };
            const response = await axios.post("https://threads-backend-tp0d.onrender.com/api/posts/create", postBody, { withCredentials: true });
            const result = await response.data;
            localStorage.setItem("user", JSON.stringify(result.user));
            setUserLoggedInData(result.user);
            handleCloseModal();
            setIsLoading(false);
            navigate(`/${userLoggedInData.username}`);
            toast({
                title: "Posted successfully",
                description: "Creation of post successful",
                status: "success",
                duration: 3000,
                isClosable: true
            });
        }
        catch (error) {
            toast({
                title: "Error",
                description: error?.message,
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
    }

    return (
        <>
            <Button
                leftIcon={<AddIcon />}
                position="fixed"
                bottom={18}
                right={18}
                onClick={onOpen}
                colorScheme='twitter'
                variant='solid'
            >
                Post
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Post</ModalHeader>
                    <ModalCloseButton top={4} />

                    <ModalBody>
                        <Textarea placeholder="Write your mind out...✌️" fontSize="md" value={textArea} mb={3} onChange={handleTextArea} />
                        <Text color="whiteAlpha.800">{maxChar} / 500</Text>
                        <Flex mt={4} flexDirection="column">
                            <Input type="file" hidden ref={inputFile} onChange={getFilesToRead} />
                            <Icon as={FaImages} cursor="pointer" w={5} h={5} onClick={() => inputFile.current?.click()} />
                            {imgUrl &&
                                <Flex gap={2} flexDirection="column" alignItems="flex-end">
                                    <CloseButton onClick={() => {
                                        setImgUrl(null);
                                        inputFile.current.value = null; // this has to be so the same image can be picked again
                                    }} />
                                    <Image src={imgUrl} alt="post-image" alignSelf="center" />
                                </Flex>
                            }
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={handleCloseModal} isDisabled={isLoading}>
                            Cancel
                        </Button>
                        <Button variant="ghost" onClick={handlePostLogic} isLoading={isLoading}>Create Post</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreatePost;
