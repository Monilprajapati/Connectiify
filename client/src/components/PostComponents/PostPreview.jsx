import React from 'react'
import { IoIosClose } from "react-icons/io";

const PostPreview = ({ imageUrl, setIsPreviewVisible }, ref) => {
    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm mt-10">
            <div className='flex justify-end'>
                <CloseIcon setIsPreviewVisible={setIsPreviewVisible} />
            </div>
            <div className="flex">
                <div className="flex w-full justify-center  overflow-hidden rounded-lg px-12">
                    <img
                        src={imageUrl}
                        // width="400"
                        // height="400"
                        alt="Preview"
                        className="object-cover"
                        style={{ objectFit: 'cover' }}
                    />
                </div>
            </div>
            <div className="flex items-center p-6">
                <div className="flex w-full items-center justify-center">
                    <button
                        type="submit"
                        className={`inline-flex items-center bg-[#0444a4] text-white px-8 py-2 rounded-full font-semibold text-sm`}
                        onClick={e => {
                            e.preventDefault();
                            ref.current.click();
                        }}
                    >
                        Retake
                    </button>

                </div>
            </div>
        </div>
    );
};

export default React.forwardRef(PostPreview);


const CloseIcon = ({ setIsPreviewVisible }) => {
    return (
        <div
            className='text-black flex justify-end mr-1 w-fit items-end cursor-pointer hover:bg-darkslategray hover:text-white hover:rounded-3xl m-2'
            onClick={e => {
                e.preventDefault();
                setIsPreviewVisible(false);
                setImageUrl(null);
            }}
        >


            <IoIosClose size={35} />
        </div>
    )
}