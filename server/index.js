//! Third Party modules
import express from "express";

//! Custom modules
import cors from "cors";
import connectToMongo from "./src/config/databaseConfig.js";
import { PORT } from "./src/config/serverConfig.js";

//! routes import
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import postRoutes from "./src/routes/post.routes.js";
import commentRoutes from "./src/routes/comment.routes.js";

//* Definition of legend function
const setUpAndStartServer = async () => {
    try {
        //- Connect to database
        await connectToMongo();

        const app = express();
        const corsOptions = {
            origin: ["https://connectiify.vercel.app", "http://localhost:3000", "https://www.connectiify.co"],
            credentials: true,
            optionSuccessStatus: 200,
        };

        app.use(cors(corsOptions));

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        //- Routes use
        app.use("/api/v1/auth", authRoutes);
        app.use("/api/v1/comment", commentRoutes);
        app.use("/api/v1/user", userRoutes);
        app.use("/api/v1/post", postRoutes);

        const port =  PORT || 3030;
        app.listen(port, () => {
            console.log("Server started on PORT : ", port);
        });
    } catch (error) {
        console.log("Error, connecting to database..." + error);
        throw error;
    }
};

//* Calling the legend function of the file...
setUpAndStartServer();