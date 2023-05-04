import Joi from "joi";
// _id / title / enqueteId

export const opcaoSchema = Joi.object({
    title: Joi.string().required()
})