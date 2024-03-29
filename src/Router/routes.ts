import { Router } from "express";
import { UserController } from "../controllers/controllerUser";
import { check } from "express-validator";

const router = Router();
const userController = new UserController();

router.get("/user", userController.getById);
router.post(
  "/user",
  [
    check("name").notEmpty(),
    check("email").isEmail(),
    check("password").notEmpty(),
    check("cpf").notEmpty(),
    check("phone").notEmpty(),
    check("cep").notEmpty(),
    check("address").notEmpty(),
    check("houseNumber").notEmpty(),
    check("neighborhood").notEmpty(),
    check("city").notEmpty(),
    check("state").notEmpty(),
  ],
  userController.create
);
router.put("/user/:id", userController.update);
router.delete("/user/:id", userController.delete);

export { router };
