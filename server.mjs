//imports
import express from 'express';
import gameRoute from './routes/gameRoute.mjs';

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