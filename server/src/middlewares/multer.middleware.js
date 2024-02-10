import multer from "multer";

const limits = {
    fileSize: 5 * 1024 * 1024 // 5MB
};

const storage = multer.diskStorage({
    // destination is the folder where the file will be stored
    destination: (req, file, cb) => { // cb is a callback function
        cb(null, "./public/temp"); // takes two parameters, first is error, second is the path(string)
    },

    // filename is the name of the file
    filename: (req, file, cb) => { // cb is a callback function
        cb(null, file.originalname); // takes two parameters, first is error, second is the path(string)
    }
});

export const upload = multer({
    storage,
    limits
});