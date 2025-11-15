# Kreator AI Chrome Extension

This project is a Chrome extension that integrates the Gemini API to provide AI-powered capabilities in a side panel on any web page.

## Overview

The Kreator AI extension allows users to interact with the Gemini API through a chat interface available in the browser's side panel. This enables seamless access to AI features without leaving the current web page.

## Project Structure

The project is organized as follows:

- **`manifest.json`**: The manifest file for the Chrome extension, defining its name, version, permissions, and other metadata.
- **`background.js`**: The service worker for the extension, handling background tasks.
- **`sidepanel/`**: This directory contains the files for the side panel interface.
  - **`index.html`**: The main HTML file for the side panel.
  - **`index.css`**: The stylesheet for the side panel.
  - **`index.js`**: The JavaScript file that handles the logic for the side panel, including communication with the Gemini API.
  - **`firebase.js`**: This file contains the Firebase configuration and initialization code.
- **`images/`**: This directory contains the icons for the extension.
- **`welcome.html`**: A welcome page for new users.
- **`welcome.js`**: The JavaScript file for the welcome page.
- **`package.json`**: The project's dependencies and scripts.
- **`rollup.config.js`**: The configuration file for Rollup, which is used to bundle the JavaScript files.

## Getting Started

To run this extension locally, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   ```
2. **Install the dependencies:**
   ```sh
   npm install
   ```
3. **Configure Firebase:**
   You will need to create a Firebase project and get your configuration credentials. You can find instructions on how to do that [here](https://firebase.google.com/docs/web/setup). Once you have your credentials, you need to add them to the `sidepanel/firebase.js` file.

4. **Build the extension:**
   ```sh
   npm run build
   ```
5. **Load the extension in Chrome:**
   - Open Chrome and navigate to `chrome://extensions`.
   - Enable "Developer mode".
   - Click "Load unpacked" and select the directory where you cloned the repository.

6. **Open the side panel:**
   - Click the extension icon in the Chrome toolbar to open the Kreator AI side panel.

## Technologies Used

- **[Gemini API](https://ai.google.dev/)**: The AI model that powers the extension's chat functionality.
- **[Firebase](https://firebase.google.com/)**: Used for backend services, such as authentication and database.
- **[Rollup](https://rollupjs.org/)**: A module bundler for JavaScript.
- **[Marked](https://marked.js.org/)**: A markdown parser and compiler.
