# New App

## Overview

New App is designed to provide blind accessibility services to users without requiring any login or authentication. The app offers features that assist visually impaired users by reading text aloud and describing images.

## Features

1. **Text-to-Speech**
   - Users can input custom text into a text area.
   - By clicking the "Read Aloud" button, the app converts the text into speech and plays the audio.

2. **Image Description**
   - Users can upload an image from their device.
   - By clicking the "Describe Image" button, the app generates a textual description of the image content.

3. **High Contrast Mode**
   - Users can toggle a high-contrast mode for better visibility.
   - This feature enhances the app's visual elements for users with low vision.

## User Journey

1. **Accessing the App**
   - Open the app in a web browser.
   - The app is a Progressive Web App (PWA) and can be installed on your device.
   - No login is required to use the app.

2. **Using Text-to-Speech**
   - Navigate to the Text-to-Speech section.
   - Input the desired text into the provided text area.
   - Click the "Read Aloud" button.
   - The app processes the text and plays the audio.

3. **Using Image Description**
   - Navigate to the Image Description section.
   - Upload an image by clicking the "Choose File" button and selecting an image from your device.
   - Click the "Describe Image" button.
   - The app processes the image and displays a textual description.

4. **Enabling High Contrast Mode**
   - Toggle the High Contrast Mode switch to enhance visibility.
   - The app's color scheme changes to a high-contrast theme.

## External APIs and Services

- **Text-to-Speech**: The app uses the `text_to_speech` event to convert text into speech.
- **Image Description**: The app uses the `chatgpt_request` event to generate descriptions for uploaded images.
- **Cloudinary**: Cloudinary is used for storing the uploaded images.
- **Progressier**: The app uses Progressier for PWA functionalities.
- **Sentry**: Sentry is integrated for error logging and monitoring.

## Environment Variables

The app requires the following environment variables to function properly. These should be set in a `.env` file:

- `VITE_PUBLIC_APP_ID`: Your application ID.
- `VITE_PUBLIC_SENTRY_DSN`: Your Sentry DSN URL.
- `VITE_PUBLIC_APP_ENV`: The application environment (e.g., `development`, `production`).
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name.
- `CLOUDINARY_API_KEY`: Your Cloudinary API key.
- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret.
- `PROJECT_ID`: Your project ID.
