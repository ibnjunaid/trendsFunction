# TrendsFunction
[![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github)](https://github.com/ibnjunaid/trendsFunction)


TrendsFunction is a serverless function, running on ibmcloud .

  - Fetch trends every 16 minutes 
  - Save trend to mongoDB  for futher analysis 
  - Magic


Trendsfunction is the fetcher part of [alldaytrends], This repoistory  implements the serverless functions which routinely fetches trends .



### Tech

trendsFunction uses a number of open source projects to work properly:

* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Webpack] - the build system 
* [typescript] - the typed javascript
* [ibmcloud] - Awesome place to deploy apps
* [docker] - get your code a home


### Installation

trendsFunction requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd trendsFunction
$ npm install 
```
Build and Bundle the code using webpack

```sh
$ npm run build
```

IBM Web Action pass a param object to main function as parameter, here we pass Twitter bearer token, MongoDB URI and and start and end of trends to fetch.

> Create a file params.json with following configuration 

```json
{
    "URI":"Mongo connection string here",
    "TWITTER_TOKEN":"Bearer token here",
    "START":0,
    "END":75
}
```
### Docker
trendsFunction creates a custom docker image as the images provided by ibmfunctions doesnt have mongoose.
```dockerfile
# Using ibmfunctions action-nodejs-v12 container as base
FROM  ibmfunctions/action-nodejs-v12:1.0.1
# Create a new container and add mongoose to it
RUN npm install mongoose
# Now
# Build and tag using `docker build -t <docker-username>/<container-name>:<version>`
# Push to public docker container registery `docker push <docker-username>/<container-name>:<version>`
```
# Deployment 
```sh
ibmcloud fn action create <action-name> --docker <docker-repo> -P <path-to-params.json> ./dist/bundle.js --main global.main --web true
```
License
----

GPL


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [node.js]: <http://nodejs.org>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [React.js]: <http://reactjs.org/>
   [alldaytrends]: <https://alldaytrends.com>
   [typescript]: <https://typescriptlang.org>
   [webpack]: <https://webpack.js.org>
   [ibmcloud]: <https://cloud.ibm.com/>
   [docker]: <https://docker.com>

