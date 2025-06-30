# 🎬 Movie App Backend Setup Guide

## 📁 Step 1: Create Backend Project Structure

```bash
# Create new directory
mkdir tv-movie-backend
cd tv-movie-backend

# Initialize npm project
npm init -y
```

## 📦 Step 2: Install Dependencies

```bash
# Core dependencies
npm install express cors helmet morgan dotenv bcryptjs jsonwebtoken
npm install @prisma/client prisma

# TypeScript dependencies
npm install -D typescript @types/node @types/express @types/cors 
npm install -D @types/bcryptjs @types/jsonwebtoken ts-node nodemon

# Development tools
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

## 🗂️ Step 3: Project Structure

```
tv-movie-backend/
├── src/
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── movieController.ts
│   │   ├── userController.ts
│   │   └── watchlistController.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   └── validation.ts
│   ├── models/
│   │   └── index.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── movies.ts
│   │   ├── users.ts
│   │   └── watchlist.ts
│   ├── services/
│   │   ├── tmdbService.ts
│   │   ├── authService.ts
│   │   └── userService.ts
│   ├── types/
│   │   ├── auth.ts
│   │   ├── movie.ts
│   │   └── user.ts
│   ├── utils/
│   │   ├── database.ts
│   │   ├── logger.ts
│   │   └── validators.ts
│   ├── app.ts
│   └── server.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── .env
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## ⚙️ Step 4: Configuration Files

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### package.json scripts
```json
{
  "scripts": {
    "dev": "nodemon src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:seed": "ts-node prisma/seed.ts"
  }
}
```

## 🗄️ Step 5: Database Schema (Prisma)

### prisma/schema.prisma
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id          String   @id @default(cuid())
  email       String   @unique
  username    String   @unique
  password    String
  firstName   String?
  lastName    String?
  avatar      String?
  preferences Json?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  watchlists  Watchlist[]
  reviews     Review[]
  ratings     Rating[]

  @@map("users")
}

model Movie {
  id          String   @id @default(cuid())
  tmdbId      Int      @unique
  title       String
  overview    String?
  posterPath  String?
  backdropPath String?
  releaseDate DateTime?
  genres      Json?
  runtime     Int?
  voteAverage Float?
  voteCount   Int?
  popularity  Float?
  adult       Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  watchlists  Watchlist[]
  reviews     Review[]
  ratings     Rating[]

  @@map("movies")
}

model Watchlist {
  id       String @id @default(cuid())
  userId   String
  movieId  String
  status   WatchlistStatus @default(WANT_TO_WATCH)
  addedAt  DateTime @default(now())

  user     User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  movie    Movie  @relation(fields: [movieId], references: [id], onDelete: Cascade)

  @@unique([userId, movieId])
  @@map("watchlists")
}

model Review {
  id       String   @id @default(cuid())
  userId   String
  movieId  String
  content  String
  rating   Float?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user     User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  movie    Movie    @relation(fields: [movieId], references: [id], onDelete: Cascade)

  @@unique([userId, movieId])
  @@map("reviews")
}

model Rating {
  id       String   @id @default(cuid())
  userId   String
  movieId  String
  value    Float
  createdAt DateTime @default(now())

  user     User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  movie    Movie    @relation(fields: [movieId], references: [id], onDelete: Cascade)

  @@unique([userId, movieId])
  @@map("ratings")
}

enum WatchlistStatus {
  WANT_TO_WATCH
  WATCHING
  WATCHED
  DROPPED
}
```

## 🔐 Step 6: Environment Variables

### .env.example
```env
# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/movieapp"

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# TMDB API
TMDB_API_KEY=your-tmdb-api-key
TMDB_BASE_URL=https://api.themoviedb.org/3

# CORS
CORS_ORIGIN=http://localhost:5173
```

## 🚀 Step 7: Core Server Setup

### src/server.ts
```typescript
import app from './app';
import { logger } from './utils/logger';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`📱 Environment: ${process.env.NODE_ENV}`);
});
```

### src/app.ts
```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import authRoutes from './routes/auth';
import movieRoutes from './routes/movies';
import userRoutes from './routes/users';
import watchlistRoutes from './routes/watchlist';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

// Logging
app.use(morgan('combined'));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);
app.use('/api/watchlist', watchlistRoutes);

// Error handling
app.use(errorHandler);

export default app;
```

## 🔐 Step 8: Authentication Middleware

### src/middleware/auth.ts
```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    username: string;
  };
}

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, username: true }
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};
```

## 🎬 Step 9: TMDB Service

### src/services/tmdbService.ts
```typescript
import axios from 'axios';

const TMDB_BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export class TMDBService {
  static async searchMovies(query: string, page: number = 1) {
    const response = await tmdbApi.get('/search/movie', {
      params: { query, page }
    });
    return response.data;
  }

  static async getPopularMovies(page: number = 1) {
    const response = await tmdbApi.get('/movie/popular', {
      params: { page }
    });
    return response.data;
  }

  static async getMovieDetails(movieId: number) {
    const response = await tmdbApi.get(`/movie/${movieId}`);
    return response.data;
  }

  static async getMovieVideos(movieId: number) {
    const response = await tmdbApi.get(`/movie/${movieId}/videos`);
    return response.data;
  }

  static async getTrending(mediaType: 'movie' | 'tv' = 'movie', timeWindow: 'day' | 'week' = 'week') {
    const response = await tmdbApi.get(`/trending/${mediaType}/${timeWindow}`);
    return response.data;
  }
}
```

## 🎯 Next Steps:

1. **Create the backend folder** and copy these files
2. **Install dependencies** using the npm commands above
3. **Set up PostgreSQL database** (local or cloud)
4. **Configure environment variables**
5. **Run database migrations**
6. **Start the development server**

Would you like me to help you with any specific part of this setup, or shall we continue with implementing the API endpoints?
