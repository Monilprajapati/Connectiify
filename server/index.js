//! Third Party modules
import express from "express";
import bodyParser from "body-parser";

//! Custom modules
import cors from "cors";
import connectToMongo from "./src/config/databaseConfig.js";
import { PORT } from "./src/config/serverConfig.js";

//! routes import
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import postRoutes from "./src/routes/post.routes.js";
import commentRoutes from "./src/routes/comment.routes.js";

//* Defination of legend function
const setUpAndStartServer = async () => {
    try {
        //- connect to database
        await connectToMongo();

        const app = express();
        const corsOptions = {
            origin: ["https://connectiify.vercel.app", "http://localhost:3000", "https://www.connectiify.co"],
            credentials: true,
            optionSuccessStatus: 200,
        };

        app.use(cors(corsOptions));

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        //- routes use
        app.use("/api/v1/auth", authRoutes);
        app.use("/api/v1/comment", commentRoutes);
        app.use("/api/v1/user", userRoutes);
        app.use("/api/v1/post", postRoutes);

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