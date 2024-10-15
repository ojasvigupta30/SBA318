import express from 'express';
import bodyParser from 'body-parser';
import adventureRoutes from './routes/adventureRoutes.mjs';
import challengeRoutes from './routes/challengeRoutes.mjs';
import fs from 'fs';

// Initialize express
const app = express();
const PORT = 3000;

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware for static files (CSS, images)
app.use(express.static('public'));

// Custom template engine without using regex
app.engine('temp', (filePath, options, callback) => {
    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) return callback(err);

        let rendered = content.toString();
        for (const key in options) {
            const placeholder = `#${key}#`;
            const value = typeof options[key] === 'object' ? JSON.stringify(options[key]) : options[key];
            rendered = rendered.split(placeholder).join(value);
        }

        return callback(null, rendered);
    });
});

app.set('views', './views'); // Set the views directory
app.set('view engine', 'temp'); // Register the custom template engine

// Routes
app.use('/', adventureRoutes);
app.use('/dragon', challengeRoutes);

// Error-handling middleware
app.use((err, reqs, resp, next) => {
    console.error(err.stack);
    resp.status(500).send('Something went wrong! Please try again.');
});

// Server Listener
app.listen(PORT, () => {
    console.log(`The server is running on port: ${PORT}`);
});
