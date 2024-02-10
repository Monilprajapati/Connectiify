import React, { useState, useRef } from "react";
import { usePostContext } from "../../contexts/postContext";
import { useUserContext } from "../../contexts/userContext";
import { BiImages } from "react-icons/bi";
import {createPostApi} from "../../services/postServices";
import { Toaster, toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import PostPreview from "./PostPreview";
import TagsInput from "./TagsInput";

const CreatePost = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const { token, open } = useUserContext();
    const { setPosts } = usePostContext();
    const [postData, setPostData] = useState({
        description: "",
        tag: "tag01",
    });
    const [tags, setTags] = useState([]);
    const postInputRef = useRef(null);

    const user = useSelector((state) => state.authReducer.user);

    const handleChange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("postImage", file);
            formData.append("description", postData.description);
            formData.append("post", postData.tag);
            const response = await createPostApi(formData, token);

            if (response) {
                toast.success("Post created successfully");
                setPosts((prevPosts) => [response.data, ...prevPosts]);
            }
        } catch (error) {
            setPostData({ description: "", tag: "tag01" });
            setFile(null);
            toast.error("Image Validation Failed");
        } finally {
            setLoading(false);
            setIsPreviewVisible(false);
            setPostData({ description: "", tag: "tag01" });
            setFile(null);
        }
    };

    return (
        <div className={`px-1 md:px-6 ${open ? "lg:px-3 xl:px-20" : "xl:px-40"}`}>
            <Toaster />
            <form
                onSubmit={handleSubmit}
                className="bg-medium-grey px-4 rounded-lg mt-4 xl:px-7"
            // encType="multipart/form-data"
            >
                <div className="w-full flex items-center gap-2 py-4 border-b border-[#7393B3]">
                    <img
                        src={user?.userAvatar}
                        alt={"User Image"}
                        className="w-14 h-14 rounded-full border border-white object-cover"
                    />
                    <textarea
                        name="description"
                        rows={
                            postData.description.length < 100
                                ? 1
                                : postData.description.length > 300
                                    ? postData.description.length < 500
                                        ? 5
                                        : 8
                                    : 3
                        }
                        className={`w-full p-5 ${postData.description.length < 100 ? "rounded-full" : "rounded-md"
                            } bg-secondary resize-none border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-4 placeholder:text-[#666]`}
                        placeholder="What's on your mind...."
                        value={postData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div id="kenil">
                    <TagsInput tags={tags} setTags={setTags} />
                </div>

                <div className="flex items-center justify-between p-4 px-2">
                    <label
                        htmlFor="imgUpload"
                        className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                    >
                        <input
                            name="postImage"
                            type="file"
                            ref={postInputRef}
                            onChange={(e) => {
                                const selectedFile = e.target.files[0];
                                setFile(e.target.files[0]);

                                if (selectedFile) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setImageUrl(reader.result);
                                        setIsPreviewVisible(true);
                                    };
                                    reader.readAsDataURL(selectedFile);
                                }
                            }}
                            className="hidden cursor-pointer"
                            id="imgUpload"
                            data-max-size="5120"
                            accept=".jpg, .png, .jpeg"
                        />
                        <BiImages />
                        <span>Image</span>
                    </label>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`inline-flex items-center bg-[#0444a4] text-white px-8 py-2 rounded-full font-semibold text-sm`}
                    >
                        {loading ? "Posting..." : "Post"}
                    </button>
                </div>
            </form>
            {isPreviewVisible && <PostPreview imageUrl={imageUrl} setIsPreviewVisible={setIsPreviewVisible} ref={postInputRef} />}
        </div>
    );
};

export default CreatePost;