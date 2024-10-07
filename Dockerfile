# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application for production
RUN npm run build

# Serve the build folder using a simple HTTP server
RUN npm install -g serve

# Expose port 3000 (the default port for serve)
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "build"]