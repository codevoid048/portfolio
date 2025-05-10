import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String },

    codeforces: {
        username: { type: String, required: true },
        rank: String,
        rating: Number,
        problemsSolved: Number
    },

    leetcode: {
        username: { type: String, required: true },
        rank: Number,
        rating: Number,
        problemsSolved: Number
    },

    gfg: {
        username: { type: String, required: true },
        rank: Number,
        rating: Number,
        problemsSolved: Number
    },

    codechef: {
        username: { type: String, required: true },
        rank: Number,
        rating: Number,
        stars: String,
    },

    lastUpdated: { type: Date, default: Date.now }
});

export const User = mongoose.model("User", userSchema);