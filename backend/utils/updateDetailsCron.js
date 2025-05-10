import cron from 'node-cron';
import { updateGFGDetails, updateCodeforcesDetails, updateLeetcodeDetails, updateCodechefDetails } from "../controllers/updateDetails.js";

export const updateDetailscron = () => {
    // Schedule task to run every hour
    cron.schedule('0 * * * *', async () => {
        try {
            console.log('Running cron job to update coding profiles...');
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