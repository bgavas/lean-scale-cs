FROM node:15.12.0

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY src /app/src

RUN yarn install

# For prod
# RUN yarn build

EXPOSE 4000

# For prod
# CMD ["yarn", "start:bundle"]

# For dev
CMD ["yarn", "watch"]
