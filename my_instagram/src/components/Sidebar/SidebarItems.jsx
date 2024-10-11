import CreatePost from "./CreatePost";
import Home from "./Home";
import Notifications from "./Notifications";
import Search from "./Search";

const SidebarItems = () => {
	return (
		<>
			<Home />
			<Search />
			<Notifications />
			<CreatePost />
		</>
	);
};

export default SidebarItems;
