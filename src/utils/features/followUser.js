import axios from "axios";

const followUser = async (id, toast, setUserData, setLoading) => {
    try {
        setLoading(true);
        const response = await axios.put(`https://threads-backend-tp0d.onrender.com/api/users/follow/${id}`, null, {withCredentials: true});
        const result = await response.data;
        localStorage.setItem("user", JSON.stringify(result?.user));
        setUserData(result?.user);
        toast({
            title: `${result?.status ? "Followed" : "Unfollowed"}`,
            description: result?.message,
            status: "success",
            duration: 3000,
            isClosable: true
        })
    }
    catch(error) {
        toast({
            title: "Error",
            description: error?.response?.data?.error,
            status: "error",
            duration: 3000,
            isClosable: true
        })
    }
}

export default followUser;