import cron from 'node-cron';
import axios from 'axios';
import { checkuser, updateGFGDetails, updateCodeforcesDetails, updateLeetcodeDetails, updateCodechefDetails } from "../controllers/updateDetails.js";

// Configuration
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 10000; // 5 seconds between retries
// const SERVICES_TO_PING = [
//     { name: 'FastAPI', url: 'https://portfolio-f8h9.onrender.com/health' },
//     { name: 'Frontend', url: 'https://williams-portfolio.onrender.com/' }
// ];

// Helper function with retry logic
async function withRetries(fn, taskName, maxRetries = MAX_RETRIES) {
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const result = await fn();
            if (attempt > 1) {
                console.log(`[${taskName}] Succeeded after ${attempt} attempts`);
            }
            return result;
        } catch (error) {
            lastError = error;
            console.warn(`[${taskName}] Attempt ${attempt} failed: ${error.message}`);

            if (attempt < maxRetries) {
                console.log(`[${taskName}] Retrying in ${RETRY_DELAY_MS / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
            }
        }
    }

    throw lastError;
}

export const updateDetailscron = () => {
    console.log('Starting cron job to update coding profiles...');

    cron.schedule('*/15 * * * *', async () => {
        console.log('Running cron job to update coding profiles...');

        const updateTasks = [
            { name: 'User Check', fn: () => checkuser('code__void') },
            { name: 'Codeforces', fn: () => updateCodeforcesDetails('code__void') },
            { name: 'GFG', fn: () => updateGFGDetails('code__void') },
            { name: 'Leetcode', fn: () => updateLeetcodeDetails('code__void') },
            { name: 'Codechef', fn: () => updateCodechefDetails('codevoid048') }
        ];

        for (const task of updateTasks) {
            try {
                await withRetries(task.fn, task.name);
                console.log(`[${task.name}] Update successful`);
            } catch (error) {
                console.error(`[${task.name}] Final attempt failed:`, error.message);
                // Here you could add notification logic (Slack, email, etc.)
            }
        }

        console.log('Profile update cycle completed');
    });
};

// export const pingService = () => {
//     console.log('Starting ping service...');

//     cron.schedule('*/10 * * * *', async () => {
//         console.log('Running ping service...');

//         for (const service of SERVICES_TO_PING) {
//             try {
//                 await withRetries(
//                     () => axios.get(service.url, { timeout: 10000 }),
//                     `${service.name} Ping`
//                 );
//                 console.log(`[${service.name}] Ping successful`);
//             } catch (error) {
//                 console.error(`[${service.name}] Ping failed after ${MAX_RETRIES} attempts:`, error.message);
//                 // Add notification logic here if needed
//             }
//         }
//     });
// };