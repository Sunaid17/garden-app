# Garden App

A web application for browsing and managing plants.

## Features

- View plant catalog
- Search plants by name
- Filter plants by category
- Display plant count while filtering
- API integration with Perenual plant database

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sunaid17/garden-app.git
   cd garden-app
   ```

2. No dependencies required - uses vanilla JavaScript ES modules

3. Open `index.html` in your browser

## Running the App

To run locally, open `index.html` directly in a web browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

Then visit `http://localhost:8000`

## Project Structure

```
garden-app/
├── index.html         # Main HTML file
├── styles.css       # CSS styling
├── js/
│   ├── app.js        # Main application logic
│   ├── data.js      # Plant data
│   ├── store.js    # State management
│   └── plantService.js # API service
├── .github/
│   └── workflows/
│       └── ci.yml    # CI/CD pipeline
└── README.md
```

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES Modules)

## License

MIT