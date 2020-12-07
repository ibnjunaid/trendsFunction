import woeidList from '../data/WOEID.json';

//find the place by Woeid
export function findPlaceByWoeid(Woeid :number){
    return woeidList.find((d) => d.woeid == Woeid);
}
        
//Replace spaces with _ so that it can be used for collection naming 
export function replaceSpaceAndDotsWith_(name :string) {
    const x =  name.replace(/\s/g,'_');
    return x.replace(/\./g,'_');
}