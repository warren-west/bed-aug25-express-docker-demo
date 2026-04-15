# Use the official Node.js Alpine image for a smaller footprint
FROM node:20-slim

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files first to leverage Docker's cache layers
# Even though you have node_modules locally, we install them in the 
# container to ensure OS-level compatibility.
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the rest of your application code
COPY . .

# Expose the port your Express app runs on (usually 3000 or 8080)
EXPOSE 3000

# Define the command to run your app
CMD [ "node", "server.js" ]