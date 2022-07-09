import joi from "joi";

const appointmentSchema = joi.object({
	date: joi.date().required(),
	hour: joi.number().integer().min(0).max(23).required(),
	name: joi.string().required(),
	birthDate: joi.date().required(),
	status: joi.string(),
	accomplished: joi.boolean()
});

const daySchema = joi.object({
	date: joi.date().required()
});

export {appointmentSchema, daySchema};