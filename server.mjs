//imports
import express from 'express';
import bodyParser from 'body-parser';
import adventureRoutes from './routes/adventureRoutes.mjs';
import challengeRoutes from './routes/challengeRoutes.mjs';
import fs from 'fs';

//declaration and initalization
const app = express();
const PORT = 3000;

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

//Middleware for static files
app.use(express.static(`public`));


// Custom template engine
app.engine('temp', (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {
      if (err) return callback(err);
  
      let rendered = content.toString()
        .replace('#title#', options.title)
        .replace('#message#', options.message);
  
      return callback(null, rendered);
    });
  });
  
  app.set('views', './views'); // Set the views directory
  app.set('view engine', 'temp'); // Register the custom template engine


//Routes
app.use('/', adventureRoutes);
app.use('/dragon', challengeRoutes);


// Error-handling middleware
app.use((err, reqs, resp, next) => {
    console.error(err.stack);
    resp.status(500).send('Something went wrong! Please try again.');
  });

//Server Listner
app.listen(PORT, (reqs, resp)=>{
    console.log(`The server is working on port: ${PORT}`);
});