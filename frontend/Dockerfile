# -------------------
# Build Stage
# -------------------
FROM node:22-alpine AS builder

# Install pnpm globally
RUN npm install -g pnpm

# Set work directory
WORKDIR /app

# Copy dependency files first (better caching)
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN npm install && npm run build


# Copy the rest of the source code
COPY . .

# Build production assets
RUN pnpm build


# -------------------
# Production Stage
# -------------------
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
