import { Router } from 'express';


const router = Router();

router.post('/user', (req, res) => {
    return res.json({ message: 'Usuário criado com sucesso' })
})


export { router }