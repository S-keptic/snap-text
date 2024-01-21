import express from 'express';
import userController from '../controllers/userController.js';
import textController from '../controllers/textController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/user/notes', userController.fetchNotes);
router.post('/user/upload', upload.single('image'), userController.uploadImage);


export default router;
