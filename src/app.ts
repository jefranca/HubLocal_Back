import cors from "cors";
import express from "express";

import errorHandler from "./middlewares/errorHandler";
import validateToken from "./middlewares/validateToken";
import authenticationRouter from "./routers/authenticationRouter"

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health",validateToken, async (req, res) => await res.sendStatus(200));
app.use("/auth",authenticationRouter)

app.use(errorHandler);

export default app;