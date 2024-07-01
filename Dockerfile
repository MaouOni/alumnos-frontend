# Stage 1: Build the Angular application
FROM node:14-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Ensure Angular CLI is globally installed and executable
RUN npm install -g @angular/cli@11.2.19
RUN chmod +x /usr/local/bin/ng

# Copy the rest of the application code
COPY . .

# Build the application
RUN ng build --prod

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

COPY --from=build /app/dist/alumnos-frontend /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
