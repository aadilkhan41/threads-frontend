import { Stack, Flex, useToast, Box } from "@chakra-ui/react";
import { AuthAsk, AuthButton, AuthHeader, AuthInput, AuthPassword } from "../components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import loginSchema from "../utils/zodSchema/loginZod";
import axios from "axios";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(loginSchema),
    });
    const toast = useToast();
    const navigate = useNavigate();
    const [user, setUserData] = useRecoilState(userAtom);

    useEffect(() => {
        if (user) navigate("/");

        if (Object.keys(errors).length) {
            toast({
                title: `Error in field ${Object.keys(errors)[0]}`,
                description: `${Object.values(errors)[0].message}`,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    }, [errors, user])

    const onSubmit = async (data) => {
        const loginBody = {
            username: data.Username,
            password: data.Password
        }

        try {
            const response = await axios.post("/api/users/login", loginBody);
            localStorage.setItem("user", JSON.stringify(response.data));
            setUserData(response.data);
        }
        catch (error) {
            toast({
                title: `Error`,
                description: `${(error.response?.data?.message)}`,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box w="full">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex w="full" direction="column" mt={10} gap={10} alignItems="center" justifyContent="center">
                    <AuthHeader header="Login" description="Welcome to a new era of networking ✌️" />
                    <Stack direction="column" w="80%">
                        <AuthInput label="Username" type="text" register={register} />
                        <AuthPassword register={register} />
                        <AuthButton text="Login" />
                        <AuthAsk ques="Do not have an account?" linkText="Signup" link="/signup" />
                    </Stack>
                </Flex>
            </form>
        </Box>
    );
};

export default LoginPage;