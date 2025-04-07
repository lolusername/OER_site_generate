# OER Site Generator

A simple and efficient platform for creating and sharing Open Educational Resources (OER). This project provides a straightforward way to host and view educational content in Markdown and text formats.

## 🎯 Purpose

This project aims to:
- Empower faculty across all departments to create and share OER materials
- Provide a simple, accessible platform for OER content distribution
- Support CUNY's commitment to open educational resources and student success
- Reduce textbook costs and increase educational accessibility

## ✨ Features

- **Easy Content Management**: Upload and manage Markdown and text files through a simple browser interface
- **Department-Friendly**: Create subject-specific resource collections
- **No Technical Expertise Required**: User-friendly interface for all faculty members
- **Instant Deployment**: Quick setup and deployment to GitHub Pages
- **Open Source**: Freely available and customizable for your department's needs

## 🚀 Quick Start

1. **Add Content**:
   - Start the launcher with `npm start`
   - Use the browser interface to upload `.md` or `.txt` files
   - Files are automatically saved to the `content/` directory
   - Use descriptive filenames (e.g., `biology-101.md`)
   - Files are automatically available at `/resource/[filename]`

2. **View Content**:
   - Access your content at `https://lolusername.github.io/OER_site_generate`
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
   - Start the launcher with `npm start`
   - Use the browser interface to upload your files
   - Files are automatically organized in the `content/` directory
   - No additional setup required

3. **Share with Students**:
   - Deploy to GitHub Pages
   - Share the URL with your students
   - Update content as needed throughout the semester

## 📁 Project Structure

```
_app/           # Vue.js application
  components/   # Vue components
  views/        # Page components
  router.js     # Routing configuration
  vite.config.js # Build configuration
content/        # Educational content files
  *.md         # Markdown files
  *.txt        # Text files
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

## 🛠️ Development

For developers working on the platform:

- `npm run dev` - Start the Vue development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

*Note: The launcher (`node launcher.js`) is a development tool for testing and is not required for normal usage.*

## 🔍 Troubleshooting

- **File Not Found**: Ensure files are in the `content` directory
- **Formatting Issues**: Check Markdown syntax in `.md` files
- **Server Errors**: Verify all dependencies are installed

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