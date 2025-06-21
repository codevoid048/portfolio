import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import { updateDetailscron, pingService } from './utils/updateDetailsCron.js';

dotenv.config();

connectDB();

// run cron jobs
updateDetailscron();
//pingService();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });