# New App

Welcome to **New App**, your ultimate hub for humor and creativity! This app allows you to generate, save, and enjoy jokes, as well as explore additional fun features like image generation, text-to-speech, and markdown story creation.

## Features

- 🌟 **User Authentication**: Sign in with ZAPT using Google, Facebook, or Apple.
- 🤣 **Add New Jokes**: Create and save your own jokes to your personal collection.
- 🎲 **Generate Jokes**: Use AI to generate new jokes in an instant.
- 📜 **Joke List**: View and enjoy your collection of saved jokes.
- 🖼️ **Generate Images**: Create images based on fun prompts.
- 🔊 **Text-to-Speech**: Listen to your jokes with natural-sounding audio.
- ✍️ **Markdown Story Generation**: Generate funny stories in markdown format.

## User Journey

1. **Sign In**
   - Open the app and click on "Sign in with ZAPT".
   - Choose your preferred social login provider (Google, Facebook, or Apple).
   - Upon successful login, you'll be redirected to the home page.

2. **Add a New Joke**
   - Navigate to the "Add New Joke" section.
   - Enter the setup and punchline for your joke.
   - Click "Save Joke" to add it to your joke list.

3. **Generate a Joke**
   - Click "Generate Joke" to use AI to create a new joke.
   - The joke will automatically fill in the setup and punchline fields.
   - Review the joke and click "Save Joke" if you wish to keep it.

4. **View Jokes**
   - Go to the "Joke List" to view all your saved jokes.
   - Scroll through your collection and enjoy your personalized humor feed.

5. **Additional Features**
   - **Generate Image**: Click "Generate Image" to create a funny image based on a prompt.
   - **Text to Speech**: If you have a joke entered, click "Text to Speech" to hear it aloud.
   - **Generate Markdown**: Generate a markdown-formatted funny story by clicking "Generate Markdown".

6. **Sign Out**
   - Click "Sign Out" at any time to log out of your account securely.

## External Services

- **ZAPT**: Used for user authentication and event handling.
- **Supabase**: Provides authentication services.
- **Neon Database**: Hosts the PostgreSQL database for storing jokes.
- **Drizzle ORM**: Simplifies database interactions.
- **OpenAI API**: Powers AI functionalities for joke generation, image creation, and text-to-speech.
- **Sentry**: Implements error logging for both frontend and backend.

## Environment Variables

To run the app, ensure you have the following environment variables set:

- `VITE_PUBLIC_APP_ID`: Your ZAPT app ID.
- `NEON_DB_URL`: Connection string for your Neon database.
- `VITE_PUBLIC_SENTRY_DSN`: Sentry Data Source Name for error logging.
- `VITE_PUBLIC_APP_ENV`: Environment name (e.g., `development`, `production`).
- `PROJECT_ID`: Your project's unique identifier.

## How to Run the App

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Run the Development Server**

   ```bash
   npm run dev
   ```

3. **Open the App**

   - Visit `http://localhost:3000` in your browser to access the app.

Enjoy creating and sharing jokes with **New App**!