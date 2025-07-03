import axios from "axios";

const handleDeletePost = async ( postId, username, navigate, toast, setUserLoggedIn ) => {
    try {
        if (!window.confirm("Are you sure? Do you want to delete this post?")) return;
        
        const response = await axios.delete(`/api/posts/delete/${postId}`, {
            withCredentials: true,
        });

        const result = await response.data;
        if (result?.error) return;
        
        let userLoggedIn = JSON.parse(localStorage.getItem("user"));
        userLoggedIn.posts = userLoggedIn?.posts?.filter(
            (post) => post !== postId
        );
        
        localStorage.setItem("user", JSON.stringify(userLoggedIn));
        setUserLoggedIn(userLoggedIn);
        toast({
            title: "Post deleted",
            description: result?.message,
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        navigate(`/${username}`);
    } catch (error) {
        console.log(error);
    }
};

export default handleDeletePost;