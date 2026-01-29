FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npx playwright install firefox --with-deps

COPY . .
EXPOSE 5555
CMD ["npm", "start"]