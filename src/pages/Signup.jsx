import { HStack, Stack, Flex, useToast, Box } from "@chakra-ui/react";
import { AuthAsk, AuthButton, AuthHeader, AuthInput, AuthPassword } from "../components";
import { useForm } from "react-hook-form";
import signupSchema from "../utils/zodSchema/signupZod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(signupSchema),
    });
    const toast = useToast();
    const [user, setUserData] = useRecoilState(userAtom);
    const navigate = useNavigate();

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
    }, [errors, user]);

    const onSubmit = async (data) => {
        const signupBody = {
            name: data["Full Name"],
            email: data.Email,
            username: data.Username,
            password: data.Password
        }

        try {
            const response = await axios.post("https://threads-backend-tp0d.onrender.com/api/users/signup", signupBody);
            localStorage.setItem("user", JSON.stringify(response.data));
            setUserData(response.data);
        }
        catch (error) {
            toast({
                title: `Error`,
                description: `${error.response?.data?.message}`,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    };

    return (
        <Box w="full">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex w="full" direction="column" mt={10} gap={10} alignItems="center" justifyContent="center" >
                    <AuthHeader header="Sign Up" description="to communicate and network ✌️" />
                    <Stack direction="column">
                        <HStack justifyContent="space-between">
                            <AuthInput label="Full Name" type="text" register={register} />
                            <AuthInput label="Username" type="text" register={register} />
                        </HStack>
                        <AuthInput label="Email" register={register} />
                        <AuthPassword register={register} />
                        <AuthButton text="Sign up" />
                        <AuthAsk ques="Already a user?" linkText="Login" link="/login" />
                    </Stack>
                </Flex>
            </form>
        </Box>
    );
};

export default Signup;
