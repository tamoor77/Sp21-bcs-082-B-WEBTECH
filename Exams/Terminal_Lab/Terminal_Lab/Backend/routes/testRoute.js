import express from 'express'
import { testController } from '../controller/testController.js';

//route object
const router=express.Router();

//routes
router.get('/test',testController);










export default router;