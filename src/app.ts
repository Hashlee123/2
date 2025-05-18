import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes";
import contentRoutes from "./routes/content.routes";
import brainRoutes from "./routes/brain.routes";

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://zeeero412:47PKyoRmP4CfKiso@cluster0.pq0gecu.mongodb.net/user");

app.use("/api/v1", authRoutes);
app.use("/api/v1", contentRoutes);
app.use("/api/v1", brainRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
