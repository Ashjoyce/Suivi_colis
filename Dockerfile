# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build React app
RUN npm run build

# Stage 2: Runtime
FROM node:18-alpine

WORKDIR /app

# Copy backend package files
COPY backend/package.json backend/package-lock.json ./backend/

# Install backend dependencies
RUN cd backend && npm install --production && cd ..

# Copy built frontend
COPY --from=builder /app/dist ./dist

# Copy backend files
COPY backend/ ./backend/

# Expose port
EXPOSE 5000

# Set environment
ENV NODE_ENV=production

# Start backend server
CMD ["node", "backend/server.js"]
