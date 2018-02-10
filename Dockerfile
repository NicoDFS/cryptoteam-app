FROM node:latest

# container will run on port 5000
EXPOSE 5000 

CMD npm install && npm run production

# To run this container image: 
# First build it with command: docker build .
# Then run the image with command: docker run -p PORT_YOU_WANT:5000 IMAGE_ID_HERE
