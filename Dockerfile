#FROM node:18-alpine
#
#WORKDIR /usr/src/app
#    # Install app dependencies
#COPY package.json yarn.lock ./
#
#RUN yarn install
#
#COPY . .
#    # Command to run the application
#CMD [ "yarn", "start" ]

FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn run build
CMD [ "yarn", "start" ]