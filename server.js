import express from "express";
import cors from "cors";
const app = express();
const port = 3000;

app.use(cors());

app.get("/test", (_req, res) => {
    res.json({
        name: "test",
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
