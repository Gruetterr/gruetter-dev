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
RUN g++ -O2 sum.cpp -o sum
RUN g++ -O2 keygen.cpp -o keygen -lgmp
RUN g++ -O2 rsa_en.cpp -o rsa_en -lgmp
RUN g++ -O2 rsa_de.cpp -o rsa_de -lgmp

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app using Node.js
CMD ["node", "server.js"]
