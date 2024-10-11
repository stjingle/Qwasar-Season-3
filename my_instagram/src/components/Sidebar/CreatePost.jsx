import {
	Box,
	Button,
	CloseButton,
	Flex,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
	Tooltip,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverArrow,
	PopoverCloseButton,
	PopoverBody,
	Grid,
	useDisclosure, // Ensure this is imported
} from "@chakra-ui/react";

import { CreatePostLogo } from "../../assets/constants";
import { BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import usePreviewImg from "../../hooks/usePreviewImg";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import usePostStore from "../../store/postStore";
import useUserProfileStore from "../../store/userProfileStore";
import { useLocation } from "react-router-dom";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const emojiList = ["😊", "😂", "😍", "👍", "🔥", "💯", "❤️", "🙌"];

const CreatePost = ({ onNewPost }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [caption, setCaption] = useState("");
	const imageRef = useRef(null);
	const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
	const showToast = useShowToast();
	const { isLoading, handleCreatePost } = useCreatePost();
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);

	const handlePostCreation = async () => {
		try {
			const newPost = await handleCreatePost(selectedFile, caption);
			onNewPost(newPost); // Update the feed with new post
			onClose();
			setCaption("");
			setSelectedFile(null);
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	const addEmoji = (emoji) => {
		setCaption((prevCaption) => prevCaption + emoji);
	};

	return (
		<>
			<Tooltip
				hasArrow
				label={"Create"}
				placement='right'
				ml={1}
				openDelay={500}
				display={{ base: "block", md: "none" }}
			>
				<Flex
					alignItems={"center"}
					gap={4}
					_hover={{ bg: "whiteAlpha.400" }}
					borderRadius={6}
					p={2}
					w={{ base: 10, md: "full" }}
					justifyContent={{ base: "center", md: "flex-start" }}
					onClick={onOpen}
				>
					<CreatePostLogo />
					<Box display={{ base: "none", md: "block" }}>Create</Box>
				</Flex>
			</Tooltip>

			<Modal isOpen={isOpen} onClose={onClose} size='xl'>
				<ModalOverlay />
				<ModalContent bg={"black"} border={"1px solid gray"}>
					<ModalHeader>Create Post</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						{/* Caption Input with Emoji Picker */}
						<Flex direction="column" gap={2}>
							<Flex align="center">
								<Textarea
									placeholder='Post caption...'
									value={caption}
									onChange={(e) => setCaption(e.target.value)}
								/>

								{/* Emoji Picker */}
								<Popover isOpen={showEmojiPicker} onClose={() => setShowEmojiPicker(false)}>
									<PopoverTrigger>
										<Button size="sm" bg={"transparent"} onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
											😊
										</Button>
									</PopoverTrigger>
									<PopoverContent>
										<PopoverArrow />
										<PopoverCloseButton />
										<PopoverBody>
											<Grid templateColumns="repeat(4, 1fr)" gap={2}>
												{emojiList.map((emoji, idx) => (
													<Button key={idx} variant="ghost" onClick={() => addEmoji(emoji)}>
														{emoji}
													</Button>
												))}
											</Grid>
										</PopoverBody>
									</PopoverContent>
								</Popover>
							</Flex>

							{/* Image Selection */}
							<Input type='file' hidden ref={imageRef} onChange={handleImageChange} />
							<BsFillImageFill
								onClick={() => imageRef.current.click()}
								style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
								size={16}
							/>
							{selectedFile && (
								<Flex mt={5} w={"full"} position={"relative"} justifyContent={"center"}>
									<Image src={selectedFile} alt='Selected img' />
									<CloseButton
										position={"absolute"}
										top={2}
										right={2}
										onClick={() => setSelectedFile(null)}
									/>
								</Flex>
							)}
						</Flex>
					</ModalBody>

					<ModalFooter>
						<Button mr={3} onClick={handlePostCreation} isLoading={isLoading}>
							Post
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CreatePost;

function useCreatePost() {
	const showToast = useShowToast();
	const [isLoading, setIsLoading] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const createPost = usePostStore((state) => state.createPost);
	const addPost = useUserProfileStore((state) => state.addPost);
	const userProfile = useUserProfileStore((state) => state.userProfile);
	const { pathname } = useLocation();

	const handleCreatePost = async (selectedFile, caption) => {
		if (isLoading) return;
		if (!selectedFile) throw new Error("Please select an image");
		setIsLoading(true);

		const newPost = {
			caption,
			likes: [],
			comments: [],
			createdAt: Date.now(),
			createdBy: authUser.uid,
		};

		try {
			const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
			const userDocRef = doc(firestore, "users", authUser.uid);
			const imageRef = ref(storage, `posts/${postDocRef.id}`);

			await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
			await uploadString(imageRef, selectedFile, "data_url");
			const downloadURL = await getDownloadURL(imageRef);

			await updateDoc(postDocRef, { imageURL: downloadURL });
			newPost.imageURL = downloadURL;

			if (userProfile.uid === authUser.uid) createPost({ ...newPost, id: postDocRef.id });
			if (pathname !== "/" && userProfile.uid === authUser.uid) addPost({ ...newPost, id: postDocRef.id });

			showToast("Success", "Post created successfully", "success");
			return { ...newPost, id: postDocRef.id }; // Return the new post
		} catch (error) {
			showToast("Error", error.message, "error");
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, handleCreatePost };
}
