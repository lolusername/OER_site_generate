# OER Viewer

A simple and modern viewer for Open Educational Resources (OER). View Markdown and text files in a clean, organized interface.

## Quick Start

1. Make sure you have [Node.js](https://nodejs.org/) installed (version 14 or higher)
2. Clone this repository
3. Open a terminal in the repository folder and run:
   ```bash
   npm start
   ```
4. Open your browser to http://localhost:5173

That's it! The app will automatically:
- Install all dependencies
- Start the development server
- Hot-reload when you make changes

## Project Structure

```
_app/           # Application code
  components/   # Vue components
  views/        # Page components
  ...          # Configuration files
content/        # Educational content
  README.md    # This file
  *.md         # Markdown files
  *.txt        # Text files
```

## Adding Content

1. Create a new `.md` or `.txt` file in the `content/` directory
2. Follow the existing format and structure
3. The file will automatically appear in the navigation

## Development

- `npm start` - Install dependencies and start development server
- `npm run dev` - Start development server only
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Technologies Used

- Vue 3
- Vue Router
- Tailwind CSS
- Markdown Support
- Hot Module Replacement

## Test
Testing Git authentication

## Deployment
Triggering deployment workflow
 