FROM node:20.18-bookworm AS build

WORKDIR /app

COPY . .
RUN npm install && npm run web-build

FROM nginx:latest

COPY --from=build /app/build /usr/share/nginx/html

# Use sed to insert the map block defining expires headers in Nginx
RUN sed -i '/http {/a \\n    # Expires map\n    map $sent_http_content_type $expires {\n        default              off;\n        text/html            epoch;\n        text/css             24h;\n        application/javascript  24h;\n        ~image/              max;\n        ~font/               max;\n    }' /etc/nginx/nginx.conf

# Use sed to add the try_files directive to the location / block in default.conf
RUN sed -i '/index index.html index.htm;/a \        try_files $uri /index.html;' /etc/nginx/conf.d/default.conf

# Use sed to apply the expires headers in Nginx
RUN sed -i '/^}$/i \    expires $expires;' /etc/nginx/conf.d/default.conf
