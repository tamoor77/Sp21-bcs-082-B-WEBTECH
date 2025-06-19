import express from 'express'
import { loginController, logoutController, profileController, registerController, updatePassword, updateProfileController, updateProfilePic } from '../controller/userController.js';
import { isAuth } from '../middleware/authMiddleware.js';
import { singleUpload } from '../middleware/multer.js';

//router object
const router=express.Router()

//routes
router.post('/register',registerController)
//login route
router.post('/login', loginController)

//profile route
router.get('/profile',isAuth, profileController);
//logout route
router.get('/logout', logoutController);
//update profiel
router.put('/update-profile',isAuth,updateProfileController)
//update Password
router.put('/update-password',isAuth,updatePassword)
//update profile pic
router.put('/update-profilePic',isAuth,singleUpload,updateProfilePic)
//export
export default router;