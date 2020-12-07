import mongoose = require("mongoose");
import {fetchAndSaveTrends} from './fetcher';
import woeidList from './data/WOEID.json';
import { Params } from "./Commons/interfaces";


export default function main(params:Params){
    const conn = mongoose.connect(params.URI,{useNewUrlParser:true,useUnifiedTopology:true});
    const token = params.TWITTER_TOKEN
    const start = params.START
    const end = params.END;
    return distributeWork(conn,token,start,end).then((d)=>{
        return {body: d };
    })
}

async function distributeWork(conn: Promise<typeof mongoose>,token: String,start: number,end:number){
    return Promise.all(
        woeidList.filter((_,i) => i >= start && i < end).map(async(d,_)=> await fetchAndSaveTrends(d.woeid,conn,token))
    )
}

const globalAny : any = global;
globalAny.main = main