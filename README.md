# 🎬 TV Movie List

> A modern, responsive web application for discovering movies and TV shows with advanced features like favorites, ratings, and detailed information.

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5.66.0-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query)

## 🌟 Features

### 🎯 Core Features
- **🔍 Smart Search**: Search across movies and TV shows with real-time results
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **⭐ Favorites System**: Add/remove items from your personal favorites list
- **🎭 Detailed Information**: View comprehensive movie/TV show details with trailers
- **🌈 Color-Coded Ratings**: Visual rating system with color-coded indicators
- **🎬 Multiple Categories**: Browse popular, trending, top-rated, and recently added content

### 🎨 User Experience
- **🎯 Intuitive Navigation**: Clean, modern navigation with mobile-friendly menu
- **⚡ Fast Loading**: Optimized performance with lazy loading and caching
- **🎪 Interactive Elements**: Smooth animations and hover effects
- **🌙 Dark/Light Mode**: Automatic theme detection and support
- **♿ Accessibility**: ARIA labels and keyboard navigation support

### 🔧 Technical Features
- **📊 Infinite Scrolling**: Seamless content loading as you browse
- **🎥 YouTube Integration**: Watch trailers directly in the app
- **🚀 Modern Architecture**: Built with React 19, TypeScript, and Vite
- **📱 Progressive Web App**: Installable and works offline
- **🔄 State Management**: Efficient data fetching with TanStack Query

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **TMDB API Key** (free from [The Movie Database](https://www.themoviedb.org/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tv-movie-list.git
   cd tv-movie-list
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file and add your API keys:
   ```
   VITE_API_KEY=your_tmdb_api_key_here
   VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
   ```

   **Get your API keys:**
   - **TMDB API Key**: Sign up at [The Movie Database](https://www.themoviedb.org/settings/api)
   - **YouTube API Key**: Get it from [Google Cloud Console](https://console.developers.google.com/)

4. **Start the development server**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_KEY=your_tmdb_api_key_here
   ```
   
   > 🔑 **Get your API key**: Visit [TMDB API](https://www.themoviedb.org/settings/api) to obtain your free API key

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application

## 📱 Usage Guide

### 🏠 Home Page
- Browse multiple categories of movies and TV shows
- Horizontal scrolling lists for easy browsing
- Quick access to popular and trending content

### 🔍 Search
- Search for specific movies or TV shows
- Real-time search results
- Filter by categories and ratings

### ⭐ Favorites
- Click the star icon on any movie/TV card to add to favorites
- Access your favorites from the navigation menu
- Remove items by clicking the filled star

### 🎬 Movie Details
- Click on any movie/TV card to view detailed information
- Watch trailers directly in the app
- See ratings, release dates, and full descriptions
- Add/remove from favorites in the modal

### 📊 Ratings System
- **🟢 Green (8.0+)**: Excellent content
- **🟡 Yellow (6.5-7.9)**: Good content
- **🟠 Orange (5.0-6.4)**: Average content
- **🔴 Red (<5.0)**: Poor content

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🚀 Deployment

### Vercel (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Add environment variables setup"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [Vercel](https://vercel.com) and connect your GitHub account
   - Import your repository
   - Vercel will automatically detect it's a Vite project

3. **Set up environment variables in Vercel**
   - In your Vercel dashboard, go to your project settings
   - Navigate to "Environment Variables"
   - Add the following variables:
     ```
     VITE_API_KEY=your_tmdb_api_key_here
     VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
     ```
   - Make sure to set them for all environments (Production, Preview, and Development)

4. **Redeploy**
   - After adding environment variables, trigger a new deployment
   - Your app should now work properly with the API keys

### Alternative: Manual Environment Variable Setup

If you prefer to set up environment variables manually:

1. **In Vercel Dashboard:**
   - Go to your project → Settings → Environment Variables
   - Add `VITE_API_KEY` with your TMDB API key
   - Add `VITE_YOUTUBE_API_KEY` with your YouTube API key

2. **Important Notes:**
   - ⚠️ **Never commit your `.env` file** - it's already in `.gitignore`
   - 🔑 **Environment variables must start with `VITE_`** in Vite projects
   - 🔄 **Redeploy after adding variables** for changes to take effect

## 🏗️ Project Structure

```
tv-movie-list/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── UI/             # Generic UI components
│   │   ├── MovieList/      # Movie listing components
│   │   ├── MainNavigation/ # Navigation components
│   │   └── FavoritesList/  # Favorites management
│   ├── pages/              # Page components
│   ├── services/           # API services
│   ├── util/               # Utility functions and hooks
│   ├── interface/          # TypeScript interfaces
│   └── layouts/            # Layout components
├── public/                 # Static assets
├── .env                    # Environment variables
└── README.md              # This file
```

## 🔧 Technical Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **CSS Modules** - Scoped styling with modern CSS

### State Management
- **TanStack Query** - Data fetching and caching
- **React Router** - Client-side routing
- **React Hooks** - Local state management

### External APIs
- **TMDB API** - Movie and TV show data
- **YouTube API** - Trailer integration

## 🎨 Design Features

### Color Scheme
- **Primary**: Netflix-inspired red (#e50914)
- **Background**: Dark theme with glass-morphism effects
- **Accent**: Gold stars for favorites (#ffd700)
- **Text**: High contrast white/dark text

### Components
- **Glass-morphism**: Modern frosted glass effects
- **Smooth Animations**: CSS transitions and transforms
- **Responsive Grid**: Flexible layouts for all screen sizes
- **Interactive Elements**: Hover effects and micro-interactions

## 🚀 Performance Optimizations

- **Lazy Loading**: Images and components load on demand
- **Caching**: Efficient data caching with TanStack Query
- **Code Splitting**: Optimized bundle sizes
- **Image Optimization**: WebP support and responsive images
- **Debounced Search**: Reduced API calls during typing

## 🔮 Future Enhancements

### Planned Features
- **🔐 User Authentication**: Personal accounts and sync
- **📊 Advanced Filtering**: Genre, year, rating filters
- **🎭 Watchlist**: Separate list for "want to watch" items
- **📱 PWA Features**: Offline support and push notifications
- **🌐 Social Features**: Share favorites and ratings

### Backend Integration
- **User Management**: Registration and authentication
- **Data Persistence**: Save favorites and preferences
- **Recommendations**: Personalized content suggestions
- **Analytics**: Usage tracking and insights

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_KEY` | TMDB API key for fetching movie data | Yes |

## 🐛 Troubleshooting

### Common Issues

**API Key Not Working**
- Ensure your TMDB API key is correct
- Check that the environment variable is properly set
- Verify the API key has the required permissions

**Build Failures**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version compatibility
- Ensure all dependencies are properly installed

**Performance Issues**
- Check browser console for errors
- Verify internet connection for API calls
- Clear browser cache and cookies

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[The Movie Database (TMDB)](https://www.themoviedb.org/)** for providing the movie data API
- **[React Team](https://reactjs.org/)** for the amazing framework
- **[Vite Team](https://vitejs.dev/)** for the fast build tool
- **[TanStack](https://tanstack.com/)** for the excellent query library

## 📧 Support

If you have any questions or need help, please:
- 🐛 [Open an issue](https://github.com/yourusername/tv-movie-list/issues)
- 💬 [Start a discussion](https://github.com/yourusername/tv-movie-list/discussions)
- 📧 Email: malamud95@gmail.com

---

<div align="center">
  <p>Made with ❤️ by Amir Malamud</p>
  <p>⭐ If you found this project helpful, please give it a star!</p>
</div>
