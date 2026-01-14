FROM node:16-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --only=dev

COPY . .

RUN npm run build

FROM node:16-alpine AS runtime

WORKDIR /app

COPY --from=build /app/dist ./dist

EXPOSE 3030

CMD ["npm", "start"]
