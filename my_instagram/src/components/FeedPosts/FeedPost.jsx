import { Box, Image } from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";

const FeedPost = ({ post }) => {
	const { userProfile } = useGetUserProfileById(post.createdBy);

	return (
		<Box mb={4} borderWidth={1} borderRadius="md" overflow="hidden">
			<PostHeader post={post} creatorProfile={userProfile} />
			<Box my={2}>
				<Image src={post.imageURL} alt={"FEED POST IMG"} />
			</Box>
			<PostFooter post={post} creatorProfile={userProfile} />
		</Box>
	);
};

export default FeedPost;
