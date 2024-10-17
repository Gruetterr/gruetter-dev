# Use an official Node.js runtime as a parent image
FROM node:16-slim

# Install g++ and GMP
RUN apt-get update && \
    apt-get install -y g++ libgmp-dev && \
    apt-get clean

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Compile the C++ program
RUN g++ sum.cpp -o your_program

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app using Node.js
CMD ["node", "server.js"]