import crypto from "crypto";

const appointments = [
	{
		id: crypto.randomUUID(),
		date: "2022/04/16",
		hour: 9,
		accomplished: false,
		status: "",
		name: "Dara",
		birthDate: "1998/08/22",
	},
];

export default appointments;