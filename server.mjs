//imports
import express from 'express';
import bodyParser from 'body-parser';
import adventureRoutes from './routes/adventureRoutes.mjs';
import challengeRoutes from './routes/challengeRoutes.mjs';
import fs from 'fs';

//declaration and initalization
const app = express();
const PORT = 3000;


//Middleware
app.use(express.static(`public`));

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));




//Routes
app.use(`/`, gameRoute);




//Server Listner
app.listen(PORT, (reqs, resp)=>{
    console.log(`The server is working on port: ${PORT}`);
});