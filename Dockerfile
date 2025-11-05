# syntax=docker/dockerfile:1

FROM node:20-alpine AS builder

WORKDIR /app

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

COPY package.json pnpm-lock.yaml ./ 
COPY pnpm-workspace.yaml ./ 

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM nginx:1.27-alpine AS runner

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
