import express from "express";
import router from "./routes/AppointmentRouter.js";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
	console.log(`Server Running on PORT: ${PORT}`);
});