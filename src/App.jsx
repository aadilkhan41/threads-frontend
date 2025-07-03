import { Container, useMediaQuery } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { CreatePost, Layout, Logout } from "./components";
import userAtom from "./atoms/userAtom";
import { useRecoilValue } from "recoil";

const App = () => {
  const userLoggedIn = useRecoilValue(userAtom);
  const [isSmallerThan700] = useMediaQuery('(max-width: 700px)');

  return (
    <>
    {(userLoggedIn && !isSmallerThan700) ? <Logout/>: null} 
    <Container minH="100vh" maxW={{
      base: "md",
      sm: "lg",
      lg: "xl",
    }} display="flex" flexDirection="column" justifyContent="space-around">
      <Layout>
        <Outlet/>
      </Layout>
    </Container>
    {/* if user logged only then creates post button */}
    {userLoggedIn ? <CreatePost/>: null} 
    </>
  )
}

export default App