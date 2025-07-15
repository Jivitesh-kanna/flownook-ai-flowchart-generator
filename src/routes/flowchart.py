from flask import Blueprint, jsonify, request
import google.generativeai as genai
import os
import re

flowchart_bp = Blueprint('flowchart', __name__)

# Configure Gemini API (you'll need to set your API key)
# For now, we'll use a placeholder - users will need to add their own API key
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', 'AIzaSyARhTqJRuTPWRbJ7U5M71BHFDyFbTUfirM')
genai.configure(api_key=GEMINI_API_KEY)

def text_to_mermaid(user_input):
    """
    Convert user text description to Mermaid.js flowchart syntax using Gemini AI
    """
    try:
        model = genai.GenerativeModel("models/gemini-1.5-flash")
        
        prompt = f"""
Convert the following text description into Mermaid.js flowchart syntax. 
Apply a gentle, professional style. Use the following rules:

1. Use proper Mermaid syntax.
2. Start with 'flowchart TD'.
3. Use A, B, C... as node IDs.
4. Use diamond shapes (for decision nodes).
5. Use --> arrows to connect.
6. Apply soft pastel colors using Mermaid 'style' lines:
   - Start/End nodes: Light green → fill:#d4edda
   - Process nodes: Light blue → fill:#dbeafe
   - Decision nodes: Soft red/pink → fill:#f8d7da
7. Use format like: style A fill:#d4edda,stroke:#333,stroke-width:1.5px,rx:8px,ry:8px
8. Make it clean and minimal. No extra text.

Text description: {user_input}
"""
        
        response = model.generate_content(prompt)
        mermaid_code = response.text.strip()

        # Robustly extract Mermaid syntax, handling markdown code blocks
        match = re.search(r"```(?:mermaid)?\s*([\s\S]*?)\s*```", mermaid_code)
        if match:
            mermaid_code = match.group(1).strip()
        elif not mermaid_code.startswith("flowchart") and not mermaid_code.startswith("graph"):
            # Fallback if no code block but doesn't start with flowchart/graph
            # This might happen if Gemini just returns the raw code without markdown
            pass # Keep the original response, hoping it's raw mermaid

        # Basic validation: ensure it starts with 'flowchart' or 'graph'
        if not mermaid_code.startswith("flowchart") and not mermaid_code.startswith("graph"):
            raise ValueError("Generated content is not valid Mermaid flowchart or graph syntax.")

        return mermaid_code
        
    except Exception as e:
        print(f"Error during Gemini API call: {e}") # <--- ADD THIS LINE
        # Fallback to a simple example if API fails
        return f"""flowchart TD
    A[Start] --> B[Process Input]
    B --> C{{Decision}}
    C -->|Yes| D[Action 1]
    C -->|No| E[Action 2]
    D --> F[End]
    E --> F[End]
    
    %% Error: {str(e)}"""

@flowchart_bp.route('/generate', methods=['POST'])
def generate_flowchart():
    """
    Generate a flowchart from text description
    """
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({'error': 'Text description is required'}), 400
        
        user_text = data['text'].strip()
        
        if not user_text:
            return jsonify({'error': 'Text description cannot be empty'}), 400
        
        # Generate Mermaid.js code using Gemini AI
        mermaid_code = text_to_mermaid(user_text)
        
        return jsonify({
            'success': True,
            'mermaid_code': mermaid_code,
            'original_text': user_text
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Failed to generate flowchart: {str(e)}'
        }), 500

@flowchart_bp.route('/examples', methods=['GET'])
def get_examples():
    """
    Get example text descriptions for flowchart generation
    """
    examples = [
        {
            'title': 'User Registration Process',
            'description': 'User enters details, system validates, creates account if valid, sends confirmation email'
        },
        {
            'title': 'Order Processing Workflow',
            'description': 'Customer places order, check inventory, if available process payment, if payment successful ship order, otherwise cancel order'
        },
        {
            'title': 'Bug Fixing Process',
            'description': 'Bug reported, assign to developer, developer investigates, if reproducible fix the bug, test the fix, if test passes deploy to production, otherwise return to development'
        },
        {
            'title': 'Login Authentication',
            'description': 'User enters credentials, validate username and password, if valid check if account is active, if active grant access, otherwise show error message'
        },
        {
            'title': 'Data Backup Process',
            'description': 'Start backup process, check available storage space, if sufficient begin data backup, verify backup integrity, if successful update backup log, otherwise retry backup'
        }
    ]
    
    return jsonify({
        'success': True,
        'examples': examples
    })

@flowchart_bp.route('/health', methods=['GET'])
def health_check():
    """
    Health check endpoint
    """
    return jsonify({
        'status': 'healthy',
        'service': 'AI Flowchart Generator',
        'api_configured': GEMINI_API_KEY != 'AIzaSyARhTqJRuTPWRbJ7U5M71BHFDyFbTUfirM'
    })
