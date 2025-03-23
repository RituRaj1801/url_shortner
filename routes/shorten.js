import express from "express";
import ShortURL from "../models/ShortURL.js";

const router = express.Router();

router.post("/shorten", async (req, res) => {
    const data = { status: false, status_code: 400, message: "" };

    const { long_url } = req.body;
    if (!long_url) {
        data.message = "URL is required!";
        return res.json(data);
    }

    try {
        const url = new URL(long_url);
        const shortCode = Math.random().toString(36).substring(2, 8);
        const shortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;

        const newShortUrl = new ShortURL({
            long_url: url.href,
            short_code: shortCode,
            short_url: shortUrl,
        });

        await newShortUrl.save();

        data.status = true;
        data.status_code = 200;
        data.message = "URL shortened successfully!";
        data.short_url = shortUrl;
    } catch (error) {
        data.message = "Invalid URL format!";
    }

    res.json(data);
});

export default router;
