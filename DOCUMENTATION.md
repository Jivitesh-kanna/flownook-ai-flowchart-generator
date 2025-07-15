# AI Flowchart Generator - Complete Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Technology Stack](#architecture--technology-stack)
3. [Project Structure](#project-structure)
4. [Setup & Installation](#setup--installation)
5. [Configuration](#configuration)
6. [Frontend Customization](#frontend-customization)
7. [Backend Customization](#backend-customization)
8. [API Documentation](#api-documentation)
9. [Deployment Guide](#deployment-guide)
10. [Troubleshooting](#troubleshooting)
11. [Contributing](#contributing)

## Project Overview

The AI Flowchart Generator is a modern web application that transforms natural language descriptions into professional flowcharts using Google's Gemini AI. Built with Flask and featuring a responsive, attractive frontend with Tailwind CSS, this application demonstrates advanced web development skills suitable for a professional portfolio.

### Key Features

- **AI-Powered Generation**: Converts plain English descriptions into Mermaid.js flowchart syntax using Google Gemini API
- **Modern UI/UX**: Professional, responsive design with dark mode support and glass morphism effects
- **Interactive Flowcharts**: Zoom, pan, and export functionality for generated flowcharts
- **Real-time Processing**: Asynchronous API calls with loading states and error handling
- **Example Library**: Pre-built examples to help users understand the input format
- **Export Capabilities**: Download flowcharts as high-quality PNG images
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Target Audience

This project is designed for:
- Developers looking to showcase full-stack development skills
- Professionals needing quick flowchart generation for documentation
- Students learning about AI integration in web applications
- Anyone requiring visual representation of processes and workflows

## Architecture & Technology Stack

### Backend Technologies

- **Flask 3.1.1**: Lightweight Python web framework for API development
- **Google Generative AI 0.8.5**: Integration with Google's Gemini API for text processing
- **Flask-CORS 6.0.0**: Cross-Origin Resource Sharing support for frontend-backend communication
- **Flask-SQLAlchemy 3.1.1**: Database ORM for potential future data persistence
- **Python 3.11**: Modern Python runtime with enhanced performance

### Frontend Technologies

- **HTML5**: Semantic markup with accessibility considerations
- **Tailwind CSS 3.x**: Utility-first CSS framework via CDN for rapid styling
- **Vanilla JavaScript**: Modern ES6+ features for interactive functionality
- **Mermaid.js 10.6.1**: Diagram and flowchart rendering library
- **Font Awesome 6.4.0**: Icon library for enhanced visual design

### Development Tools

- **Virtual Environment**: Isolated Python environment for dependency management
- **Git**: Version control system for code management
- **SQLite**: Lightweight database for development (optional usage)

## Project Structure

Understanding the project structure is crucial for making modifications and customizations. Here's a detailed breakdown of the directory organization:

```
flowchart-generator/
├── venv/                          # Virtual environment (auto-generated)
├── src/                           # Main application source code
│   ├── __init__.py               # Python package initialization
│   ├── main.py                   # Flask application entry point
│   ├── models/                   # Database models (optional)
│   │   ├── __init__.py
│   │   └── user.py              # User model example
│   ├── routes/                   # API route definitions
│   │   ├── __init__.py
│   │   ├── user.py              # User-related routes (template)
│   │   └── flowchart.py         # Flowchart generation routes
│   ├── static/                   # Frontend assets
│   │   ├── index.html           # Main HTML template
│   │   └── app.js               # Frontend JavaScript logic
│   └── database/                 # Database files
│       └── app.db               # SQLite database file
├── requirements.txt              # Python dependencies
├── .env.example                 # Environment variables template
├── DOCUMENTATION.md             # This documentation file
└── README.md                    # Project setup instructions
```

### Key Files Explained

#### `src/main.py`
The main Flask application file that:
- Initializes the Flask app with static file serving
- Configures CORS for cross-origin requests
- Registers API blueprints for modular route organization
- Sets up database connections (optional)
- Defines the main route handler for serving the frontend

#### `src/routes/flowchart.py`
Contains the core AI integration logic:
- `/api/flowchart/generate`: Main endpoint for flowchart generation
- `/api/flowchart/examples`: Provides example descriptions for users
- `/api/flowchart/health`: Health check endpoint for monitoring
- Text-to-Mermaid conversion using Google Gemini API

#### `src/static/index.html`
The main frontend template featuring:
- Responsive layout with Tailwind CSS
- Dark mode toggle functionality
- Interactive form elements with validation
- Mermaid.js integration for flowchart rendering
- Professional design with glass morphism effects

#### `src/static/app.js`
Frontend JavaScript handling:
- API communication with the Flask backend
- Mermaid.js chart rendering and manipulation
- User interface interactions and state management
- Theme switching and local storage persistence
- Export functionality for generated flowcharts




## Setup & Installation

### Prerequisites

Before setting up the AI Flowchart Generator, ensure you have the following installed on your system:

- **Python 3.11 or higher**: Download from [python.org](https://python.org)
- **Git**: For cloning the repository and version control
- **Google Gemini API Key**: Obtain from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Step-by-Step Installation

#### 1. Clone or Extract the Project

If you received the project as a ZIP file, extract it to your desired location. If using Git:

```bash
git clone <repository-url>
cd flowchart-generator
```

#### 2. Set Up Virtual Environment

The project includes a pre-configured virtual environment. Activate it:

**On Windows:**
```bash
venv\Scripts\activate
```

**On macOS/Linux:**
```bash
source venv/bin/activate
```

#### 3. Install Dependencies

All required dependencies are listed in `requirements.txt`. Install them:

```bash
pip install -r requirements.txt
```

#### 4. Configure Environment Variables

Copy the example environment file and configure your API key:

```bash
cp .env.example .env
```

Edit the `.env` file and add your Google Gemini API key:

```
GEMINI_API_KEY=your-actual-api-key-here
FLASK_ENV=development
FLASK_DEBUG=True
```

#### 5. Run the Application

Start the Flask development server:

```bash
python src/main.py
```

The application will be available at `http://localhost:5001`

### Verification

To verify the installation was successful:

1. Open your browser and navigate to `http://localhost:5001`
2. You should see the AI Flowchart Generator interface
3. Click the "Examples" button to test the API connectivity
4. Try generating a flowchart with a simple description

## Configuration

### Environment Variables

The application uses environment variables for configuration. Here's a complete reference:

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `GEMINI_API_KEY` | Google Gemini API key for AI processing | `your-api-key-here` | Yes |
| `FLASK_ENV` | Flask environment mode | `development` | No |
| `FLASK_DEBUG` | Enable Flask debug mode | `True` | No |
| `FLASK_PORT` | Port for the Flask server | `5001` | No |

### Google Gemini API Setup

To obtain your Google Gemini API key:

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Add it to your `.env` file

**Important Security Notes:**
- Never commit your API key to version control
- Keep your `.env` file in `.gitignore`
- Use environment variables in production deployments
- Monitor your API usage to avoid unexpected charges

### Flask Configuration

The Flask application can be configured by modifying `src/main.py`. Key configuration options include:

#### Port Configuration
To change the default port (5001), modify the last line in `src/main.py`:

```python
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)  # Changed to port 5002
```

#### CORS Configuration
Cross-Origin Resource Sharing is enabled by default. To modify CORS settings:

```python
from flask_cors import CORS

# Allow specific origins only
CORS(app, origins=['http://localhost:3000', 'https://yourdomain.com'])

# Or configure specific methods and headers
CORS(app, methods=['GET', 'POST'], allow_headers=['Content-Type'])
```

#### Database Configuration
The application includes optional SQLite database support. To enable or modify database settings:

```python
# Enable database
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.path.dirname(__file__), 'database', 'app.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# For production, consider PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:password@localhost/dbname'
```

## Frontend Customization

The frontend is built with modern web technologies and is highly customizable. Here's how to modify different aspects:

### Visual Design Customization

#### Color Scheme
The application uses a custom Tailwind CSS configuration. To modify colors, edit the `tailwind.config` object in `src/static/index.html`:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: {
                    // Modify these values for different primary colors
                    500: '#3b82f6',  // Main primary color
                    600: '#2563eb',  // Darker shade
                    700: '#1d4ed8',  // Even darker
                },
                secondary: {
                    // Modify for different secondary colors
                    500: '#64748b',
                    600: '#475569',
                }
            }
        }
    }
}
```

#### Typography
To change fonts, modify the Google Fonts import and CSS classes:

```html
<!-- Add to <head> section -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

<style>
body {
    font-family: 'Inter', sans-serif;
}
</style>
```

#### Layout Modifications
The layout uses CSS Grid and Flexbox. Key layout sections:

- **Navigation**: Modify the `<nav>` section for branding changes
- **Hero Section**: Update the main heading and description
- **Input/Output Grid**: Adjust the `lg:grid-cols-2` class for different layouts
- **Features Section**: Modify the `md:grid-cols-3` for different feature layouts

### Branding Customization

#### Logo and App Name
To customize the application branding:

1. **App Name**: Search for "AI Flowchart Generator" in `index.html` and replace with your desired name
2. **Logo**: Replace the Font Awesome icon in the navigation:

```html
<!-- Current logo -->
<i class="fas fa-project-diagram text-white text-lg"></i>

<!-- Replace with custom image -->
<img src="your-logo.png" alt="Your App" class="w-8 h-8">
```

3. **Favicon**: Add a custom favicon by placing `favicon.ico` in the `static` folder and adding:

```html
<link rel="icon" type="image/x-icon" href="/favicon.ico">
```

#### Tagline and Description
Modify the hero section text in `index.html`:

```html
<h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
    Your Custom Tagline Here
</h2>
<p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
    Your custom description explaining what your application does.
</p>
```

### Interactive Features

#### Adding New Examples
To add more example descriptions, modify the `examples` array in `src/routes/flowchart.py`:

```python
examples = [
    {
        'title': 'Your New Example',
        'description': 'Detailed description of the process you want to demonstrate'
    },
    # Add more examples here
]
```

#### Customizing Export Options
The export functionality can be enhanced by modifying the `downloadFlowchart()` function in `app.js`:

```javascript
// Add different export formats
async downloadFlowchart(format = 'png') {
    // Existing PNG export code...
    
    if (format === 'svg') {
        // Add SVG export logic
        const svgData = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        // Download SVG...
    }
}
```

#### Adding Keyboard Shortcuts
New keyboard shortcuts can be added in the event listener section of `app.js`:

```javascript
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'Enter':
                e.preventDefault();
                this.generateFlowchart();
                break;
            case 's':  // New shortcut for save
                e.preventDefault();
                this.downloadFlowchart();
                break;
            // Add more shortcuts
        }
    }
});
```


## Backend Customization

### Adding New API Endpoints

The Flask application uses blueprints for modular route organization. To add new endpoints:

#### 1. Create a New Blueprint

Create a new file in `src/routes/` (e.g., `analytics.py`):

```python
from flask import Blueprint, jsonify, request

analytics_bp = Blueprint('analytics', __name__)

@analytics_bp.route('/stats', methods=['GET'])
def get_stats():
    # Your logic here
    return jsonify({
        'total_flowcharts': 100,
        'active_users': 25
    })

@analytics_bp.route('/usage', methods=['POST'])
def track_usage():
    data = request.get_json()
    # Process usage data
    return jsonify({'status': 'recorded'})
```

#### 2. Register the Blueprint

Add the new blueprint to `src/main.py`:

```python
from src.routes.analytics import analytics_bp

# Register the new blueprint
app.register_blueprint(analytics_bp, url_prefix='/api/analytics')
```

### Modifying AI Processing Logic

The core AI functionality is in `src/routes/flowchart.py`. Here's how to customize it:

#### Changing the AI Model

To use a different Gemini model:

```python
def text_to_mermaid(user_input):
    try:
        # Change model here
        model = genai.GenerativeModel('gemini-1.5-pro')  # or 'gemini-pro-vision'
        
        # Rest of the function remains the same
```

#### Customizing the AI Prompt

Modify the prompt template for different output styles:

```python
prompt = f"""
Convert the following text description into a Mermaid.js flowchart syntax.
Use these specific guidelines:
1. Use 'flowchart LR' for left-to-right layout (instead of TD)
2. Use rounded rectangles for all process steps: A(Step Name)
3. Use diamonds for decisions: B{{Decision?}}
4. Include subgraphs for complex processes
5. Use different colors for different types of nodes

Text description: {user_input}

Return ONLY the Mermaid.js syntax with proper styling.
"""
```

#### Adding Input Validation

Enhance the input validation in the generate endpoint:

```python
@flowchart_bp.route('/generate', methods=['POST'])
def generate_flowchart():
    try:
        data = request.get_json()
        
        # Enhanced validation
        if not data or 'text' not in data:
            return jsonify({'error': 'Text description is required'}), 400
        
        user_text = data['text'].strip()
        
        # Length validation
        if len(user_text) < 10:
            return jsonify({'error': 'Description too short. Please provide more details.'}), 400
        
        if len(user_text) > 2000:
            return jsonify({'error': 'Description too long. Please keep it under 2000 characters.'}), 400
        
        # Content validation
        if not any(keyword in user_text.lower() for keyword in ['step', 'process', 'if', 'then', 'when', 'check']):
            return jsonify({'error': 'Please describe a process with clear steps or decisions.'}), 400
        
        # Continue with generation...
```

### Database Integration

To add data persistence for storing generated flowcharts:

#### 1. Create a Flowchart Model

Add to `src/models/flowchart.py`:

```python
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Flowchart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    mermaid_code = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_ip = db.Column(db.String(45))  # For basic tracking
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'mermaid_code': self.mermaid_code,
            'created_at': self.created_at.isoformat(),
            'user_ip': self.user_ip
        }
```

#### 2. Update the Generation Endpoint

Modify `src/routes/flowchart.py` to save flowcharts:

```python
from src.models.flowchart import Flowchart, db

@flowchart_bp.route('/generate', methods=['POST'])
def generate_flowchart():
    try:
        data = request.get_json()
        user_text = data['text'].strip()
        
        # Generate Mermaid code
        mermaid_code = text_to_mermaid(user_text)
        
        # Save to database
        flowchart = Flowchart(
            title=user_text[:100] + '...' if len(user_text) > 100 else user_text,
            description=user_text,
            mermaid_code=mermaid_code,
            user_ip=request.remote_addr
        )
        db.session.add(flowchart)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'mermaid_code': mermaid_code,
            'original_text': user_text,
            'flowchart_id': flowchart.id
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500
```

### Error Handling and Logging

Implement comprehensive error handling:

```python
import logging
from flask import current_app

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def text_to_mermaid(user_input):
    try:
        logger.info(f"Processing flowchart request for input length: {len(user_input)}")
        
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(prompt)
        
        logger.info("Successfully generated Mermaid code")
        return response.text.strip()
        
    except Exception as e:
        logger.error(f"Error generating flowchart: {str(e)}")
        
        # Return a fallback flowchart
        return f"""flowchart TD
    A[Start] --> B[Process Input]
    B --> C{{Error Occurred}}
    C --> D[Show Fallback]
    D --> E[End]
    
    %% Error: {str(e)}"""
```

## API Documentation

### Base URL

All API endpoints are prefixed with `/api/` when running locally:
- Development: `http://localhost:5001/api/`
- Production: `https://yourdomain.com/api/`

### Authentication

Currently, the API does not require authentication. For production use, consider implementing:
- API key authentication
- Rate limiting
- User session management

### Endpoints

#### Generate Flowchart

**POST** `/api/flowchart/generate`

Converts a text description into a Mermaid.js flowchart.

**Request Body:**
```json
{
    "text": "User logs in, system validates credentials, if valid show dashboard, otherwise show error"
}
```

**Response (Success):**
```json
{
    "success": true,
    "mermaid_code": "flowchart TD\n    A[User logs in] --> B[System validates credentials]\n    B --> C{Valid?}\n    C -->|Yes| D[Show dashboard]\n    C -->|No| E[Show error]\n    D --> F[End]\n    E --> F[End]",
    "original_text": "User logs in, system validates credentials, if valid show dashboard, otherwise show error"
}
```

**Response (Error):**
```json
{
    "success": false,
    "error": "Text description is required"
}
```

**Status Codes:**
- `200`: Success
- `400`: Bad request (missing or invalid input)
- `500`: Internal server error

#### Get Examples

**GET** `/api/flowchart/examples`

Returns a list of example descriptions for flowchart generation.

**Response:**
```json
{
    "success": true,
    "examples": [
        {
            "title": "User Registration Process",
            "description": "User enters details, system validates, creates account if valid, sends confirmation email"
        },
        {
            "title": "Order Processing Workflow",
            "description": "Customer places order, check inventory, if available process payment, if payment successful ship order, otherwise cancel order"
        }
    ]
}
```

#### Health Check

**GET** `/api/flowchart/health`

Returns the health status of the API and AI service.

**Response:**
```json
{
    "status": "healthy",
    "service": "AI Flowchart Generator",
    "api_configured": true
}
```

### Rate Limiting

For production deployment, implement rate limiting:

```python
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

@flowchart_bp.route('/generate', methods=['POST'])
@limiter.limit("10 per minute")
def generate_flowchart():
    # Endpoint logic
```

### Error Response Format

All error responses follow this format:

```json
{
    "success": false,
    "error": "Descriptive error message",
    "error_code": "OPTIONAL_ERROR_CODE",
    "timestamp": "2025-07-08T10:00:00Z"
}
```

## Deployment Guide

### Local Development Deployment

For local development, the application runs on Flask's built-in development server:

```bash
# Activate virtual environment
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Set environment variables
export GEMINI_API_KEY=your-api-key-here

# Run the application
python src/main.py
```

### Production Deployment Options

#### Option 1: Using Gunicorn (Recommended)

Install Gunicorn:
```bash
pip install gunicorn
```

Create a WSGI entry point (`wsgi.py`):
```python
from src.main import app

if __name__ == "__main__":
    app.run()
```

Run with Gunicorn:
```bash
gunicorn --bind 0.0.0.0:5001 --workers 4 wsgi:app
```

#### Option 2: Docker Deployment

Create a `Dockerfile`:
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY src/ ./src/
COPY wsgi.py .

EXPOSE 5001

CMD ["gunicorn", "--bind", "0.0.0.0:5001", "--workers", "4", "wsgi:app"]
```

Build and run:
```bash
docker build -t flowchart-generator .
docker run -p 5001:5001 -e GEMINI_API_KEY=your-key flowchart-generator
```

#### Option 3: Cloud Platform Deployment

**Heroku:**
1. Create a `Procfile`:
   ```
   web: gunicorn wsgi:app
   ```

2. Deploy:
   ```bash
   heroku create your-app-name
   heroku config:set GEMINI_API_KEY=your-key
   git push heroku main
   ```

**Railway/Render:**
1. Connect your GitHub repository
2. Set environment variables in the platform dashboard
3. Deploy automatically on push

### Environment Variables for Production

```bash
# Required
GEMINI_API_KEY=your-production-api-key

# Optional
FLASK_ENV=production
FLASK_DEBUG=False
DATABASE_URL=postgresql://user:pass@host:port/dbname
SECRET_KEY=your-secret-key-for-sessions
```

### Security Considerations

1. **API Key Security**: Never expose your Gemini API key in client-side code
2. **HTTPS**: Always use HTTPS in production
3. **Rate Limiting**: Implement rate limiting to prevent abuse
4. **Input Validation**: Validate and sanitize all user inputs
5. **CORS**: Configure CORS appropriately for your domain
6. **Database Security**: Use environment variables for database credentials

### Performance Optimization

1. **Caching**: Implement Redis caching for frequently generated flowcharts
2. **CDN**: Use a CDN for static assets (CSS, JS, images)
3. **Database Optimization**: Add indexes for frequently queried fields
4. **Monitoring**: Implement application monitoring (e.g., Sentry, New Relic)

## Troubleshooting

### Common Issues and Solutions

#### Issue: "Address already in use" Error

**Problem**: Port 5001 is already occupied by another process.

**Solution**:
1. Change the port in `src/main.py`:
   ```python
   app.run(host='0.0.0.0', port=5002, debug=True)
   ```
2. Or kill the existing process:
   ```bash
   # Find the process
   lsof -i :5001
   
   # Kill it
   kill -9 <PID>
   ```

#### Issue: Gemini API Key Not Working

**Problem**: API calls fail with authentication errors.

**Solutions**:
1. Verify your API key is correct
2. Check if the API key has proper permissions
3. Ensure the key is properly set in environment variables
4. Check your Google Cloud billing status

#### Issue: Mermaid Syntax Errors

**Problem**: Generated flowcharts show "Syntax error in text".

**Solutions**:
1. Check the AI prompt template for proper Mermaid syntax
2. Add validation for generated Mermaid code
3. Implement fallback flowcharts for edge cases
4. Review the Gemini model's output format

#### Issue: Frontend Not Loading

**Problem**: Blank page or JavaScript errors.

**Solutions**:
1. Check browser console for JavaScript errors
2. Verify all CDN links are accessible
3. Ensure Flask is serving static files correctly
4. Check CORS configuration

#### Issue: Slow API Response

**Problem**: Flowchart generation takes too long.

**Solutions**:
1. Implement request timeouts
2. Add loading indicators
3. Consider caching common flowcharts
4. Optimize the AI prompt for faster processing

### Debug Mode

Enable debug mode for detailed error information:

```python
# In src/main.py
app.run(host='0.0.0.0', port=5001, debug=True)
```

**Warning**: Never enable debug mode in production!

### Logging

Add comprehensive logging for troubleshooting:

```python
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)
```

## Contributing

### Development Workflow

1. **Fork the Repository**: Create your own fork for development
2. **Create Feature Branch**: `git checkout -b feature/your-feature-name`
3. **Make Changes**: Implement your improvements
4. **Test Thoroughly**: Ensure all functionality works
5. **Commit Changes**: Use descriptive commit messages
6. **Submit Pull Request**: Describe your changes clearly

### Code Style Guidelines

- **Python**: Follow PEP 8 style guidelines
- **JavaScript**: Use ES6+ features and consistent formatting
- **HTML/CSS**: Use semantic HTML and consistent class naming
- **Comments**: Add clear comments for complex logic

### Testing

Before submitting changes:

1. Test the application manually
2. Verify all API endpoints work correctly
3. Check responsive design on different screen sizes
4. Test dark mode functionality
5. Validate with different input types

### Feature Requests

When requesting new features:

1. Describe the use case clearly
2. Explain the expected behavior
3. Consider the impact on existing functionality
4. Provide mockups or examples if applicable

---

*This documentation was created to help developers understand, customize, and extend the AI Flowchart Generator. For additional support or questions, please refer to the project repository or contact the development team.*

