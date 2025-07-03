import { IconButton, Tooltip } from "@chakra-ui/react";
import axios from "axios";
import { MdLogout } from "react-icons/md";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";

const Logout = ({ mobile }) => {
    const setUserData = useSetRecoilState(userAtom);

    const handleLogout = async () => {
        try {
            const response = await axios.post("/api/users/logout");
            console.log(response.data.message);
            localStorage.removeItem("user");
            setUserData(null);
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    };

    return (
        <Tooltip hasArrow label="logout" fontSize="medium">
            <IconButton
                position="absolute"
                right={mobile ? 0 : 18}
                top={!mobile && 18}
                onClick={handleLogout}
            >
                <MdLogout />
            </IconButton>
        </Tooltip>
    );
};

export default Logout;
