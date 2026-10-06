# 1. Pull the official, lightweight Node.js runtime environment
FROM node:24-alpine

# 2. Set the working directory inside the container's virtual file system
WORKDIR /app

# 3. Copy manifest files first to take advantage of Docker layer caching
COPY package*.json ./

# 4. Install production dependencies inside the container
RUN npm install

# 5. Copy the backend server application source code
COPY backend/ ./backend/

# 6. Inform the container engine that the app daemon binds to port 5000
EXPOSE 5000

# 7. Set the execution directive to launch our server
CMD ["node", "backend/server.js"]
