import { Flex, IconButton, Image, useColorMode, Tooltip, Box, useMediaQuery } from "@chakra-ui/react";
import { FaHouse, FaRegCircleUser } from "react-icons/fa6";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link, useNavigate } from "react-router-dom";
import { TbLogin } from "react-icons/tb";
import { Logout } from "./";

const Navbar = () => {

    /* color mode hook provided by chakra ui to toggle customised color mode */
    const { colorMode, toggleColorMode } = useColorMode();
    const user = useRecoilValue(userAtom);
    const navigate = useNavigate();
    const [isSmallerThan700] = useMediaQuery('(max-width: 700px)');

    return (
        <Flex mt={10} justifyContent="center" alignItems="center" position="relative">
            <Box position="absolute" left={0}><Link to="/"><IconButton >
                <FaHouse />
            </IconButton></Link></Box>
            <Image
                src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
                alt="logo"
                onClick={toggleColorMode}
                cursor="pointer"
                w={8}
            />
            {(user && !isSmallerThan700) && <Tooltip hasArrow label="profile" fontSize="medium">
                <IconButton position="absolute" right={0} onClick={() => navigate(`/${user?.username}`)}>
                    <FaRegCircleUser />
                </IconButton>
            </Tooltip>}
            {(user && isSmallerThan700) && <Logout mobile={true} />}
            {!user && <Tooltip hasArrow label="login" fontSize="medium">
                <IconButton position="absolute" right={0} onClick={() => navigate(`/login`)}>
                    <TbLogin size={25} />
                </IconButton>
            </Tooltip>}
        </Flex>
    )
}

export default Navbar