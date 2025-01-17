# Use the official Node.js image as the base image
FROM node:23

# Set the working directory in the container
WORKDIR /app/backend

# Copy the package.json and package-lock.json files to the working directory
COPY backend/package*.json ./backend/

# Install backend dependencies
RUN npm install

# Copy the entire backend directory to the working directory
COPY backend ./backend

# Expose the port the app runs on
EXPOSE 5001

# Command to run the application
CMD ["node", "backend/server.js" , "npm" , "start"]  # Update this if your main file is different
