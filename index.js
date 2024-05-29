//import section
import express from 'express';
import fs from 'fs';
import { format } from "date-fns";
import path from 'path';
import { fileURLToPath } from 'url';

//decleration/initialization
const app = express();
const PORT = 4000;

// Utility to get dirname 
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

//middleware
app.use(express.json());


//routes
//create route
app.get('/create',(req,res)=>{
    let toDay = format(new Date(),'dd-mm-yyyy-HH-mm-ss')
    // console.log(toDay);
    const filePath = `Timestamp/${toDay}.txt`
    fs.writeFileSync(filePath,`${toDay}`,'utf8')
    res.status(200).send('Timestamp are created successfully')
})
//read route
app.get('/read', (req, res) => {
    const directoryPath = path.join(dirname, './Timestamp');
    let fileData = [];
  
     fs.readdirSync(directoryPath).forEach(file => {
      const filePath = path.join(directoryPath, file);
      const data = fs.readFileSync(filePath, 'utf8');
      fileData.push( {file, data} );
    });
  res.status(200).send(fileData);
  });

//running port
app.listen(PORT,()=>{
    console.log("Server is running");
})