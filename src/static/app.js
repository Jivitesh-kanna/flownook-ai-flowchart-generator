// AI Flowchart Generator - Frontend JavaScript
class FlowchartGenerator {
    constructor() {
        this.currentZoom = 1;
        this.currentMermaidCode = '';
        this.examples = [];
        this.selectedDownloadQuality = 2000; // Default to 2K (2000px width)
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupTheme();
        this.setupMermaid();
        this.loadExamples();
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Help modal
        document.getElementById('helpBtn').addEventListener('click', () => {
            this.showHelpModal();
        });

        document.getElementById('closeHelpBtn').addEventListener('click', () => {
            this.hideHelpModal();
        });

        // Examples
        document.getElementById('examplesBtn').addEventListener('click', () => {
            this.toggleExamples();
        });

        // Input controls
        document.getElementById('clearBtn').addEventListener('click', () => {
            this.clearInput();
        });

        document.getElementById('generateBtn').addEventListener('click', () => {
            this.generateFlowchart();
        });

        // Flowchart controls
        document.getElementById('zoomInBtn').addEventListener('click', () => {
            this.zoomIn();
        });

        document.getElementById('zoomOutBtn').addEventListener('click', () => {
            this.zoomOut();
        });

        document.getElementById('downloadBtn').addEventListener('click', () => {
            this.downloadFlowchart();
        });

        // Download Quality Selection
        document.getElementById('downloadQualityBtn').addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent document click from closing immediately
            this.toggleDownloadQualityMenu();
        });

        document.querySelectorAll('#downloadQualityMenu a').forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault();
                this.setDownloadQuality(parseInt(event.target.dataset.quality));
                this.toggleDownloadQualityMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            const downloadQualityMenu = document.getElementById('downloadQualityMenu');
            const downloadQualityBtn = document.getElementById('downloadQualityBtn');
            if (!downloadQualityBtn.contains(event.target) && !downloadQualityMenu.contains(event.target)) {
                downloadQualityMenu.classList.add('hidden');
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'Enter':
                        e.preventDefault();
                        this.generateFlowchart();
                        break;
                    case 'k':
                        e.preventDefault();
                        document.getElementById('textInput').focus();
                        break;
                }
            }
        });

        // Auto-resize textarea
        const textarea = document.getElementById('textInput');
        textarea.addEventListener('input', () => {
            this.autoResizeTextarea(textarea);
        });

        // Click outside to close modals
        document.getElementById('helpModal').addEventListener('click', (e) => {
            if (e.target.id === 'helpModal') {
                this.hideHelpModal();
            }
        });
    }

    
    updateLogoForTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        const logo = document.getElementById('logoImg');
        if (logo) {
            logo.src = isDark ? 'flownook_logo2.png' : 'flownook_logo.png';
        }
    }


    setupTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';

    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    this.applyTheme(savedTheme);
    this.updateLogoForTheme();
}

    toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");  // Only toggle once

    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    this.updateLogoForTheme();

    // Re-render Mermaid chart with new theme
    if (this.currentMermaidCode) {
        this.renderMermaidChart(this.currentMermaidCode);
    }
}

    setupMermaid() {
        mermaid.initialize({
            startOnLoad: false,
            theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
            securityLevel: 'loose',
            flowchart: {
                useMaxWidth: true,
                htmlLabels: true,
                curve: 'basis'
            }
        });
    }

    async loadExamples() {
        try {
            const response = await fetch('/api/flowchart/examples');
            const data = await response.json();
            
            if (data.success) {
                this.examples = data.examples;
                this.renderExamples();
            }
        } catch (error) {
            console.error('Failed to load examples:', error);
            // Fallback examples
            this.examples = [
                {
                    title: 'User Login Process',
                    description: 'User enters credentials, system validates, if valid show dashboard, otherwise show error'
                },
                {
                    title: 'Order Processing',
                    description: 'Customer places order, check inventory, process payment, ship if successful'
                }
            ];
            this.renderExamples();
        }
    }

    renderExamples() {
        const examplesList = document.getElementById('examplesList');
        examplesList.innerHTML = '';

        this.examples.forEach((example, index) => {
            const exampleElement = document.createElement('div');
            exampleElement.className = 'p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors';
            exampleElement.innerHTML = `
                <div class="font-medium text-gray-900 dark:text-white text-sm">${example.title}</div>
                <div class="text-gray-600 dark:text-gray-300 text-xs mt-1">${example.description}</div>
            `;
            
            exampleElement.addEventListener('click', () => {
                document.getElementById('textInput').value = example.description;
                this.autoResizeTextarea(document.getElementById('textInput'));
                this.hideExamples();
            });

            examplesList.appendChild(exampleElement);
        });
    }

    toggleExamples() {
        const examples = document.getElementById('quickExamples');
        if (examples.classList.contains('hidden')) {
            this.showExamples();
        } else {
            this.hideExamples();
        }
    }

    showExamples() {
        document.getElementById('quickExamples').classList.remove('hidden');
        document.getElementById('quickExamples').classList.add('animate-fade-in');
    }

    hideExamples() {
        document.getElementById('quickExamples').classList.add('hidden');
    }

    showHelpModal() {
        document.getElementById('helpModal').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    hideHelpModal() {
        document.getElementById('helpModal').classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    clearInput() {
        document.getElementById('textInput').value = '';
        this.autoResizeTextarea(document.getElementById('textInput'));
        this.resetFlowchartView();
    }

    autoResizeTextarea(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.max(160, textarea.scrollHeight) + 'px';
    }

    async generateFlowchart() {
        const textInput = document.getElementById('textInput');
        const text = textInput.value.trim();

        if (!text) {
            this.showError('Please enter a description of your process');
            return;
        }

        this.showLoading();
        this.disableControls();

        try {
            const response = await fetch('/api/flowchart/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: text })
            });

            const data = await response.json();

            if (data.success) {
                this.currentMermaidCode = data.mermaid_code;
                await this.renderMermaidChart(data.mermaid_code);
                this.showFlowchart();
                this.enableControls();
            } else {
                this.showError(data.error || 'Failed to generate flowchart');
            }
        } catch (error) {
            console.error('Error generating flowchart:', error);
            this.showError('Network error. Please check your connection and try again.');
        }
    }

    async renderMermaidChart(mermaidCode) {
        try {
            // Update mermaid theme based on current theme
            const isDark = document.documentElement.classList.contains('dark');
            mermaid.initialize({
                startOnLoad: false,
                theme: isDark ? 'dark' : 'default',
                securityLevel: 'loose',
                flowchart: {
                    useMaxWidth: true,
                    htmlLabels: true,
                    curve: 'basis'
                }
            });

            const chartContainer = document.getElementById('mermaidChart');
            chartContainer.innerHTML = '';

            // Generate unique ID for this chart
            const chartId = 'mermaid-' + Date.now();
            
            const { svg } = await mermaid.render(chartId, mermaidCode);
            chartContainer.innerHTML = svg;

            // Apply zoom
            this.applyZoom();

        } catch (error) {
            console.error('Error rendering mermaid chart:', error);
            this.showError('Failed to render flowchart. Please try a different description.');
        }
    }

    showLoading() {
        this.hideAllViews();
        document.getElementById('loading').classList.remove('hidden');
        
        // Update button state
        const generateBtn = document.getElementById('generateBtn');
        const generateBtnText = document.getElementById('generateBtnText');
        generateBtn.disabled = true;
        generateBtnText.textContent = 'Generating...';
    }

    showFlowchart() {
        this.hideAllViews();
        document.getElementById('flowchartContainer').classList.remove('hidden');
        
        // Reset button state
        const generateBtn = document.getElementById('generateBtn');
        const generateBtnText = document.getElementById('generateBtnText');
        generateBtn.disabled = false;
        generateBtnText.textContent = 'Generate Flowchart';
    }

    showError(message) {
        this.hideAllViews();
        document.getElementById('error').classList.remove('hidden');
        document.getElementById('errorMessage').textContent = message;
        
        // Reset button state
        const generateBtn = document.getElementById('generateBtn');
        const generateBtnText = document.getElementById('generateBtnText');
        generateBtn.disabled = false;
        generateBtnText.textContent = 'Generate Flowchart';
    }

    resetFlowchartView() {
        this.hideAllViews();
        document.getElementById('placeholder').classList.remove('hidden');
        this.disableControls();
        this.currentMermaidCode = '';
        this.currentZoom = 1;
    }

    hideAllViews() {
        document.getElementById('placeholder').classList.add('hidden');
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('flowchartContainer').classList.add('hidden');
        document.getElementById('error').classList.add('hidden');
    }

    enableControls() {
        document.getElementById('zoomInBtn').disabled = false;
        document.getElementById('zoomOutBtn').disabled = false;
        document.getElementById('downloadBtn').disabled = false;
        document.getElementById('downloadQualityBtn').disabled = false; // Enable quality button
    }

    disableControls() {
        document.getElementById('zoomInBtn').disabled = true;
        document.getElementById('zoomOutBtn').disabled = true;
        document.getElementById('downloadBtn').disabled = true;
        document.getElementById('downloadQualityBtn').disabled = true; // Disable quality button
    }

    zoomIn() {
        this.currentZoom = Math.min(this.currentZoom + 0.2, 3);
        this.applyZoom();
    }

    zoomOut() {
        this.currentZoom = Math.max(this.currentZoom - 0.2, 0.5);
        this.applyZoom();
    }

    applyZoom() {
        const chartContainer = document.getElementById('mermaidChart');
        const svg = chartContainer.querySelector('svg');
        if (svg) {
            svg.style.transform = `scale(${this.currentZoom})`;
            svg.style.transformOrigin = 'top left';
        }
    }

    downloadFlowchart() {
    const node = document.getElementById('mermaidChart');

    if (!node || !node.querySelector('svg')) {
        this.showError("No flowchart to download");
        return;
    }

    const quality = this.selectedDownloadQuality || 2000;
    const scale = quality / node.offsetWidth;

    domtoimage.toPng(node, {
        width: node.offsetWidth * scale,
        height: node.offsetHeight * scale,
        style: {
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            background: getComputedStyle(document.body).backgroundColor || '#ffffff'
        }
    })
    .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `flowchart-${quality / 1000}K.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    })
    .catch((error) => {
        console.error("Download failed:", error);
        this.showError("Download failed. Please try again.");
    });
}




    toggleDownloadQualityMenu() {
        const menu = document.getElementById('downloadQualityMenu');
        menu.classList.toggle('hidden');
    }

    setDownloadQuality(quality) {
        this.selectedDownloadQuality = quality;
        const selectedQualityText = document.getElementById('selectedQualityText');
        selectedQualityText.textContent = `${quality / 1000}K`;
        // You might want to re-render the flowchart here if the quality affects display
        // For now, it only affects download resolution
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FlowchartGenerator();
});

// Add some utility functions for better UX
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling for better navigation
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add loading animation to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
            }
        });
    });
    
    // Add focus styles for accessibility
    const focusableElements = document.querySelectorAll('button, input, textarea, [tabindex]');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #3b82f6';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});
