import { Request, Response } from 'express';


export class UserController {
    async create(req: Request, res: Response) {
        const { name, email, password } = req.body;
        return res.json({ message: 'Usuário criado com sucesso' })
    }

    async update(req: Request, res: Response) {
        return res.json({ message: 'Usuário atualizado com sucesso' })
    }
}