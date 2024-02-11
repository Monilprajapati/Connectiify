import React, { useEffect, useState } from 'react'
import CommentCard from './CommentCard';
import { useUserContext } from '../../contexts/userContext';
import { createComment } from '../../services/commentServices';
// import { Toaster, toast } from "react-hot-toast";
// import { updateComment } from '../../services/commentServices';
import { updatePostComment } from '../../services/postServices';
import { getComments } from '../../services/commentServices';
import { useSelector } from "react-redux";


const Comments = ({ postId, setCommentCount }) => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { token } = useUserContext();
    const [visibleComments, setVisibleComments] = useState(2);
    const [commentData, setCommentData] = useState({
        description: "",
    });
    const [postComments, setPostComments] = useState([]);
    const user = useSelector((state) => state.authReducer.user);

    useEffect(() => {
        getComments(setPostComments, token, postId)
    }, [token, setPostComments, postId]);

    const handleChange = (e) => {
        e.preventDefault();
        setCommentData({ ...commentData, [e.target.name]: e.target.value });
    };

    const handleSeeMore = () => {
        setVisibleComments(prevVisibleComments => prevVisibleComments + 2); // Increase by 2 when "See more" is clicked
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await createComment(commentData, token);
            await updatePostComment(postId, response.data._id, 'comment', token);

            if (response) {
                setPostComments((prevPosts) => [...prevPosts, response.data]);
                setCommentCount(prevCount => prevCount + 1)
            }
        } catch (error) {
            console.error("Error creating post:", error);
            setError("An error occurred while creating the post");
            // toast.error(error);
        } finally {
            setLoading(false);
            setCommentData({ description: "" });
        }
    };

    return (
        <>
            <div className=" border-t border-black border-opacity-20">
                {/* <Toaster /> */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#f9f9f9] px-4 rounded-lg mt-4"
                >
                    <div className="w-full flex items-center gap-2 py-4 border-b border-[#7393B3]">
                        <img
                            src={user?.userAvatar}
                            alt={"User Image"}
                            className="w-14 h-14 rounded-full object-cover"
                        />
                        <textarea
                            name="description"
                            rows={
                                commentData.description.length < 100
                                    ? 1
                                    : commentData.description.length > 300
                                        ? commentData.description.length < 500
                                            ? 5
                                            : 8
                                        : 3
                            }
                            className={`w-full p-5 ${commentData.description.length < 100 ? "rounded-full" : "rounded-md"
                                }  bg-secondary resize-none border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-4 placeholder:text-[#666]`}
                            placeholder="Post your reply..."
                            value={commentData.description}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className={`inline-flex items-center bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm`}
                        >
                            {loading ? "Posting..." : "Post"}
                        </button>
                    </div>

                    {/* {error && toast.error(error)} */}
                </form>
            </div>

            <div className="py-1 px-2 md:px-7 lg:px-4 xl:px-3 flex flex-col gap-5  w-full">
                {postComments.length > 0 ? (
                    postComments
                        .slice(-visibleComments)
                        .reverse()
                        .map((comment) => {
                            return (
                                <CommentCard
                                    key={comment._id}
                                    commentId={comment._id}
                                    description={comment.commentData}
                                    userAvatar={comment.userAvatar}
                                    username={comment.username}
                                    upvotes={comment.upvotes}
                                    downvotes={comment.downvotes}
                                    reply={comment.reply}
                                    owner={comment.owner}
                                    createdAt={comment.createdAt}
                                />
                            );
                        })
                ) : (
                    <h1 className="text-xl mt-2 font-lato font-semibold text-center">
                        No comments available yet
                    </h1>
                )}

                {/* "See more" button */}
                {visibleComments < postComments.length && (
                    <button
                        onClick={handleSeeMore}
                        className="bg-blue-500 hover:bg-blue-700 text-blue font-bold py-2 px-4 rounded"
                    >
                        See more
                    </button>
                )}
            </div>


        </>
    )
}

export default Comments
