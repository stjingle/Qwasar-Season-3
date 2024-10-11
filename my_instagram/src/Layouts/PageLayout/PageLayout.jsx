import { Box, Flex, Spinner, Switch, Text, useColorMode } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Navbar from "../../components/Navbar/Navbar";

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading] = useAuthState(auth);
  const { colorMode, toggleColorMode } = useColorMode();

  const canRenderSidebar = pathname !== "/auth" && user;
  const canRenderNavbar = !user && !loading && pathname !== "/auth";

  if (!user && loading) return <PageLayoutSpinner />;

  return (
    <Flex flexDir={canRenderNavbar ? "column" : "row"} bg={colorMode === "dark" ? "gray.800" : "gray.100"} position="relative">
      {/* Toggle Color Mode Switch */}
      <Flex position="absolute" top={4} right={4} alignItems="center">
        <Text mr={2} fontWeight="bold" color={colorMode === "dark" ? "white" : "black"}>
          {colorMode === "light" ? "Light Mode" : "Dark Mode"}
        </Text>
        <Switch
          isChecked={colorMode === "dark"}
          onChange={toggleColorMode}
          colorScheme="teal"
        />
      </Flex>

      {/* Sidebar */}
      {canRenderSidebar && (
        <Box w={{ base: "70px", md: "240px" }} bg={colorMode === "dark" ? "gray.700" : "gray.200"}>
          <Sidebar />
        </Box>
      )}

      {/* Navbar */}
      {canRenderNavbar && <Navbar />}

      {/* Main Content */}
      <Box flex={1} w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }} mx="auto">
        {children}
      </Box>
    </Flex>
  );
};

export default PageLayout;

const PageLayoutSpinner = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      flexDir="column"
      h="100vh"
      alignItems="center"
      justifyContent="center"
      bg={colorMode === "dark" ? "gray.900" : "gray.100"}
    >
      <Spinner size="xl" />
    </Flex>
  );
};
