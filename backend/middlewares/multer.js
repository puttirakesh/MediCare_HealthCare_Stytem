import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Set up multer storage configuration
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueName + path.extname(file.originalname));
    }
});

// File filter to allow only images and videos
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|mp4|avi|mkv/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    }
    cb(new Error('Only images and videos are allowed'));
};

//multer configuration
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // limit file size to 10MB
    fileFilter: fileFilter,
    dest: uploadDir
});

export default upload;