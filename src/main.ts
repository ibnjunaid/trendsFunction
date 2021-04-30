import axios from "axios";
import mongoose = require("mongoose");
import {fetchAndSaveTrends} from './fetcher';
import { Params } from "./utils/interfaces";


export default async function main(params:Params){
    try {
        let woeidList = (await (await axios.get('https://trendsend.herokuapp.com/place/get-all-places')).data).places ;
        woeidList = woeidList.slice(params.START,params.END)
        mongoose.connect(params.URI,{useNewUrlParser:true,useUnifiedTopology:true});
        const d = await distributeWork(params.TWITTER_TOKEN,  woeidList);
        console.log("Done");
        return { error: null, body: d };   
    } catch (error) {
        return {error : error, body: null};
    }
}

async function distributeWork(token: String,woeidList){
    return Promise.all(
        woeidList.map(async(d,_)=> await fetchAndSaveTrends(d.woeid,token))
    )
}
 
const globalAny : any = global;
globalAny.main = main 
