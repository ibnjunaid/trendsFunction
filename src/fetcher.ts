import axios from 'axios';
// import mongoose = require("mongoose");
import * as mongoose from "mongoose";

import { frontEndResponse, Trend, trend, twitterResponse } from './Commons/interfaces';
import { responseSchema } from './Trend.Model'
import { databaseName } from './Commons/Configs';
import { findPlaceByWoeid, replaceSpaceAndDotsWith_ } from './Commons/Woeid-methods';


export async function fetchAndSaveTrends(Woeid:number,conn: Promise<typeof import("mongoose")>,Token:String) {
    try {
        //Set Twitter API token Here 
        axios.defaults.headers.common['Authorization'] = Token; 

        const mongoConn = await conn;
        //Switch to trends databaseName
        mongoConn.connection.useDb(databaseName);

        //fetch and parse data
        const responseData = await getTrendsByCountry(Woeid);

        //if responseData is returned, implies that the woeid exist 
        if(responseData) {

            //find the place by Woeid
            const match  = findPlaceByWoeid(Woeid);
            //Replace spaces with _ so that it can be used for collection naming;
            const place = replaceSpaceAndDotsWith_(match?.name||'');

            //Create a model for that place   
            const trendModel = mongoose.model(place,responseSchema,place);

            // Add data to that model
            const trendresponseData = new trendModel({
                trends : responseData?.trends,
                as_of : responseData?.as_of,
                locations : responseData?.location
            });
        
            // Save the model to the databaseName
            const savedDoc = await trendresponseData.save();

            if (savedDoc){
                // console.log(`Data Saved with id : ${savedDoc._id} in ${savedDoc.collection.name} at ${new Date()}`);
                return({ id : savedDoc._id  ,collection: savedDoc.collection.name,  date: new Date() });
            }
    }
        
    }catch (error) {
        console.error(error);   
    }
    
}


/* 
    * arg : woeid - A number uniquely idenifying places 
    * fetches the data and passes to parseResponse function for adding trend index
    * and remove unnecessary data    
*/
async function getTrendsByCountry(woeid:number){
    try {
        const response = await axios.get<Array<twitterResponse>>(`https://api.twitter.com/1.1/trends/place.json?id=${woeid}`);
        return parseResponse(response.data[0]);
    }
    catch (err) {
        console.error(err);
    }
}


function parseResponse(responseData:twitterResponse){
    const Response : frontEndResponse = {
        trends : responseData.trends.map((d,i) => parseTrend(d,i)).filter((d) => d.index < 11),
        as_of : responseData.as_of,
        location : responseData.locations
    }
    return Response;
}

const parseTrend = (d:trend,i:number) => {
    let t : Trend = {
        index : i+1,
        name : d.name,
        tweet_volume : d.tweet_volume || 0,
        url : d.url
    };
    return t;
}
