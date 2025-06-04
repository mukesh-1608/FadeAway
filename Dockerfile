# Use the official nginx image
FROM nginx:alpine

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy the frontend code into nginx's public folder
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80