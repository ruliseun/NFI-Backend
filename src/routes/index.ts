import express, {Request, Response, NextFunction} from 'express';
var router = express.Router();

router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.status(200).json({message: 'Welcome to NFI Backend test project'})
});

export default router
