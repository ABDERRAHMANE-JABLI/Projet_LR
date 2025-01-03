import express, { json } from "express";

import cors from "cors";
import bodyParser from "body-parser";

const { urlencoded } = bodyParser;
import dotenv from "dotenv";


import ConnectionDB from './Config/connectionDB.js';

//init server : 
import {app, server} from "./socket/socket.js"
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
import routeMessages from './Routes/RouteMessage.js'
import routeAuthentification from './Routes/RouteAuth.js'
import routeEvent from './Routes/RouteEvent.js'
import routeThemes from './Routes/RouteThemes.js'

app.use("/api/level", routeLevel);
app.use("/api/StudyField", routeStudyField);
app.use("/api/Users", routeUser);
app.use("/api/StudentLevel", routeStudentLevel);
app.use("/api/messages", routeMessages);
app.use("/api/auth", routeAuthentification);
app.use("/api/Event", routeEvent);
app.use("/api/Theme", routeThemes);
//------------------------------------------------------------------------------------

//port server : 
const port = process.env.PORT || 5000;
ConnectionDB();

server.listen(port,(error)=>{
    if(error) console.log("error in server");
    console.log(`server start in port ${port}`);
});
 