function appointmentAvailable(date, hour, appointments){
	const totalDay = appointments.filter((appointment) => appointment.date === date);
	if(totalDay.length < 20){
		const totalHour = totalDay.filter((appointment) => appointment.hour === hour);
		if(totalHour.length < 2){
			return "available";
		}
		return {message: "Limit per scheduling hour exceeded."};
	}
	return {message: "Daily scheduling limit exceeded."};
}

export default appointmentAvailable;