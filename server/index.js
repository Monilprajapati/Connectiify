//! Third Party modules
import express from "express";
import bodyParser from "body-parser";

//! Custom modules
import cors from "cors";
import connectToMongo from "./src/config/databaseConfig.js";
import { PORT } from "./src/config/serverConfig.js";

//* Defination of legend function
const setUpAndStartServer = async () => {
    try {
        //- connect to database
        await connectToMongo();

        const app = express();
        const corsOptions = {
            origin: ["http://localhost:3000"],
            credentials: true,
            optionSuccessStatus: 200,
        };

        app.use(cors(corsOptions));

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        app.listen(PORT, () => {
            console.log("Server started on PORT : ", PORT);
        });
    } catch (error) {
        console.log("Error, connecting to database..." + error);
        throw error;
    }
};

//* Calling the legend function of the file...
setUpAndStartServer();