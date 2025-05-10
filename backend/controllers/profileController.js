import { User } from '../models/User.js';

export const getCodingProfileDetails = async (req, res) => {
    const { name } = req.params;

    try {
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const profileDetails = {
            name: user.name,
            codeforces: user.codeforces,
            leetcode: user.leetcode,
            gfg: user.gfg,
            codechef: user.codechef
        };

        return res.status(200).json(profileDetails);

    } catch (err) {
        console.error('Error fetching coding profile:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};

