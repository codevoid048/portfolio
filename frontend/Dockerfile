FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .

RUN pnpm build
EXPOSE 3000

# Start production server
CMD ["pnpm", "start"]

# dev server
# CMD ["pnpm", "dev"]

