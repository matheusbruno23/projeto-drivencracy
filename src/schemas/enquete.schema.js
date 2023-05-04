import Joi from "joi";
import dayjs from "dayjs";
// _id / title / expireAt

export const enqueteSchema = Joi.object({
    title: Joi.string().required(),
    expireAt: Joi.string()
})