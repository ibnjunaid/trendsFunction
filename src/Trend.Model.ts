// import mongoose = require("mongoose");
import * as mongoose from "mongoose";

// export const trendSchema = new mongoose.Schema({
//     index :Number,
//     name : String,
//     url : String,
//     tweet_volume : Number
// })

// let locationSchema = new mongoose.Schema({
//     name : String,
//     woeid : Number,
// })

export let responseSchema = new mongoose.Schema({
    trends : [],
    as_of : Date,
    created_at : Date,
    locations: []
})
