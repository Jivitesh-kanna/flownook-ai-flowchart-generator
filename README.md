# AI Flowchart Generator

A modern web application that transforms natural language descriptions into professional flowcharts using Google's Gemini AI.

![AI Flowchart Generator](https://img.shields.io/badge/AI-Powered-blue) ![Flask](https://img.shields.io/badge/Flask-3.1.1-green) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue) ![Python](https://img.shields.io/badge/Python-3.11-yellow)

## ✨ Features

- 🤖 **AI-Powered Generation**: Convert plain English to flowcharts using Google Gemini
- 🎨 **Modern UI/UX**: Professional design with dark mode and responsive layout
- 📱 **Mobile Friendly**: Works seamlessly on all devices
- 🔄 **Interactive Charts**: Zoom, pan, and export functionality
- 📥 **Export Options**: Download flowcharts as high-quality images
- 💡 **Smart Examples**: Built-in examples to get you started
- ⚡ **Real-time Processing**: Fast API responses with loading states

## 📸 Screenshots

### 🔷 Live Web UI
 <img width="1919" height="874" alt="Screenshot 2025-07-15 220132" src="https://github.com/user-attachments/assets/fc8221b3-4492-4c53-85a9-f473ed0e4a43" />


### 🔷 Generated Flowchart
<img width="1896" height="869" alt="Screenshot 2025-07-15 220730" src="https://github.com/user-attachments/assets/01137dd9-5df3-45bd-a32b-46161fe4d38f" />


### 🔷 Downloaded PNG Output
 <img width="1897" height="865" alt="Screenshot 2025-07-15 220848" src="https://github.com/user-attachments/assets/ac06bdc8-635c-4aab-a7c8-e87a12933997" />



## 🚀 Quick Start

### Prerequisites

- Python 3.11 or higher
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Extract the project** to your desired location

2. **Activate the virtual environment**:
   ```bash
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure your API key**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Gemini API key:
   ```
   GEMINI_API_KEY=your-actual-api-key-here
   ```

5. **Run the application**:
   ```bash
   python src/main.py
   ```

6. **Open your browser** and go to `http://localhost:5001`

## 🎯 Usage

1. **Describe your process** in plain English in the text area
2. **Click "Generate Flowchart"** to create your diagram
3. **Interact with the result** using zoom and pan controls
4. **Export your flowchart** as a PNG image

### Example Input

```
User logs in, system validates credentials, if valid check if account is active, 
if active grant access to dashboard, otherwise show account disabled message, 
if credentials invalid show error and allow retry
```

## 🛠️ Customization

This project is designed to be easily customizable for your needs:

### Branding
- Update app name and logo in `src/static/index.html`
- Modify colors in the Tailwind CSS configuration
- Add your own favicon and branding elements

### Functionality
- Add new API endpoints in `src/routes/`
- Customize the AI prompt in `src/routes/flowchart.py`
- Extend the frontend features in `src/static/app.js`

### Styling
- Modify the Tailwind CSS configuration for different themes
- Add custom CSS for unique design elements
- Implement additional interactive features

## 📁 Project Structure

```
flowchart-generator/
├── src/
│   ├── main.py              # Flask application entry point
│   ├── routes/
│   │   └── flowchart.py     # AI integration and API endpoints
│   └── static/
│       ├── index.html       # Frontend interface
│       └── app.js          # JavaScript functionality
├── requirements.txt         # Python dependencies
├── .env.example            # Environment variables template
├── README.md              # This file
└── DOCUMENTATION.md       # Comprehensive documentation
```

## 🔧 Technology Stack

- **Backend**: Flask 3.1.1, Google Generative AI
- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Visualization**: Mermaid.js for flowchart rendering
- **Development**: Python 3.11, Virtual Environment

## 📖 Documentation

For detailed documentation including:
- Complete setup instructions
- Customization guides
- API documentation
- Deployment options
- Troubleshooting

See [DOCUMENTATION.md](DOCUMENTATION.md)

## 🚀 Deployment

### Local Development
```bash
python src/main.py
```

### Production (with Gunicorn)
```bash
pip install gunicorn
gunicorn --bind 0.0.0.0:5001 --workers 4 wsgi:app
```

### Docker
```bash
docker build -t flowchart-generator .
docker run -p 5001:5001 -e GEMINI_API_KEY=your-key flowchart-generator
```

## 🔐 Security Notes

- Never commit your API key to version control
- Use environment variables for sensitive configuration
- Implement rate limiting for production use
- Always use HTTPS in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:

1. Check the [DOCUMENTATION.md](DOCUMENTATION.md) for detailed guides
2. Review the troubleshooting section
3. Ensure your API key is properly configured
4. Verify all dependencies are installed correctly

## 🌟 Showcase

This project demonstrates:
- Full-stack web development skills
- AI integration capabilities
- Modern frontend design principles
- Professional code organization
- Comprehensive documentation

Perfect for showcasing in your portfolio or as a foundation for larger projects!

---

**Built with ❤️ using Flask, Google Gemini AI, and modern web technologies**

