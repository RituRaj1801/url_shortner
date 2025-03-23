import express from "express";
import { join } from "path";
import connectDB from "./config/db.js";
import shortenRoutes from "./routes/shorten.js";
import ShortURL from "./models/ShortURL.js"; // ✅ Import the ShortURL model

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(express.json());
    
// serve template filte start
app.set("view engine", "ejs");
app.set("views", join(process.cwd(), "public", "view"));
app.get('/template', (req, res) => {
    res.render("template",{'html': 'Hello World!'});
})
// server template file end

// Serve HTML file
app.get("/", (req, res) => {
    res.sendFile(join(process.cwd(), "public", "view", "url_shortner.html"));
});

// Shorten URL Routes
// Shorten URL Routes
app.use("/api", shortenRoutes);

// Redirect Short URL to Long URL
app.get('/:shortCode', async (req, res) => {
    try {
        const shortCode = req.params.shortCode;
        const urlEntry = await ShortURL.findOne({ short_code: shortCode });

        if (urlEntry) {
            return res.redirect(urlEntry.long_url); // ✅ Redirect to the original URL
        } else {
            return res.status(404).send("URL not found!");
        }
    } catch (error) {
        console.error("Error fetching URL:", error);
        return res.status(500).send("Server error!");
    }
});

// Move this line to the bottom
app.listen(PORT, () => console.log(`🚀 Server started on http://localhost:${PORT}`));
app.use(express.static("public"));


