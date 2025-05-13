import cron from 'node-cron';
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