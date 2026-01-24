# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package files for workspaces
COPY package*.json ./
COPY libs/shared/package*.json ./libs/shared/
COPY backend/whisperflow-backend/package*.json ./backend/whisperflow-backend/

# Install all dependencies
RUN npm ci

# Copy source code
COPY libs/shared ./libs/shared
COPY backend/whisperflow-backend ./backend/whisperflow-backend

# Build shared library first, then backend
RUN npm run build -w @whisperflow/shared
RUN npm run build -w whisperflow-backend

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files for production install
COPY package*.json ./
COPY libs/shared/package*.json ./libs/shared/
COPY backend/whisperflow-backend/package*.json ./backend/whisperflow-backend/

# Install only production dependencies
RUN npm ci --omit=dev

# Copy built application from builder stage
COPY --from=builder /app/backend/whisperflow-backend/dist ./dist
COPY --from=builder /app/libs/shared/dist ./libs/shared/dist

# Expose the application port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Start the application
CMD ["node", "dist/main"]
