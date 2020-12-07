# Using ibmfunctions action-nodejs-v12 container as base
FROM  ibmfunctions/action-nodejs-v12:1.0.1
# Create a new container and add mongoose to it
RUN npm install mongoose
# Now
# Build and tag using `docker build -t <docker-username>/<container-name>:<version>`
# Push to public docker container registery `docker push <docker-username>/<container-name>:<version>`