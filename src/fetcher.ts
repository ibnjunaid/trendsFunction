import axios from 'axios';
import { frontEndResponse, Trend, trend, twitterResponse } from './utils/interfaces';
import { trendModel } from './Trend.Model'


export async function fetchAndSaveTrends(Woeid:number,Token:String) {
    try {
        //Set Twitter API token Here 
        axios.defaults.headers.common['Authorization'] = Token; 

        //fetch and parse data
        const responseData = await getTrendsByCountry(Woeid);

        //if responseData is returned, implies that the woeid exist 
        if(responseData) {

            // Add data to that model
            const trendresponseData = new trendModel({
                trends : responseData?.trends,
                as_of : responseData?.as_of,
                woeid: responseData.location[0].woeid,
                name : responseData.location[0].name                
            });
        
            // Save the model to the databaseName
            const savedDoc = await trendresponseData.save();

            if (savedDoc){
                console.log(`Data Saved with id : ${savedDoc._id} in ${savedDoc.collection.name} at ${new Date()}`);
                return({ id : savedDoc._id  ,collection: savedDoc.collection.name,  date: new Date() });
            }
    }
        
    }catch (error) {
        throw error;
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
        if(err?.response.status === 400){
            console.error('Invalid token ')
        } else if( err?.response.status === 429){
            console.error('Too Many request try to handle Rate limit');
        }
        throw err;
    }
}


function parseResponse(responseData:twitterResponse){
    const Response : frontEndResponse = {
        trends : responseData.trends.map((d,i) => parseTrend(d,i)),
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
