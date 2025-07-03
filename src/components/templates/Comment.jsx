import { useRecoilValue } from "recoil";
import userAtom from "../../atoms/userAtom";
import { useToast } from "@chakra-ui/react";

const Comment = ({ onOpen }) => {
    const userLoggedInData = useRecoilValue(userAtom);
    const toast = useToast();

    const handleOpenReply = () => {
        if (!userLoggedInData) {
            toast({
                title: "Please Login or signup",
                status: "error",
                duration: 3000,
                isClosable: true
            })
            return;
        }

        onOpen();
    }

    return (
        <svg
            aria-label="Comment"
            color=""
            fill=""
            height="20"
            role="img"
            viewBox="0 0 24 24"
            width="20"
            cursor="pointer"
            onClick={handleOpenReply}
        >
            <title>Comment</title>
            <path
                d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
            ></path>
        </svg>
    )
}

export default Comment