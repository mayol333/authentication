import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
const app = express();
const port = 3000;
const corsConfig = {
    origin: true,
    credentials: true,
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(bodyParser.json());
app.use(cookieParser());
app.get("/test", (_req, res) => {
    res.json({
        name: "test",
    });
});

app.post("/login", (req, res) => {
    const token = jwt.sign({ login: "123", password: "456" }, "secretKey", {
        expiresIn: "5m",
    });
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        // sameSite: "strict",
        maxAge: 5 * 60 * 1000,
    });
    res.send(200);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
