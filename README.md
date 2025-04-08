# Jacques Colas-Guérin Portfolio Website

A portfolio website for Jacques Colas-Guérin hosted on the Claude Marthe Platform, showcasing the artist's work with a clean, minimal design that emphasizes visual content.

## Project Structure

```
jacques-colas-guerin-site/
├── assets/
│   ├── images/
│   │   ├── gallery/
│   │   ├── about/
│   │   └── logos/
│   ├── fonts/
│   ├── css/
│   └── icons/
├── styles/
│   ├── main.css
│   ├── components/
│   │   ├── navigation.css
│   │   ├── gallery.css
│   │   ├── buttons.css
│   │   └── forms.css
│   └── utils/
│       ├── variables.css
│       ├── animations.css
│       └── responsive.css
├── scripts/
│   ├── main.js
│   ├── gallery.js
│   └── lightbox.js
├── index.html
├── about.html
├── contact.html
└── project-template.html
```

## Development Setup

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd jacques-colas-guerin-site
   ```

2. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Install Node.js dependencies:
   ```
   npm install
   ```

### Development Workflow

1. Start the development server:
   ```
   npm start
   ```

2. Watch for CSS changes:
   ```
   npm run watch:css
   ```

3. Build for production:
   ```
   npm run build
   ```

## Key Features

- Responsive gallery layout with filtering capability
- Lightbox for enlarged image viewing
- Optimized image loading with lazy loading
- Subtle animations for enhanced user experience
- Mobile-friendly navigation

## Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript
- **CSS Processing:** PostCSS
- **JavaScript Libraries:** Alpine.js, GSAP, Masonry.js
- **Backend (if needed):** Flask
- **Deployment:** Whitenoise, Gunicorn

## Accessibility

This project follows WCAG 2.1 guidelines to ensure accessibility for all users:
- Proper color contrast
- Keyboard navigation
- Descriptive alt text for images
- Semantic HTML structure
- ARIA attributes where needed

## Performance Optimization

- Lazy loading for gallery images
- CSS and JavaScript minification
- Optimized image assets
- Browser caching
- Critical CSS for faster initial render
