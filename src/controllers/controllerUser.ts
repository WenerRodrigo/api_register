// UserController.ts

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
import userShema from "../shemas/userShema";

const prisma = new PrismaClient();

export class UserController {
  async create(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      password,
      cpf,
      phone,
      cep,
      address,
      houseNumber,
      complement,
      neighborhood,
      city,
      state,
      addressRef
    } = req.body;

    try {
      const { error } = userShema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      await prisma.user.create({
        data: {
          name,
          email,
          password,
          cpf,
          phone,
          cep,
          address,
          houseNumber,
          complement,
          neighborhood,
          city,
          state,
          addressRef
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
      res.status(200).json({ message: "Usuário atualizado com sucesso", user: updatedUser });
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
