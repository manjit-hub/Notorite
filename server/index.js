import './constants.js' // for dotenv ONLY!

import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

import authRoutes from "./Routes/auth.js";
import noteRoutes from "./Routes/notes.js";
import DBConnection from "./Database/db.js"

const app = express();

app.use(bodyParser.json());
app.use(express.json());

console.log(process.env.FRONTEND_URL)
app.use(cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true // Allow cookies to be sent with requests
}));
DBConnection();


app.get("/", (req, res) => {
    res.send("Server Is Running");
});

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);
app.use("/files", express.static("files"));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
})