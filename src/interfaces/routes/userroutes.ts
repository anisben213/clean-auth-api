import {Request, Response} from 'express';
import {Router} from 'express';
import {RegisterController} from '../controllers/usercontrollers/RegisterController';

const registerController = new RegisterController();
const router = Router();
router.post('/register',(req: Request, res: Response)=> registerController.register(req,res));

export default router;