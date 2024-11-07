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

app.post("/api/login", (req, res) => {
    res.cookie(
        "refreshToken",
        jwt.sign({ login: "123", password: "456" }, "secretKey", {
            expiresIn: "15s",
        }),
        {
            httpOnly: true,
            secure: false,
            maxAge: 15 * 1000,
        }
    );
    res.cookie(
        "accessToken",
        jwt.sign({ login: "123", password: "456" }, "secretKey", {
            expiresIn: "10s",
        }),
        {
            httpOnly: false,
            secure: false,
            maxAge: 10 * 1000,
        }
    );
    res.send(200);
});

app.get("/api/refresh", (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        return res.sendStatus(403);
    }
    jwt.verify(refreshToken, "secretKey", (error) => {
        if (error) {
            return res.sendStatus(403);
        }
        const token = jwt.sign({ login: "123", password: "456" }, "secretKey", {
            expiresIn: "10s",
        });
        res.cookie("accessToken", token, {
            httpOnly: false,
            secure: false,
            maxAge: 10 * 1000,
        });
        res.send(200);
    });
});
app.get("/api/data", (req, res) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ message: "Access token is missing" });
    }

    const accessToken = authHeader.split(" ")[1];
    jwt.verify(accessToken, "secretKey", (error) => {
        if (error) {
            return res
                .sendStatus(403)
                .json({ message: "Access token is invalid" });
        }
        res.status(200).json({ message: "Access granted" });
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
