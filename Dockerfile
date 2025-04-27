FROM node:20-slim

# ffmpeg 설치
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# 작업 디렉토리 생성
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 복사
COPY . .

# 빌드 (NestJS는 보통 build 해놓고 실행)
RUN npm run build

EXPOSE 8080

CMD ["npm", "run" ,"start"]