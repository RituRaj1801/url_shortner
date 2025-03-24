import express from "express";
import ShortURL from "../models/ShortURL.js";

const router = express.Router();

router.post("/shorten", async (req, res) => {
    try {
        const { long_url } = req.body;
        if (!long_url) return res.status(400).json({ status: false, message: "URL is required!" });

        const url = new URL(long_url);
        const shortCode = Math.random().toString(36).substring(2, 8);
        const shortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;

        const newShortUrl = new ShortURL({ long_url: url.href, short_code: shortCode, short_url: shortUrl });
        await newShortUrl.save();

        return res.json({ status: true, short_url: shortUrl, message: "URL shortened successfully!" });

    } catch (error) {
        res.status(504).json({ status: false, message: error.message || "Request timed out" });
    }
});



export default router;
