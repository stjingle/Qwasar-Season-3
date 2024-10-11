import { Avatar, Button, Flex, Text, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";

const SuggestedHeader = () => {
	const { handleLogout, isLoggingOut } = useLogout();
	const authUser = useAuthStore((state) => state.user);

	if (!authUser) return null;

	return (
		<Flex justifyContent={"flex-end"} alignItems={"center"} w={"full"} p={4}>
			<Menu>
				<MenuButton as={Button} background="transparent" _hover={{ background: "transparent" }} rightIcon={<ChevronDownIcon />} p={0}>
					<Flex alignItems={"center"} gap={2}>
						<Avatar size={"md"} src={authUser.profilePicURL} />
						<Text fontSize={14} fontWeight={"bold"}>
							{authUser.username}
						</Text>
					</Flex>
				</MenuButton>
				<MenuList>
					<MenuItem as={Link} to={`/${authUser.username}`}>
						View Profile
					</MenuItem>
					<MenuItem onClick={handleLogout} isLoading={isLoggingOut}>
						Log out
					</MenuItem>
				</MenuList>
			</Menu>
		</Flex>
	);
};

export default SuggestedHeader;
