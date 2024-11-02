# New App

## Overview

New App is designed to provide blind accessibility services to users. The app offers features that assist visually impaired users by reading text aloud and describing images.

## Features

1. **User Authentication**
   - Users can sign in using their email or social login providers (Google, Facebook, Apple).
   - Authentication is handled via Supabase Auth UI.

2. **Text-to-Speech**
   - Users can input custom text into a text area.
   - By clicking the "Read Aloud" button, the app converts the text into speech and plays the audio.

3. **Image Description**
   - Users can upload an image from their device.
   - By clicking the "Describe Image" button, the app generates a textual description of the image content.

4. **High Contrast Mode**
   - Users can toggle a high-contrast mode for better visibility.
   - This feature enhances the app's visual elements for users with low vision.

## User Journey

1. **Accessing the App**
   - Open the app in a web browser.
   - The app is a Progressive Web App (PWA) and can be installed on your device.

2. **Signing In**
   - On the landing page, users are prompted to sign in with ZAPT.
   - Users can sign in using their email or social login providers (Google, Facebook, Apple).

3. **Using Text-to-Speech**
   - After signing in, navigate to the Text-to-Speech section.
   - Input the desired text into the provided text area.
   - Click the "Read Aloud" button.
   - The app processes the text and plays the audio.

4. **Using Image Description**
   - Navigate to the Image Description section.
   - Upload an image by clicking the "Choose File" button and selecting an image from your device.
   - Click the "Describe Image" button.
   - The app processes the image and displays a textual description.

5. **Enabling High Contrast Mode**
   - Toggle the High Contrast Mode switch to enhance visibility.
   - The app's color scheme changes to a high-contrast theme.

6. **Signing Out**
   - Users can sign out by clicking the "Sign Out" button at the top of the app.
   - After signing out, users are returned to the login page.

## External APIs and Services

- **Text-to-Speech**: The app uses the `text_to_speech` event to convert text into speech.
- **Image Description**: The app uses the `chatgpt_request` event to generate descriptions for uploaded images.
- **Authentication**: Supabase Auth is used for user authentication.
- **Progressier**: The app uses Progressier for PWA functionalities.
- **Sentry**: Sentry is integrated for error logging and monitoring.
