
import express from 'express';
import multer from 'multer'; 

import userController from '../controllers/userController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/register', userController.registrationpage);
router.get('/login', userController.loginPage);
router.get('/', userController.home);
router.post('/login', userController.login);
router.post('/register', userController.userCreateDoc);
router.get('/user/dashboard', userController.dashboard);
router.post('/user/upload', upload.single('image'), userController.uploadImage);

router.get('/user/notes', userController.fetchNotes);

export default router;
