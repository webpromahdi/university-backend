import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

//will call controller func
router.post('/create-student', userControllers.createStudent);

export const UserRoutes = router;
