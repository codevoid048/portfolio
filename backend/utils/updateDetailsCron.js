import cron from 'node-cron';
import axios from 'axios';
import { checkuser, updateGFGDetails, updateCodeforcesDetails, updateLeetcodeDetails, updateCodechefDetails } from "../controllers/updateDetails.js";

export const updateDetailscron = () => {
    // Schedule task to run every 15 minutes
    console.log('Starting cron job to update coding profiles...');
    cron.schedule('*/15 * * * *', async () => {
        try {
            console.log('Running cron job to update coding profiles...');
            await checkuser('code__void');
            await updateCodeforcesDetails('code__void');
            await updateGFGDetails('code__void');
            await updateLeetcodeDetails('code__void');
            await updateCodechefDetails('codevoid048');
            console.log('Profile details updated!');
        }
        catch (error) {
            console.error('Error updating coding profiles:', error);
        }
    });
}

export const pingService = () => {
    // Schedule ping to FastAPI every 5 minutes
    cron.schedule('*/5 * * * *', async () => {
        try {
            console.log('Pinging FastAPI...');
            await axios.get("https://portfolio-f8h9.onrender.com/health");
            await axios.get("https://williams-portfolio.onrender.com/");
            console.log('FastAPI pinged successfully!');
        } catch (error) {
            console.error('Error pinging FastAPI:', error);
        }
    });
}