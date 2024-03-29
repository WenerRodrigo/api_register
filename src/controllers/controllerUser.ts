import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });

      res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar usuário" });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { email, password } = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id, 10) },
        data: {
          email,
          password,
        },
      });
      res
        .status(200)
        .json({ message: "Usuário atualizado com sucesso", user: updatedUser });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await prisma.user.delete({
        where: { id: parseInt(id, 10) },
      });

      res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao deletar usuário" });
    }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id, 10) },
      });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar usuário" });
    }
  }
}
