import Joi from "joi";

const userSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    cpf: Joi.string().required(),
    phone: Joi.string().required(),
    cep: Joi.string().required(),
    address: Joi.string().required(),
    houseNumber: Joi.string().required(),
    complement: Joi.string().allow(''),
    neighborhood: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    addressRef: Joi.string().allow('')
});

export default userSchema;
