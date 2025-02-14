# TV Movie List

## Description

This application allows users to search for movies and TV shows using The Movie Database (TMDB) API.

## Setup

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/tv-movie-list.git
   cd tv-movie-list
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Create a [.env](http://_vscodecontentref_/3) file in the root of the project and add your TMDB API key:

   ```env
   API_KEY=your_tmdb_api_key
   ```

   Replace `your_tmdb_api_key` with your actual TMDB API key. You can obtain an API key by creating an account on [The Movie Database](https://www.themoviedb.org/) and requesting an API key.

4. Start the application:
   ```sh
   npm start
   ```

## Usage

- Search for movies and TV shows using the search bar.
- View trending, popular, top-rated, and upcoming movies and TV shows.

## Environment Variables

The application uses the following variablesenvironment:

- [API_KEY](http://_vscodecontentref_/4): Your TMDB API key.

## License

This project is licensed under the MIT License.
