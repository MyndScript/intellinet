FROM node:18-alpine

LABEL org.mindscript.project="mindsql"
LABEL org.mindscript.component="database"

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy MindSQL source
COPY . .

# Create data and config directories
RUN mkdir -p /var/lib/mindsql/data /etc/mindsql

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:27017/health || exit 1

EXPOSE 27017

CMD ["npm", "run", "start"]