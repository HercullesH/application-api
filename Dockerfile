FROM node:18.17

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if using npm) to the working directory
COPY package.json ./

# Install project dependencies
RUN npm install

# Copy all the application files to the container's working directory
COPY . .

# Expose the port that your NestJS application is running on (change this to your specific port)
EXPOSE 3001