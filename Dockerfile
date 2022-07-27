# Dockerfile for the entire app

# step 1: build the React front end
FROM node:14.20.0-alpine3.16 as build-step
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./src ./src
COPY ./public ./public
COPY package.json yarn.lock ./
RUN yarn install
RUN yarn build

# step 2: build the API with the client as static files
FROM python:3.7-alpine3.16
WORKDIR /app
COPY --from=build-step /app/build ./build
COPY server/requirements.txt server/app.py server/.env ./server/
RUN pip install -r ./server/requirements.txt
ENV FLASK_ENV production
EXPOSE 8000
WORKDIR /app/server
CMD ["gunicorn", "-b", ":8000", "app:app"]