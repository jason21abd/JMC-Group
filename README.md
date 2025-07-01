# JMC Group Website

A modern consulting business website built with HTML5, CSS3, JavaScript (ES6), and Express.js.

## Features

- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **Modern Navigation**: Dual navigation bars with scroll detection
- **Interactive Elements**: Modal popups, dropdown menus, hover effects
- **API Integration**: Quote of the Day from API Ninjas
- **Backend API**: Express.js server with form handling
- **CSS Transitions**: Smooth animations and 3D hover effects

## Project Structure

```
jmc-group-website/
├── public/                 # Frontend files
│   ├── index.html         # Home page
│   ├── pages/             # Internal pages
│   ├── css/               # Stylesheets
│   └── js/                # JavaScript files
├── backend/               # Backend data and routes
├── server.js              # Express server
├── package.json           # Dependencies
└── README.md             # This file
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up API key:**
   - Sign up at [API Ninjas](https://api-ninjas.com/api/quotes)
   - Replace `'YOUR_API_KEY_HERE'` in `public/js/api.js` with your actual API key

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Navigate to `http://localhost:3000`

### Production

1. **Build and start:**
   ```bash
   npm start
   ```

## API Endpoints

- `GET /api/health` - Server health check
- `POST /api/subscribe` - Handle newsletter subscriptions
- `POST /api/contact` - Handle contact form submissions

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6), Bootstrap 5
- **Backend**: Node.js, Express.js
- **APIs**: API Ninjas Quotes API
- **Icons**: Font Awesome
- **Security**: Helmet.js, CORS

## Customization

### Colors
The color palette is defined in `public/css/main.css`:
- Primary Black: `#18181a`
- Primary Purple: `#7c3aed`
- Accent colors and variations

### Content
- Update text content in HTML files
- Modify navigation items in all HTML files
- Add/remove pages as needed

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - see LICENSE file for details. 