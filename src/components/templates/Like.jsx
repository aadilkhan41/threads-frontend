import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../../atoms/userAtom";
import axios from "axios";
import { useColorModeValue, useToast } from "@chakra-ui/react";
import likesAtomFamily from "../../atoms/likesAtom";

const Like = ({ post }) => {
    const userLoggedInData = useRecoilValue(userAtom);
    const setLikesLength = useSetRecoilState(likesAtomFamily(post._id));
    const [isLiked, setIsLiked] = useState(
        post?.likes?.includes(userLoggedInData?._id)
    );
    const toast = useToast();

    // to initialise after asynchronous fetch task
    useEffect(() => {
        setIsLiked(post?.likes?.includes(userLoggedInData?._id));
    }, [post]);

    const handleLikePost = async () => {
        try {
            const response = await axios.put(`https://threads-backend-tp0d.onrender.com/api/posts/like/${post?._id}`, null, { withCredentials: true });
            const result = await response.data;
            isLiked
                ? setLikesLength(prevLength => prevLength - 1)
                : setLikesLength(prevLength => prevLength + 1);
            setIsLiked(!isLiked);
            toast({
                title: `${result.message}`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: error?.response?.data?.error,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <svg
            aria-label="Like"
            color={isLiked ? "rgb(237, 73, 86)" : useColorModeValue("rgba(0, 0, 0, 0.92)", "white")}
            fill={isLiked ? "rgb(237, 73, 86)" : "transparent"}
            height="19"
            role="img"
            viewBox="0 0 24 22"
            width="20"
            onClick={handleLikePost}
            cursor="pointer"
        >
            <title>Like</title>
            <path
                d="M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z"
                stroke="currentColor"
                strokeWidth="2"
            ></path>
        </svg>
    );
};

export default Like;
