import appointments from "../models/AppointmentModel.js";
import appointmentAvailable from "../services/UsageRules.js";
import crypto from "crypto";
import { format} from "date-fns";
import { appointmentSchema, daySchema } from "../validators/SchemaValidator.js";

class AppointmentController {
	getAllAppointments(request, response) {
		response.json({ items: appointments });
	}
	store(request, response) {
		try{
			const appointmentValidation = appointmentSchema.validate( request.body, { abortEarly: false});
			if (appointmentValidation.error) {
				return response.status(400).json({ error: appointmentValidation.error.details.map( ({ message }) => message ), message: "Invalid data",});
			}
			const { date, hour, name, birthDate } = request.body;
			const appointment = {
				id: crypto.randomUUID(),
				accomplished: false,
				status: "",
				date: format(new Date(date), "yyyy/MM/dd"),
				birthDate: format(new Date(birthDate), "yyyy/MM/dd"),
				hour,
				name,
			};
			const availableDate = appointmentAvailable(appointment.date, appointment.hour, appointments);
			if(availableDate === "available"){
				appointments.push(appointment);
				return response.status(200).json({ message: "Appointment created" });
			}
			return response.status(403).json(availableDate);
		} catch(error){
			console.log(error);
			return response.status(500).json({ message: "Server error" });
		}
	}
	getDayAppointments(request, response) {
		try {
			const dayValidation = daySchema.validate(request.params, {abortEarly: false,});
			if (dayValidation.error) {
				return response.status(400).json({error: dayValidation.error.details.map(({ message }) => message),message: "Invalid date"});
			}
			let { date } = request.params;
			date = format(new Date(date), "yyyy/MM/dd");

			let dayAppointments = appointments.filter((appointment) => appointment.date === date);
			if (dayAppointments.length === 0) {
				return response.status(404).json({ message: "No appointments found" });
			}
			dayAppointments = dayAppointments.sort(function (x, y) { return x.hour - y.hour; });
			return response.status(200).json(dayAppointments);
		} catch (error) {
			console.log(error);
			return response.status(500).json({ message: "Server error" });
		}
	}
	async update(request, response){
		try {
			const appointmentValidation = appointmentSchema.validate(request.body,{abortEarly: false,});
			if (appointmentValidation.error) {
				return response.status(400).json({
					error: appointmentValidation.error.details.map(({ message }) => message),message: "Invalid data",});
			}
			const id = request.params.id;
			const { date, hour, accomplished, status, name, birthDate } = request.body;
			const index = appointments.findIndex((appointment) => appointment.id === id);
			if (index !== -1) {
				appointments[index] = {
					id,
					date,
					hour,
					accomplished,
					status,
					name,
					birthDate,
				};
				return response.status(200).json({ message: "Appointment updated" });
			}
			return response.status(404).json({ message: "Appointment not found" });
		} catch (error) {
			console.log(error);
			return response.status(500).json({ message: "Server error" });
		}
	}
}

export default AppointmentController;