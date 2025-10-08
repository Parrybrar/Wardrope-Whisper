export const config = {
  port: Number(process.env.PORT || 4000),
  jwtSecret: process.env.JWT_SECRET || 'devsecret',
  aiServiceUrl: process.env.AI_SERVICE_URL || 'http://localhost:8000'
};


