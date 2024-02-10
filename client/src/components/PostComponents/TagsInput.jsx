import React, { useState } from "react";
import { toast } from "react-hot-toast";

const TagsInput = ({ tags, setTags }) => {
    const [newTag, setNewTag] = useState("");

    const addTag = () => {
        if (tags.includes(newTag.trim())) {
            toast.error("Tag already exists");
            setNewTag("");
            return;
        }
        if (newTag.trim().length === 0) {
            toast.error("Tag cannot be empty");
            return;
        }
        if (newTag.length > 20) {
            toast.error("Tag cannot be more than 20 characters");
            setNewTag("");
            return;
        }
        if (tags.length > 5) {
            toast.error("You can not add more than 6 tags");
            setNewTag("");
            return; f
        }
        setTags([...tags, newTag.trim().replace(" ", "-")]);
        setNewTag("");
    };

    const removeTag = (tag) => {
        setTags(tags.filter((t) => t !== tag));
    };

    return (
        <div className="w-full pt-1">
            <div className="w-full p-2 flex flex-wrap">
                {tags.map((tag) => (
                    <span key={tag} className="ml-1 mr-1 mt-2">
                        <span className="border mt-[100px]  bg-gray-500/10 text-gray-800 rounded-md p-1">
                            {tag}
                            <button
                                type="button"
                                className="m-1 w-6 text-gray-600"
                                onClick={() => removeTag(tag)}
                            >
                                &times;
                            </button>
                        </span>
                    </span>
                ))}
            </div>

            {/* <!-- Input for new tag --> */}
            <div className="flex items-center mt-2">
                <input
                    className="tags-input-text outline-none flex-1 mr-2 p-2 border rounded bg-gray-500/10 text-gray-800"
                    placeholder="New tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                />

                <button
                    type="button"
                    className="rounded-lg bg-[#0444A4] w-1/4 text-white py-2"
                    onClick={addTag}
                >
                    Add
                </button>
            </div>
        </div>
    );
};

export default TagsInput;








// import React, { useState } from "react";
// import TagsInput from "./components/TagsInput";

// const App = () => {
//     const [tagsA, setTagsA] = useState([]);

//     return (
//         <div className="font-sans text-black bg-grey-lighter px-8 py-8 min-h-screen">
//             <div className="max-w-sm w-full mx-auto">
//                 <div className="mb-8">
//                     {/* <h4 className="font-semibold text-grey-darker mb-2">Layout A</h4> */}
//                     <TagsInput value={tagsA} onChange={setTagsA} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default App;