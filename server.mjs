//imports
import express from 'express';

//declaration and initalization
const app = express();
const PORT = 3000;










//Server Listner
app.listen(PORT, (reqs, resp)=>{
    console.log(`The server is working on port: ${PORT}`);
});