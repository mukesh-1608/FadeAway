# Use the official nginx image (lightweight Alpine version)
FROM nginx:alpine

# Delete default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy all your files to nginx's serving directory
COPY . /usr/share/nginx/html

# Expose port 80 (default HTTP port for nginx)
EXPOSE 80

# nginx starts automatically when container runs