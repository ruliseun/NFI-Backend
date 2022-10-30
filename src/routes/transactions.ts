import express, {Request, Response, NextFunction} from 'express';
import { Deposit, FundAcount, Withdraw } from '../controller/transactionController';
import { auth } from '../middleware/auth';

var router = express.Router();

router.post('/creditAccount', auth, FundAcount);
router.post('/deposit', auth, Deposit);
router.post('/withdraw', auth, Withdraw);

export default router
