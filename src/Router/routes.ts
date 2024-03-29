import { Router } from 'express';
import { UserController } from '../controllers/controllerUser';


const router = Router();
const userController = new UserController();

router.get('/user', userController.getById);
router.post('/user', userController.create);
router.put('/user/:id', userController.update);
router.delete('/user/:id', userController.delete);


export { router }