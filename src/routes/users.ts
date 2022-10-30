import express, {Request, Response, NextFunction} from 'express';
import { LoginUser, RegisterUser } from '../controller/userController';

var router = express.Router();

/* GET users listing. */
router.post('/register', RegisterUser);
router.post('/login', LoginUser);

export default router
