import axios from 'axios';
import { User } from '../models/User.js';
import { getGFGdata } from '../utils/gfgService.js';

const createUser = async (name) => {
    try {
        const user = new User({
            name: name,
            codeforces: {
                username: 'code__void'
            },
            leetcode: {
                username: 'code__void'
            },
            gfg: {
                username: 'code__void'
            },
            codechef: {
                username: 'codevoid048'
            }
        });
        await user.save();
        return user;
    } catch (error) {
        console.error(`Error creating user: ${error}`);
        return null;
    }
}

const checkuser = async (name) => {
    try {
        const user = await User.findOne({ 'name': name });
        if (!user) {
            await createUser("code__void");
        }
        return;
    }
    catch (error) {
        console.error(`Error checking user: ${error}`);
        return null;
    }
}

export const updateGFGDetails = async (username) => {
    try {
        await checkuser(username);
        const gfgData = await getGFGdata(username);
        if (gfgData.error) {
            console.error(`Error fetching GFG data for user ${username}: ${gfgData.error}`);
        }
        const user = await User.findOne({ 'gfg.username' : username });
        if (!user) {
            console.error(`User not found for username: ${username}`);
            return;
        }

        user.gfg.problemsSolved = gfgData.total_problems_solved || user.gfg.problemsSolved || 0;
        user.gfg.rank = gfgData.institute_rank || user.gfg.rank || 0;
        user.gfg.rating = gfgData.rating || user.gfg.rating || 0;
        user.gfg.lastUpdated = new Date();

        await user.save();
    } catch (error) {
        console.error('Error fetching GFG data:', error);
        return null;
    }
}

export const updateCodeforcesDetails = async (username) => {
    try {
        await checkuser(username);
        const user = await User.findOne({ 'codeforces.username': username });

        if (!user) {
        return res.status(404).json({ error: "User not found" });
        }
        const response = await axios.get(`https://codeforces.com/api/user.status?handle=${username}`);
        const submissions = response.data.result;
        const userInfoResponse = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`);
        const userInfo = userInfoResponse.data.result[0];

        let solvedProblems = new Set();
        submissions.forEach((submission) => {
        if (submission.verdict === "OK") {
            let problemId = `${submission.problem.contestId}-${submission.problem.index}`;
            solvedProblems.add(problemId);
        }
        });

        const totalSolved = solvedProblems.size;
        user.codeforces.problemsSolved = totalSolved || user.codeforces.problemsSolved || 0;
        user.codeforces.rating = userInfo.rating || user.codeforces.rating || 0;
        user.codeforces.rank = userInfo.rank || user.codeforces.rank || 0;
        user.codeforces.lastUpdated = new Date();

        await user.save();
    } catch (error) {
        console.error('Error fetching Codeforces data:', error);
        return null;
    }
}

export const updateLeetcodeDetails = async (username) => {
    try {
        await checkuser(username);
        const user = await User.findOne({ 'leetcode.username': username });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const url = `https://leetcode.com/graphql`;
        const query = {
            query: `query ($username: String!) {
                    matchedUser(username: $username) {
                        username
                        profile {
                        realName
                        ranking
                        starRating
                        }
                        submitStats: submitStatsGlobal {
                        acSubmissionNum {
                            difficulty
                            count
                            submissions
                        }
                        }
                    }
                    userContestRanking(username: $username) {
                        rating
                    }
                }`,
            variables: { username }
        };
        const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' };
        const response = await axios.post(url, query, { headers});

        if (!response.data.data.matchedUser) {
            return res.status(400).json({ error: 'Invalid LeetCode username' });
        }
        const responseData = response.data.data;
        user.leetcode.rating = Math.floor(responseData?.userContestRanking?.rating) || user.leetcode.rating || 0;
        user.leetcode.rank = responseData?.matchedUser?.profile?.ranking || user.leetcode.rank || 0;
        const stats = responseData?.matchedUser?.submitStats?.acSubmissionNum || [];
        user.leetcode.problemsSolved = stats.find(s => s.difficulty === "All")?.count || user.leetcode.problemsSolved || 0;
        user.leetcode.lastUpdated = new Date();

        await user.save();
    } catch (error) {
        console.error('Error fetching Leetcode data:', error);
        return null;
    }
}

export const updateCodechefDetails = async (username) => {
    try {
        await checkuser(username);
        const user = await User.findOne({ 'codechef.username': username });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        const response = await axios.get(`https://codechef-api.vercel.app/handle/${username}`);
        const { currentRating, globalRank, stars } = response.data;

        user.codechef.stars = stars || user.codechef.stars || 0;
        user.codechef.rating = currentRating || user.codechef.rating || 0;
        user.codechef.rank = globalRank || user.codechef.rank || 0;
        user.codechef.lastUpdated = new Date();

        await user.save();
    } catch (error) {
        console.error('Error fetching CodeChef data:', error);
        return null;
    }
}