// import mongoose = require("mongoose");
import * as mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
    trends : [],
    as_of : Date,
    created_at : Date,
    name : String,
    woeid : Number
},{
    timestamps : true
})
export const trendModel = mongoose.model('trend',responseSchema);
