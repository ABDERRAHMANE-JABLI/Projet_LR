import express, { json } from "express";

import cors from "cors";
import bodyParser from "body-parser";

const { urlencoded } = bodyParser;
import dotenv from "dotenv";


import ConnectionDB from './Config/connectionDB.js';

//init server : 
const app = express();

//my .env file
dotenv.config();

//middleware
app.use(json());
app.use(urlencoded({extended:true}));

//cors : 
app.use(cors());
//************************************************************************** */
// ------------------------------------------------------------ routes ----------------------------------------------------------------------------
import routeLevel from './Routes/RouteLevel.js';
import routeStudyField from './Routes/RouteStudyField.js'
import routeStudentLevel from './Routes/RouteStudentLevel.js'
import routeUser from './Routes/RouteUser.js'

app.use("/api/level", routeLevel);
app.use("/api/StudyField", routeStudyField);
app.use("/api/Users", routeUser);
app.use("/api/StudentLevel", routeStudentLevel);


//------------------------------------------------------------------------------------

//port server : 
const port = process.env.PORT || 5000;
ConnectionDB();

app.listen(port,(error)=>{
    if(error) console.log("error in server");
    console.log(`server start in port ${port}`);
});
 