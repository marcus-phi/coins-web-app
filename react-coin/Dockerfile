FROM node:alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:alpine AS runtime
RUN mkdir /app
COPY --from=build /app/build /app
RUN npm install -g serve

EXPOSE 5000

CMD [ "serve", "-s", "/app" ]