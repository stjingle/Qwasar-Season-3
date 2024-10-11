import {
	Button,
	Flex,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverArrow,
	PopoverCloseButton,
	PopoverBody,
	Grid,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Comment from "../Comment/Comment";
import usePostComment from "../../hooks/usePostComment";

// Example emoji list
const emojiList = ["😊", "😂", "😍", "👍", "🔥", "💯", "❤️", "🙌"];

const CommentsModal = ({ isOpen, onClose, post }) => {
	const { handlePostComment, isCommenting } = usePostComment();
	const commentsContainerRef = useRef(null); // Ref for scrolling to bottom of comments
	const [commentText, setCommentText] = useState(""); // State for managing the comment input
	const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State for toggling emoji picker

	// Add emoji to comment input
	const addEmoji = (emoji) => {
		setCommentText((prevText) => prevText + emoji);
	};

	// Handle form submission
	const handleSubmitComment = async (e) => {
		e.preventDefault();
		await handlePostComment(post.id, commentText);
		setCommentText(""); // Clear input after posting
	};

	// Scroll to the bottom when comments are updated or modal is opened
	useEffect(() => {
		const scrollToBottom = () => {
			commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
		};
		if (isOpen) {
			setTimeout(() => {
				scrollToBottom();
			}, 100);
		}
	}, [isOpen, post.comments.length]);

	return (
		<Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
			<ModalOverlay />
			<ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
				<ModalHeader>Comments</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					{/* Comments List */}
					<Flex
						mb={4}
						gap={4}
						flexDir={"column"}
						maxH={"250px"}
						overflowY={"auto"}
						ref={commentsContainerRef}
					>
						{post.comments.map((comment, idx) => (
							<Comment key={idx} comment={comment} />
						))}
					</Flex>

					{/* Comment Input Form */}
					<form onSubmit={handleSubmitComment} style={{ marginTop: "2rem" }}>
						<Flex gap={2} align="center">
							<Input
								placeholder="Comment"
								size={"sm"}
								value={commentText} // Controlled input value
								onChange={(e) => setCommentText(e.target.value)} // Update input value
							/>

							{/* Emoji Picker Button */}
							<Popover
								isOpen={showEmojiPicker}
								onClose={() => setShowEmojiPicker(false)}
							>
								<PopoverTrigger>
									<Button
										size="sm"
										onClick={() => setShowEmojiPicker(!showEmojiPicker)}
									>
										😊
									</Button>
								</PopoverTrigger>
								<PopoverContent>
									<PopoverArrow />
									<PopoverCloseButton />
									<PopoverBody>
										{/* Emoji Grid */}
										<Grid templateColumns="repeat(4, 1fr)" gap={2}>
											{emojiList.map((emoji, idx) => (
												<Button
													key={idx}
													variant="ghost"
													onClick={() => addEmoji(emoji)}
												>
													{emoji}
												</Button>
											))}
										</Grid>
									</PopoverBody>
								</PopoverContent>
							</Popover>
						</Flex>

						{/* Post Button */}
						<Flex w={"full"} justifyContent={"flex-end"}>
							<Button
								type="submit"
								ml={"auto"}
								size={"sm"}
								my={4}
								isLoading={isCommenting}
							>
								Post
							</Button>
						</Flex>
					</form>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default CommentsModal;
