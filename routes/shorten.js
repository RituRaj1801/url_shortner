import express from "express";
import ShortURL from "../models/ShortURL.js";

const router = express.Router();

router.post("/shorten", async (req, res) => {
    const timeout = setTimeout(() => {
        return res.status(504).json({ status: false, message: "Request timed out" });
    }, 9000); // 9 seconds (Vercel allows up to 10s for free users)

    try {
        const { long_url } = req.body;
        if (!long_url) {
            return res.json({ status: false, message: "URL is required!" });
        }

        const url = new URL(long_url);
        const shortCode = Math.random().toString(36).substring(2, 8);
        const shortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;

        const newShortUrl = new ShortURL({
            long_url: url.href,
            short_code: shortCode,
            short_url: shortUrl,
        });

        await newShortUrl.save();
        clearTimeout(timeout); // Clear timeout on success

        return res.json({ status: true, short_url: shortUrl, message: "URL shortened successfully!" });
    } catch (error) {
        clearTimeout(timeout);
        return res.json({ status: false, message: "Invalid URL format!" });
    }
});


export default router;
