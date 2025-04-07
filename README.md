# OER Site Generator

A simple and efficient platform for creating and sharing Open Educational Resources (OER). This project provides a straightforward way to host and view educational content in Markdown and text formats.

## 🎯 Purpose

This project aims to:
- Empower faculty across all departments to create and share OER materials
- Provide a simple, accessible platform for OER content distribution
- Support CUNY's commitment to open educational resources and student success
- Reduce textbook costs and increase educational accessibility

## ✨ Features

- **Easy Content Management**: Upload and manage Markdown and text files through a simple interface
- **Department-Friendly**: Create subject-specific resource collections
- **No Technical Expertise Required**: User-friendly interface for all faculty members
- **Instant Deployment**: Quick setup and deployment to GitHub Pages
- **Open Source**: Freely available and customizable for your department's needs

## �� Quick Start

1. **Start the Launcher**:
   ```bash
   node launcher.js
   ```
   This will:
   - Start a local server
   - Open a browser window with the launcher interface
   - Allow you to upload and manage content files

2. **Upload Content**:
   - Use the launcher interface to select and upload `.md` or `.txt` files
   - Files are automatically saved to the `content` directory
   - Preview your content in real-time

3. **View Content**:
   - Access your content at `http://localhost:5173`
   - Navigate to specific resources using the URL format: `/resource/[filename]`
   - Markdown files are automatically rendered with formatting

## 📚 For Faculty

### Why Use This Platform?

- **Cost-Effective**: Free to use and deploy
- **Department Collaboration**: Share resources within and across departments
- **Student Access**: Students can access materials anytime, anywhere
- **CUNY Support**: Part of CUNY's broader OER initiatives
- **Customizable**: Adapt the platform to your department's specific needs

### Getting Started with OER

1. **Prepare Your Materials**:
   - Convert existing course materials to Markdown or text format
   - Organize content by topic or module
   - Include multimedia resources as needed

2. **Upload Your Content**:
   - Use the simple file upload interface
   - Add metadata and descriptions
   - Organize by department or course

3. **Share with Students**:
   - Deploy to GitHub Pages with one click
   - Share the URL with your students
   - Update content as needed throughout the semester

## 🤝 Contributing

We welcome contributions from all CUNY faculty and staff! Whether you're:
- Adding new features
- Improving documentation
- Creating department-specific templates
- Sharing best practices

Please feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📞 Support

For support or questions, please:
- Contact your department's OER liaison
- Reach out to CETL at QCC
- Open an issue in this repository

## 📜 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Center for Excellence in Teaching and Learning (CETL) at QCC
- CUNY OER Initiatives
- All contributing faculty and staff

---

*Part of CUNY's commitment to open education and student success*

## 📁 Project Structure

```
_app/           # Vue.js application
  components/   # Vue components
  views/        # Page components
  router.js     # Routing configuration
  vite.config.js # Build configuration
content/        # Educational content files
  README.md    # This file
  *.md         # Markdown files
  *.txt        # Text files
launcher.js     # Development server and file management
launcher.html   # File upload interface
```

## 🔧 Technical Details

- **Content Management**:
  - Files are stored in the `content` directory
  - Supports both Markdown (`.md`) and plain text (`.txt`) formats
  - Automatic file organization and naming

- **Development**:
  - Built with Vue 3 and Vite
  - Uses Vue Router for navigation
  - Markdown rendering with marked.js
  - Tailwind CSS for styling

- **Deployment**:
  - Automatically deploys to GitHub Pages
  - Handles client-side routing with 404.html
  - Supports both development and production environments

## 📝 Adding Content

1. **Prepare Your Files**:
   - Create content in Markdown or text format
   - Use descriptive filenames (e.g., `biology-101.md`)
   - Include proper formatting for Markdown files

2. **Upload Process**:
   - Launch the application with `node launcher.js`
   - Use the web interface to select and upload files
   - Files are immediately available for viewing

3. **Viewing Content**:
   - Access files through the navigation menu
   - Direct URL access: `/resource/[filename]`
   - Automatic formatting for Markdown content

## 🛠️ Development Commands

- `node launcher.js` - Start the development server and launcher
- `npm run dev` - Start the Vue development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔍 Troubleshooting

- **File Not Found**: Ensure files are uploaded to the `content` directory
- **Formatting Issues**: Check Markdown syntax in `.md` files
- **Server Errors**: Verify all dependencies are installed

## 📜 License

This project is open source and available under the MIT License.

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
 